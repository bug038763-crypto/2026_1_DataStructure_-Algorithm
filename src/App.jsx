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
        <h1>2026 1학기 알고리즘 돌아보기</h1>
        <a href="#" className="github-btn" onClick={(e) => { e.preventDefault(); alert('배포 후 설정될 GitHub 링크입니다.');}}>GitHub Repository</a>
      </header>

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
