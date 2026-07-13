import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { weeksData } from './data';
import './App.css';

function App() {
  const [activeWeek, setActiveWeek] = useState(weeksData[0]);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [outputs, setOutputs] = useState({});
  const [runningKey, setRunningKey] = useState(null);
  const [pdfOpen, setPdfOpen] = useState(false);

  // GitHub Integration States
  const [showSettings, setShowSettings] = useState(false);
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('githubToken') || '');
  const [isSaving, setIsSaving] = useState(false);

  // Reflections state synced with localStorage
  const [reflections, setReflections] = useState(() => {
    const saved = localStorage.getItem('reflections');
    if (saved) {
      return JSON.parse(saved);
    }
    const initial = {};
    weeksData.forEach(w => {
      initial[w.id] = w.reflection;
    });
    initial['overall'] = '이곳에 1학기 알고리즘 수업에 대한 전체적인 느낀 점과 앞으로의 학습 방향을 자유롭게 작성해보세요.';
    return initial;
  });

  const pyodideRef = useRef(null);
  const outputAccRef = useRef('');

  // Fetch initial reflections from GitHub to stay synced with remote
  useEffect(() => {
    async function fetchReflections() {
      try {
        const res = await fetch('https://raw.githubusercontent.com/bug038763-crypto/2026_1_DataStructure_-Algorithm/main/public/reflections.json?t=' + new Date().getTime());
        if (res.ok) {
          const data = await res.json();
          setReflections(data);
          localStorage.setItem('reflections', JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to fetch reflections from GitHub:", err);
      }
    }
    fetchReflections();
  }, []);

  useEffect(() => {
    async function loadPyodideEngine() {
      try {
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        pyodideRef.current = pyodide;
        setPyodideReady(true);
      } catch (err) {
        console.error("Pyodide load failed", err);
      }
    }
    loadPyodideEngine();
  }, []);

  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(reflections));
  }, [reflections]);

  const saveToGitHub = async () => {
    if (!githubToken) {
      alert("GitHub Token이 설정되어 있지 않습니다. 우측 상단의 설정(⚙️)을 눌러 토큰을 입력해주세요.");
      return;
    }
    setIsSaving(true);
    try {
      const owner = 'bug038763-crypto';
      const repo = '2026_1_DataStructure_-Algorithm';
      const path = 'public/reflections.json';
      
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      let sha = null;
      if (getRes.ok) {
        const getData = await getRes.json();
        sha = getData.sha;
      }
      
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(reflections, null, 2))));
      
      const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: "Update reflections via web app",
          content: contentBase64,
          sha: sha
        })
      });
      
      if (putRes.ok) {
        alert("성공적으로 GitHub에 저장되었습니다!");
      } else {
        const errorData = await putRes.json();
        alert(`저장 실패: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunCode = async (codeToRun, weekId, codeIndex) => {
    if (!pyodideRef.current) return;
    const key = `${weekId}-${codeIndex}`;
    setRunningKey(key);
    outputAccRef.current = '';

    pyodideRef.current.setStdout({ batched: (msg) => {
      outputAccRef.current += msg + "\n";
      setOutputs(prev => ({
        ...prev,
        [key]: outputAccRef.current
      }));
    }});
    
    try {
      await pyodideRef.current.runPythonAsync(codeToRun);
    } catch (err) {
      outputAccRef.current += "\n[에러 발생]: " + err.message;
      setOutputs(prev => ({
        ...prev,
        [key]: outputAccRef.current
      }));
    } finally {
      setRunningKey(null);
    }
  };

  const handleReflectionChange = (id, value) => {
    setReflections(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="app-container">
      {!pyodideReady && (
        <div className="loading-pyodide">
          Python 실행 환경(Pyodide)을 준비하는 중입니다... 잠시만 기다려주세요.
        </div>
      )}
      
      <header>
        <div className="header-left">
          <h1>2026 1학기 알고리즘 돌아보기</h1>
        </div>
        <div className="header-right">
          <button className="save-btn" onClick={saveToGitHub} disabled={isSaving}>
            {isSaving ? "저장 중..." : "GitHub에 저장"}
          </button>
          <button className="settings-btn" onClick={() => setShowSettings(true)} title="설정">⚙️</button>
          <a href="https://github.com/bug038763-crypto/2026_1_DataStructure_-Algorithm" className="github-btn" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </div>
      </header>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>설정</h3>
            <div className="form-group">
              <label>GitHub Personal Access Token (PAT)</label>
              <input 
                type="password" 
                value={githubToken} 
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_..."
                className="token-input"
              />
              <p className="help-text">이 토큰은 브라우저에만 안전하게 보관되며, 깃허브 저장소에 감상을 덮어쓸 때 사용됩니다. (repo 권한 필수)</p>
            </div>
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setShowSettings(false)}>닫기</button>
              <button className="apply-btn" onClick={() => {
                localStorage.setItem('githubToken', githubToken);
                setShowSettings(false);
                alert("토큰이 브라우저에 저장되었습니다.");
              }}>적용</button>
            </div>
          </div>
        </div>
      )}

      <div className="main-content">
        <aside className="sidebar">
          {weeksData.map((week) => (
            <button 
              key={week.id}
              className={`week-btn ${activeWeek?.id === week.id ? 'active' : ''}`}
              onClick={() => {
                setActiveWeek(week);
                setOutputs({});
                setPdfOpen(false);
              }}
            >
              {week.title}
            </button>
          ))}
          <div className="sidebar-divider"></div>
          <button 
            className={`week-btn ${activeWeek === 'overall' ? 'active' : ''}`}
            onClick={() => {
              setActiveWeek('overall');
              setOutputs({});
              setPdfOpen(false);
            }}
          >
            전체 회고 (Overall)
          </button>
        </aside>

        <main className="content-panel">
          {activeWeek === 'overall' ? (
            <div className="overall-section animation-fade">
              <h2>1학기 알고리즘 통합 회고</h2>
              <div className="reflection-container">
                <label className="reflection-label">통합적으로 느낀 점 및 개선 방향</label>
                <textarea 
                  className="reflection-input overall-input"
                  value={reflections['overall']}
                  onChange={(e) => handleReflectionChange('overall', e.target.value)}
                  placeholder="이번 학기 알고리즘 수업을 들으며 느낀 점을 작성해주세요..."
                />
              </div>
            </div>
          ) : (
            <div className="week-section animation-fade" key={activeWeek.id}>
              <h2>{activeWeek.title}</h2>
              
              <div>
                <span className="role-tag">Role: {activeWeek.role}</span>
              </div>

              {activeWeek.pdf && (
                <div className="pdf-accordion">
                  <div className="pdf-header" onClick={() => setPdfOpen(!pdfOpen)}>
                    <span>강의 자료 (PDF) {pdfOpen ? '▲' : '▼'}</span>
                    <a 
                      href={`/pdfs/${activeWeek.pdf}`} 
                      download 
                      onClick={(e) => e.stopPropagation()} 
                      className="download-btn"
                    >
                      다운로드
                    </a>
                  </div>
                  {pdfOpen && (
                    <div className="pdf-viewer">
                      <object data={`/pdfs/${activeWeek.pdf}`} type="application/pdf" width="100%" height="500px">
                        <p>이 브라우저는 PDF 뷰어를 지원하지 않습니다. <a href={`/pdfs/${activeWeek.pdf}`}>여기</a>를 클릭하여 다운로드하세요.</p>
                      </object>
                    </div>
                  )}
                </div>
              )}

              {activeWeek.visualizer && (
                <div style={{ marginBottom: '1rem' }}>
                  <a 
                    href={`/${activeWeek.visualizer}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="download-btn"
                    style={{ display: 'inline-block', width: '100%', textAlign: 'center', padding: '1rem', boxSizing: 'border-box' }}
                  >
                    배낭 문제 (Knapsack) 시각화 도구 열기
                  </a>
                </div>
              )}
              
              <div className="reflection-container">
                <label className="reflection-label">주차별 느낀 점 (수정 가능)</label>
                <textarea 
                  className="reflection-input"
                  value={reflections[activeWeek.id]}
                  onChange={(e) => handleReflectionChange(activeWeek.id, e.target.value)}
                />
              </div>

              {activeWeek.codes && activeWeek.codes.map((codeItem, index) => {
                const key = `${activeWeek.id}-${index}`;
                const isRunning = runningKey === key;
                const isNotRunnable = codeItem.runnable === false;
                return (
                  <div className="code-container" key={index}>
                    <div className="code-header">
                      <span className="code-title">
                        <span className="code-index">{index + 1}</span>
                        {codeItem.title}
                      </span>
                      {isNotRunnable ? (
                        <span className="not-runnable-badge">코드 참조용 (웹 실행 불가)</span>
                      ) : (
                        <button 
                          className="run-btn"
                          onClick={() => handleRunCode(codeItem.code, activeWeek.id, index)}
                          disabled={!pyodideReady || runningKey !== null}
                        >
                          {isRunning ? 'Running...' : 'Run Code ▶'}
                        </button>
                      )}
                    </div>
                    <div className="code-block-wrapper">
                      <SyntaxHighlighter 
                        language="python" 
                        style={vscDarkPlus} 
                        customStyle={{ 
                          margin: 0, 
                          borderRadius: '0 0 8px 8px', 
                          border: '1px solid var(--panel-border)', 
                          borderTop: 'none', 
                          background: 'var(--code-bg)',
                          fontSize: '0.9rem',
                          fontFamily: "'Fira Code', 'Consolas', monospace"
                        }}
                      >
                        {codeItem.code}
                      </SyntaxHighlighter>
                    </div>
                    
                    {outputs[key] && (
                      <div className="output-panel">
                        <strong>실행 결과:</strong><br />
                        {outputs[key]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
