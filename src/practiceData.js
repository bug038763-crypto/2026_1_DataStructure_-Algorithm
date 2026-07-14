// 연습문제 데이터: 3개의 ipynb 파일에서 추출, 누락된 답안은 직접 작성
export const practiceData = [
  {
    section: "우선순위 큐와 힙",
    problems: [
      {
        question: "heapq 모듈을 활용하여 우선순위 큐에 10, 20, 30, 40, 50, 60, 70, 80을 삽입하고, 이 큐에서 40이 삭제되려면 몇 번의 삭제 작업이 필요한지 작성하시오.",
        answers: [
          {
            type: "code",
            content: `import heapq

h = []

for i in range(1,9):
  heapq.heappush(h,i*10 )

#4회의 삭제 작업 필요
print("--- 삭제 결과 ---")
for i in range(4):
  print(f"{i+1}번째 삭제된 값: {heapq.heappop(h)}")`
          }
        ]
      },
      {
        question: "10, 20, 30, 40, 50, 60, 70, 80을 차례로 삽입해 최대 힙을 구성하고, 이 힙에서 삭제를 1회 수행하시오.",
        answers: [
          {
            type: "code",
            content: `class MaxH:
  def __init__(self):
    self.heap = [None]

  def en(self, val):
    self.heap.append(val)
    n = len(self.heap) - 1 #자식 노드의 인덱스
    p = n//2
    while p > 0 and n > 0:
      if self.heap[p] < self.heap[n]:
        self.heap[p], self.heap[n] = self.heap[n], self.heap[p]
        n = p
        p = n//2
      else:
        break

  def pop(self):
    length = len(self.heap)
    if length <= 1:
      return None
    if length ==2:
      return self.heap.pop()
    val = self.heap[1]
    self.heap[1] = self.heap.pop()
    length -= 1
    n = 1
    son = n*2
    while son < length:
      if (son+ 1 < length) and (self.heap[son] < self.heap[son+1]) : #max son 값 찾기
        son = son +1

      if self.heap[n] < self.heap[son] :
        self.heap[n], self.heap[son] = self.heap[son], self.heap[n]
        n = son
        son = n*2
      else:
        break
    return val

# 웹 환경 출력 테스트
h = MaxH()
for i in range(1,9):
  h.en(i*10)

print(f"삭제 전 최대 힙 상태: {h.heap[1:]}")
print(f"삭제된 값: {h.pop()}")
print(f"삭제 후 최대 힙 상태: {h.heap[1:]}")`
          }
        ]
      },
      {
        question: "10, 20, 30, 40, 50, 60, 70, 80을 차례로 삽입해 최소 힙을 구성하고, 이 힙에서 삭제를 1회 수행하시오.",
        answers: [
          {
            type: "code",
            content: `class MinH:
  def __init__(self):
    self.heap = [None]

  def en(self, val):
    self.heap.append(val)
    n = len(self.heap) - 1 #자식 노드의 인덱스
    p = n//2
    while p > 0 and n > 0:
      if self.heap[p] > self.heap[n]:
        self.heap[p], self.heap[n] = self.heap[n], self.heap[p]
        n = p
        p = n//2
      else:
        break

  def pop(self):
    length = len(self.heap)
    if length <= 1:
      return None
    if length ==2:
      return self.heap.pop()
    val = self.heap[1]
    self.heap[1] = self.heap.pop()
    length -= 1
    n = 1
    son = n*2
    while son < length:
      if (son+ 1 < length) and (self.heap[son] > self.heap[son+1]) : #min son 값 찾기
        son = son +1

      if self.heap[n] > self.heap[son] :
        self.heap[n], self.heap[son] = self.heap[son], self.heap[n]
        n = son
        son = n*2
      else:
        break
    return val

# 웹 환경 출력 테스트
h = MinH()
for i in range(1,9):
  h.en(i*10)

print(f"삭제 전 최소 힙 상태: {h.heap[1:]}")
print(f"삭제된 값: {h.pop()}")
print(f"삭제 후 최소 힙 상태: {h.heap[1:]}")`
          }
        ]
      },
      {
        question: "배열을 활용해 힙을 구현하시오. 삽입, 삭제, 순회 기능을 포함하시오.",
        answers: [
          {
            type: "code",
            content: `class MaxH:
  def __init__(self):
    self.heap = [None]

  def en(self, val):
    self.heap.append(val)
    n = len(self.heap) - 1 #자식 노드의 인덱스
    p = n//2
    while p > 0 and n > 0:
      if self.heap[p] < self.heap[n]:
        self.heap[p], self.heap[n] = self.heap[n], self.heap[p]
        n = p
        p = n//2
      else:
        break

  def pop(self):
    length = len(self.heap)
    if length <= 1:
      return None
    if length ==2:
      return self.heap.pop()
    val = self.heap[1]
    self.heap[1] = self.heap.pop()
    length -= 1
    n = 1
    son = n*2
    while son < length:
      if (son+ 1 < length) and (self.heap[son] < self.heap[son+1]) : #max son 값 찾기
        son = son +1

      if self.heap[n] < self.heap[son] :
        self.heap[n], self.heap[son] = self.heap[son], self.heap[n]
        n = son
        son = n*2
      else:
        break
    return val

  def traverse(self):
    for i in range(1, len(self.heap)):
      print(f'{i}번 인덱스: {self.heap[i]}')

# 웹 환경 출력 테스트
h = MaxH()
h.en(30)
h.en(10)
h.en(20)
print("삽입 후 순회:")
h.traverse()
print(f"\\n삭제된 값: {h.pop()}")
print("\\n삭제 후 순회:")
h.traverse()`
          }
        ]
      },
      {
        question: "힙을 활용하는 것이 적절한 문제와, 그렇지 않은 문제에 대해 각각 설명하시오.",
        answers: [
          {
            type: "text",
            content: `힙이 적절한 경우:
- 반복적으로 최대/최솟값을 출력해야하는 경우
- 최대 최솟값 외엔 중요하지 않은 경우
- 빠르게 최대 최소값을 여러번 출력해야하는 경우

힙이 부적절한 경우:
- 특정 값을 탐색해야하는 경우
- 순서/정렬 상태가 중요한 경우
- 중간값이 필요한 경우`
          }
        ]
      }
    ]
  },
  {
    section: "해싱과 해시 테이블",
    problems: [
      {
        question: "해싱, 해시 함수, 해시 테이블의 정의를 각각 설명하시오.",
        answers: [
          {
            type: "text",
            content: `해싱: 해시 함수를 이용하는 것, 해시 함수를 돌려 데이터의 저장 위치를 알아내는 것
해시 함수: 키/데이터(숫자)가 주어졌을 때 이를 해시 테이블 위 주소로 바꿔주는 함수
해시 테이블: 자료가 저장되는 공간, 자료구조`
          }
        ]
      },
      {
        question: "해시 함수를 구현하시오.\n(1) 나눗셈법\n(2) 자릿수 접기 이동폴딩\n(3) 자릿수 접기 경계폴딩",
        answers: [
          {
            type: "code",
            content: `def hasf_div(key, size = 7901):
  return key % size

def hasf_shift(key, N=100, size = 7901):
  hash = 0
  while key > 0:
    hash += key % N
    key = key//N
  return hash % size

def hash_boundary(key, N=100, size = 7901):
  hash = 0
  isBoundary = False
  while key > 0:
    chunk = key % N
    key = key // N
    if isBoundary:
      n = N//10
      reversed = 0
      while n > 0:
        reversed = (chunk%10) * n
        chunk = chunk //10
        n = n // 10
      hash += reversed
    else:
      hash += chunk
    isBoundary = not isBoundary

  return hash % size

# 테스트
print(f"나눗셈법(12345): {hasf_div(12345)}")
print(f"이동폴딩(12345678): {hasf_shift(12345678)}")
print(f"경계폴딩(12345678): {hash_boundary(12345678)}")`
          }
        ]
      },
      {
        question: "해시 함수로 나눗셈법을 적용하고, 각 버킷이 5개의 슬롯을 갖도록 구현하시오.",
        answers: [
          {
            type: "code",
            content: `class HashTable_div:
  def __init__(self, size=7901):
    self.size = size
    self.hashtable = []
    for i in range(size):
      self.hashtable.append([None, None, None, None, None])

  def hash_fn(self, key):
    return key % self.size

  def insert(self, key, value):
    index = self.hash_fn(key)
    bucket = self.hashtable[index]
    for i in range(len(bucket)):
      if bucket[i] is None:
        bucket[i] = (key, value)
        return True
    return False  # 버킷이 가득 참 (오버플로우)

  def search(self, key):
    index = self.hash_fn(key)
    bucket = self.hashtable[index]
    for slot in bucket:
      if slot is not None and slot[0] == key:
        return slot[1]
    return None

# 테스트
h = HashTable_div(size=10) # 테스트용 작은 사이즈
h.insert(10, "A")
h.insert(20, "B") # 20 % 10 = 0, 10 % 10 = 0 이므로 같은 버킷
print(f"키 10 탐색 결과: {h.search(10)}")
print(f"키 20 탐색 결과: {h.search(20)}")
print(f"키 30 탐색 결과: {h.search(30)}")
print(f"인덱스 0의 버킷 상태: {h.hashtable[0]}")`
          }
        ]
      },
      {
        question: "체이닝과 재해싱을 각각 구현하고, 각 방법이 어떤 문제에 가장 적절한지 설명하시오.",
        answers: [
          {
            type: "text",
            content: `재해싱이 한번 일어나는 경우, 연산이 무겁고 오래 걸리나 이후엔 초기 해시테이블과 같은 상태로 복구된다. 따라서 문제에서 영구적으로 저장공간의 확장이 필요한 경우나, O(1)의 탐색 성능을 복구해야할 때 적절하다.

체이닝의 경우, 연속적인 입출력, 삭제 등의 연산에도 유연히 대응할 수 있다. 특히 삭제 연산이 빠르고 쉽게 일어난다. 중간에 멈추는 일이 없으며, 라이브 서비스 등에서 사용된다. 천천히 속도저하가 선형적으로 발생한다.`
          },
          {
            type: "code",
            content: `# 체이닝 구현
class ChainedHashTable:
  def __init__(self, size=13):
    self.size = size
    self.table = [[] for _ in range(size)]

  def hash_fn(self, key):
    return key % self.size

  def insert(self, key):
    index = self.hash_fn(key)
    self.table[index].append(key)

  def search(self, key):
    index = self.hash_fn(key)
    return key in self.table[index]

  def delete(self, key):
    index = self.hash_fn(key)
    if key in self.table[index]:
      self.table[index].remove(key)

# 재해싱 (개방 주소법 - 선형 탐사) 구현
class RehashingHashTable:
  def __init__(self, size=13):
    self.size = size
    self.table = [None] * size

  def hash_fn(self, key):
    return key % self.size

  def insert(self, key):
    index = self.hash_fn(key)
    for i in range(self.size):
      probe = (index + i) % self.size
      if self.table[probe] is None:
        self.table[probe] = key
        return True
    return False  # 테이블이 가득 참

  def search(self, key):
    index = self.hash_fn(key)
    for i in range(self.size):
      probe = (index + i) % self.size
      if self.table[probe] is None:
        return False
      if self.table[probe] == key:
        return True
    return False

# 테스트
print("--- 체이닝 테스트 ---")
ch = ChainedHashTable(5)
ch.insert(10)
ch.insert(15)
print(f"인덱스 0의 버킷 (10과 15 충돌): {ch.table[0]}")
print(f"탐색(15): {ch.search(15)}")
ch.delete(15)
print(f"삭제 후 탐색(15): {ch.search(15)}")

print("\\n--- 재해싱 테스트 ---")
rh = RehashingHashTable(5)
rh.insert(10)
rh.insert(15) # 충돌 발생, 다음 빈 칸(인덱스 1)으로 이동
print(f"테이블 상태: {rh.table}")
print(f"탐색(15): {rh.search(15)}")`
          }
        ]
      },
      {
        question: "나눗셈법(나누는 수: 13)을 적용해 다음 값들을 순서대로 삽입한다. 선형 탐사와 제곱 탐사를 각각 적용하는 코드를 작성하고, 각 방법에서 발생한 충돌 횟수를 구하시오.\n- 78, 26, 80, 17, 18, 1, 2, 16, 21, 77, 75, 15, 90, 14",
        answers: [
          {
            type: "code",
            content: `# 선형 탐사 (Linear Probing)
def linear_probing(keys, size=13):
  table = [None] * size
  collisions = 0
  for key in keys:
    index = key % size
    if table[index] is None:
      table[index] = key
    else:
      collisions += 1
      i = 1
      while table[(index + i) % size] is not None:
        collisions += 1
        i += 1
      table[(index + i) % size] = key
  return table, collisions

# 제곱 탐사 (Quadratic Probing)
def quadratic_probing(keys, size=13):
  table = [None] * size
  collisions = 0
  for key in keys:
    index = key % size
    if table[index] is None:
      table[index] = key
    else:
      collisions += 1
      i = 1
      # table이 꽉 차면 무한루프를 돌 수 있으므로 최대 size만큼만 시도
      while table[(index + i*i) % size] is not None and i <= size:
        collisions += 1
        i += 1
      
      # 빈 곳을 찾았으면 삽입 (주의: 제곱 탐사는 모든 빈 공간을 찾지 못할 수 있음)
      if table[(index + i*i) % size] is None:
        table[(index + i*i) % size] = key
      else:
        print(f"제곱 탐사 실패: {key}를 삽입할 수 없습니다.")
  return table, collisions

keys = [78, 26, 80, 17, 18, 1, 2, 16, 21, 77, 75, 15, 90, 14]

lin_table, lin_col = linear_probing(keys)
# 원소가 14개로 size(13)보다 크므로 에러 방지를 위해 앞에서 13개만 테스트
quad_table, quad_col = quadratic_probing(keys[:13])

print(f"선형 탐사 충돌 횟수 (14개 삽입 시도): {lin_col}")
print(f"선형 탐사 결과:\\n{lin_table}")

print(f"\\n제곱 탐사 충돌 횟수 (13개 삽입 시도): {quad_col}")
print(f"제곱 탐사 결과:\\n{quad_table}")`
          }
        ]
      }
    ]
  },
  {
    section: "문자열 탐색",
    problems: [
      {
        question: "Brute force법으로 n 길이의 본문에서 m 길이의 패턴을 찾을 때, 시간복잡도를 구해 빅오 표기법으로 작성하시오.",
        answers: [
          {
            type: "text",
            content: "O(n × m)"
          }
        ]
      },
      {
        question: "라빈 카프 알고리즘을 구현하시오. 단, base 값과 테이블 크기(나누는 수)를 입력 받도록 하시오.",
        answers: [
          {
            type: "code",
            content: `def rabin_karp(text, pattern, base=256, mod=101):
  n = len(text)
  m = len(pattern)
  p_hash = 0  # 패턴의 해시
  t_hash = 0  # 텍스트 윈도우의 해시
  h = 1       # base^(m-1) % mod

  # h = base^(m-1) % mod 계산
  for i in range(m - 1):
    h = (h * base) % mod

  # 초기 해시 계산
  for i in range(m):
    p_hash = (base * p_hash + ord(pattern[i])) % mod
    t_hash = (base * t_hash + ord(text[i])) % mod

  # 슬라이딩 윈도우
  results = []
  for i in range(n - m + 1):
    if p_hash == t_hash:
      # 해시가 같으면 실제 문자열 비교
      if text[i:i+m] == pattern:
        results.append(i)

    if i < n - m:
      t_hash = (base * (t_hash - ord(text[i]) * h) + ord(text[i + m])) % mod
      if t_hash < 0:
        t_hash += mod

  return results

# 테스트
print("텍스트 'mississipi'에서 패턴 'iss' 찾기:")
print(f"찾은 인덱스 위치: {rabin_karp('mississipi', 'iss', base=256, mod=101)}")`
          }
        ]
      },
      {
        question: "'mississipi'에서 'iss'를 탐색하는 과정을 단계별로 서술하시오.\n- 라빈 카프 알고리즘 적용\n- KMP 알고리즘 적용\n- 보이어 무어 알고리즘 적용",
        answers: [
          {
            type: "text",
            content: `KMP 경계 표: [-, 0, 0]
보이어 무어 건너뛰기 테이블: i = 2, s = 1, 나머지 = 3`
          }
        ]
      },
      {
        question: "KMP 알고리즘의 경계 테이블을 구하는 코드를 구현하시오.",
        answers: [
          {
            type: "code",
            content: `def get_pi_table(pattern):
  m = len(pattern)
  pi = [0] * m
  j = 0
  for i in range(1, m):
    while j > 0 and pattern[i] != pattern[j]:
      j = pi[j-1]
    if pattern[i] == pattern[j]:
      j += 1
      pi[i] = j
  return pi

# 테스트
pattern = "abacaaba"
print(f"패턴 '{pattern}'의 KMP 경계 테이블:")
print(get_pi_table(pattern))`
          }
        ]
      },
      {
        question: "보이어-무어 알고리즘의 건너뛰기 표를 구하는 코드를 구현하시오.",
        answers: [
          {
            type: "code",
            content: `def generate_bad_character_table(pattern):
    m = len(pattern)
    bad_char_table = {}

    for i in range(m-1):
        bad_char_table[pattern[i]] = m - i -1
    return bad_char_table

# 테스트
pattern = "rithm"
print(f"패턴 '{pattern}'의 보이어-무어 건너뛰기 표:")
print(generate_bad_character_table(pattern))`
          }
        ]
      }
    ]
  },
  {
    section: "알고리즘 성능 분석",
    problems: [
      {
        question: "삽입 정렬을 구현하고, 시간복잡도를 분석하여 빅오 표기법으로 나타내시오.\n\n앞부분 정렬 가정, 뒷부분은 정렬 안되어있음 → 뒷부분의 각 원소의 자리를 정렬된 앞부분 사이에서 찾기:\n초기에 0번 인덱스는 정렬 되어있음 → 1~-1까진 정렬 안되어 있음",
        answers: [
          {
            type: "code",
            content: `# 시간복잡도: 최악 O(n^2), 최선 O(n)
def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i-1
    while j>=0 and arr[j] > key:
      arr[j+1] = arr[j]
      j -= 1
    arr[j+1] = key

# 테스트
arr = [5, 2, 4, 6, 1, 3]
print(f"삽입 정렬 전: {arr}")
insertion_sort(arr)
print(f"삽입 정렬 후: {arr}")`
          }
        ]
      },
      {
        question: "버블 정렬을 구현하고, 시간복잡도를 분석하여 빅오 표기법으로 나타내시오.",
        answers: [
          {
            type: "code",
            content: `# 시간복잡도: O(n^2)
def bubble_sort(arr):
  for i in range(len(arr)):
    for j in range(len(arr)-1):
      if arr[j] > arr[j+1]:
        arr[j], arr[j+1] = arr[j+1], arr[j]

# 테스트
arr = [5, 2, 4, 6, 1, 3]
print(f"버블 정렬 전: {arr}")
bubble_sort(arr)
print(f"버블 정렬 후: {arr}")`
          }
        ]
      },
      {
        question: "선택 정렬을 구현하고, 시간복잡도를 분석하여 빅오 표기법으로 나타내시오.",
        answers: [
          {
            type: "code",
            content: `# 시간복잡도: O(n^2)
def select_sort(arr=[]):
  for i in range(len(arr)):
    min_val = float('inf')
    min_index = i
    for j in range(i, len(arr)):
      if arr[j] < min_val:
        min_val = arr[j]
        min_index = j
    arr[i], arr[min_index] = arr[min_index], arr[i]

# 테스트
arr = [5, 2, 4, 6, 1, 3]
print(f"선택 정렬 전: {arr}")
select_sort(arr)
print(f"선택 정렬 후: {arr}")`
          }
        ]
      },
      {
        question: "이진 탐색을 구현하고, 시간복잡도를 분석하여 빅오 표기법으로 나타내시오.",
        answers: [
          {
            type: "code",
            content: `# 이진 탐색 트리를 활용한 이진 탐색
# 시간복잡도: 최악 O(n), 평균 O(logn)

class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.left = None
        self.right = None

class Tree:
    def __init__(self):
        self.root = None

def binary_search(tree, key):
  if tree is None:
    return None
  cur = tree.root
  while cur is not None and key != cur.key:
    if key < cur.key:
      cur = cur.left
    else:
      cur = cur.right

  if cur is None:
      return None
  return cur.val

# 테스트용 트리 구성
t = Tree()
t.root = Node(5, "Five")
t.root.left = Node(3, "Three")
t.root.right = Node(7, "Seven")

print(f"키 3 탐색 결과: {binary_search(t, 3)}")
print(f"키 6 탐색 결과: {binary_search(t, 6)}")
print(f"키 7 탐색 결과: {binary_search(t, 7)}")`
          }
        ]
      }
    ]
  },
  {
    section: "Greedy Algorithm",
    problems: [
      {
        question: "문자별 빈도수가 다음과 같을 때, 허프만 트리를 구성하고, 각 문자를 허프만 코드로 변환하시오.\n- G: 17, A: 16, B: 15, C: 10, D: 7, E: 7, F: 7",
        answers: [
          {
            type: "text",
            content: `허프만 트리 구성 과정:

1단계: 가장 작은 두 노드 결합: D(7) + E(7) = DE(14)
2단계: F(7) + C(10) = FC(17)
3단계: DE(14) + B(15) = DEB(29)
4단계: A(16) + FC(17) = AFC(33)
5단계: G(17) + DEB(29) = GDEB(46)
6단계: AFC(33) + GDEB(46) = 루트(79)

허프만 코드:
- A: 00
- F: 010
- C: 011
- G: 10
- B: 111
- D: 1100
- E: 1101`
          }
        ]
      },
      {
        question: "다음 그래프의 최소신장트리를 구하시오.\n- Kruskal 알고리즘\n- Prim 알고리즘",
        answers: [
          {
            type: "text",
            content: `Kruskal 알고리즘:
간선을 가중치 오름차순으로 정렬한 후, 사이클을 형성하지 않는 간선을 순서대로 선택하여 MST를 구성한다. Union-Find 자료구조를 사용하여 사이클 여부를 판단한다.

Prim 알고리즘:
임의의 시작 정점에서 출발하여, 현재 MST에 포함된 정점과 인접한 간선 중 가중치가 가장 작은 간선을 선택하여 MST를 확장한다. 우선순위 큐를 사용하여 효율적으로 구현할 수 있다.`
          },
          {
            type: "code",
            content: `# Kruskal 알고리즘 구현
class UnionFind:
  def __init__(self, n):
    self.parent = list(range(n))
    self.rank = [0] * n

  def find(self, x):
    if self.parent[x] != x:
      self.parent[x] = self.find(self.parent[x])
    return self.parent[x]

  def union(self, x, y):
    px, py = self.find(x), self.find(y)
    if px == py:
      return False
    if self.rank[px] < self.rank[py]:
      px, py = py, px
    self.parent[py] = px
    if self.rank[px] == self.rank[py]:
      self.rank[px] += 1
    return True

def kruskal(n, edges):
  edges.sort(key=lambda x: x[2])  # 가중치 기준 정렬
  uf = UnionFind(n)
  mst = []
  for u, v, w in edges:
    if uf.union(u, v):
      mst.append((u, v, w))
      if len(mst) == n - 1:
        break
  return mst

# Prim 알고리즘 구현
import heapq

def prim(n, adj):
  visited = [False] * n
  mst = []
  heap = [(0, 0, -1)]  # (가중치, 현재 정점, 이전 정점)
  while heap and len(mst) < n:
    w, u, prev = heapq.heappop(heap)
    if visited[u]:
      continue
    visited[u] = True
    if prev != -1:
      mst.append((prev, u, w))
    for v, weight in adj[u]:
      if not visited[v]:
        heapq.heappush(heap, (weight, v, u))
  return mst

# 테스트
print("--- Kruskal 알고리즘 ---")
n_vertices = 4
# (u, v, weight)
edge_list = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
print(f"MST 간선들: {kruskal(n_vertices, edge_list)}")

print("\\n--- Prim 알고리즘 ---")
# 인접 리스트 형태
adj_list = {
    0: [(1, 10), (2, 6), (3, 5)], 
    1: [(0, 10), (3, 15)], 
    2: [(0, 6), (3, 4)], 
    3: [(0, 5), (1, 15), (2, 4)]
}
print(f"MST 간선들: {prim(n_vertices, adj_list)}")`
          }
        ]
      },
      {
        question: "용량 3kg짜리 가방에 최대한 높은 값어치를 담는 방법을 구하도록 구현하시오.\n- 인형키링(0.5kg, 5만원), 노트북(2kg, 70만원), 시계(0.5kg, 100만원), 휴대전화(1kg, 90만원)\n- 모든 물건은 자르거나 쪼갤 수 있다.",
        answers: [
          {
            type: "text",
            content: `분할 가능 배낭 문제 (Fractional Knapsack)는 그리디 알고리즘으로 해결한다.

단위 무게당 가치 계산:
- 인형키링: 5/0.5 = 10만원/kg
- 노트북: 70/2 = 35만원/kg
- 시계: 100/0.5 = 200만원/kg
- 휴대전화: 90/1 = 90만원/kg

단위 가치 내림차순: 시계(200) > 휴대전화(90) > 노트북(35) > 인형키링(10)

탐욕적 선택:
1. 시계 0.5kg 전부 담기 → 남은 용량: 2.5kg, 가치: 100만원
2. 휴대전화 1kg 전부 담기 → 남은 용량: 1.5kg, 가치: 190만원
3. 노트북 1.5kg 분할 담기 → 남은 용량: 0kg, 가치: 190 + 70×(1.5/2) = 242.5만원

최대 가치: 242.5만원`
          },
          {
            type: "code",
            content: `def fractional_knapsack(capacity, items):
    # items: [(이름, 무게, 가치)]
    # 단위 무게당 가치 기준으로 내림차순 정렬
    items_sorted = sorted(items, key=lambda x: x[2]/x[1], reverse=True)

    total_value = 0
    remaining = capacity

    for name, weight, value in items_sorted:
        if remaining <= 0:
            break
        if weight <= remaining:
            total_value += value
            remaining -= weight
            print(f"{name}: {weight}kg 전부 담음 (가치: {value}만원)")
        else:
            fraction = remaining / weight
            total_value += value * fraction
            print(f"{name}: {remaining}kg 분할 담음 (가치: {value * fraction:.1f}만원)")
            remaining = 0

    return total_value

items = [
    ("인형키링", 0.5, 5),
    ("노트북", 2, 70),
    ("시계", 0.5, 100),
    ("휴대전화", 1, 90)
]

result = fractional_knapsack(3, items)
print(f"\\n최대 가치: {result}만원")`
          }
        ]
      }
    ]
  },
  {
    section: "Divide and Conquer",
    problems: [
      {
        question: "분할정복의 3단계를 쓰고, 각각을 설명하시오.",
        answers: [
          {
            type: "text",
            content: `분할정복(Divide and Conquer)의 3단계:

1. 분할(Divide): 원래 문제를 같은 유형의 더 작은 부분 문제(Sub-problem)들로 나눈다. 보통 문제를 절반씩 분할하여 재귀적으로 처리한다.

2. 정복(Conquer): 각 부분 문제를 재귀적으로 해결한다. 부분 문제가 충분히 작아지면 직접(base case) 해결한다.

3. 결합(Combine): 부분 문제들의 해를 합쳐서 원래 문제의 해를 구한다. 이 단계에서 부분 결과들을 병합하여 최종 결과를 만들어낸다.`
          }
        ]
      },
      {
        question: "Merge Sorting 코드를 작성하시오.\n- [8, 9, 89, 1, 2, 54, 7, 6, 3]을 병합 정렬할 때, 부분배열의 결합은 총 몇 번 일어나는가?",
        answers: [
          {
            type: "code",
            content: `merge_count = 0

def merge_sort(arr):
    global merge_count
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    merge_count += 1
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

arr = [8, 9, 89, 1, 2, 54, 7, 6, 3]
sorted_arr = merge_sort(arr)
print(f"정렬 전: [8, 9, 89, 1, 2, 54, 7, 6, 3]")
print(f"정렬 결과: {sorted_arr}")
print(f"부분배열 결합 횟수: {merge_count}회")`
          }
        ]
      },
      {
        question: "다음을 쿼드 트리 구조를 이용하여 압축하시오.\n\n01010011\n01100011\n11001111\n11001111\n01000000\n10000000\n11000000\n11000000",
        answers: [
          {
            type: "code",
            content: `def quad_tree_compress(matrix, r, c, size):
    # 현재 영역이 모두 같은 값인지 확인
    first = matrix[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if matrix[i][j] != first:
                all_same = False
                break
        if not all_same:
            break

    if all_same:
        return str(first)
    else:
        half = size // 2
        tl = quad_tree_compress(matrix, r, c, half)           # 좌상
        tr = quad_tree_compress(matrix, r, c + half, half)     # 우상
        bl = quad_tree_compress(matrix, r + half, c, half)     # 좌하
        br = quad_tree_compress(matrix, r + half, c + half, half)  # 우하
        return f"({tl}{tr}{bl}{br})"

data = [
    [0,1,0,1,0,0,1,1],
    [0,1,1,0,0,0,1,1],
    [1,1,0,0,1,1,1,1],
    [1,1,0,0,1,1,1,1],
    [0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0],
]

result = quad_tree_compress(data, 0, 0, 8)
print("압축할 이미지 매트릭스:")
for row in data:
    print(row)
print(f"\\n압축 결과: {result}")`
          }
        ]
      }
    ]
  },
  {
    section: "Dynamic Programming",
    problems: [
      {
        question: "두 개의 문자열이 입력되었을 때, 두 문자열의 최장 공통 부분 수열(LCS)을 구하는 코드를 작성하시오.\n- LCS 길이 구하는 함수와 LCS가 무엇인지 추적하는 함수를 따로 작성하시오.",
        answers: [
          {
            type: "code",
            content: `def lcs_length(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp

def lcs_traceback(dp, X, Y):
    i, j = len(X), len(Y)
    lcs = []

    while i > 0 and j > 0:
        if X[i-1] == Y[j-1]:
            lcs.append(X[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(lcs))

# 테스트
X = "ABCBDAB"
Y = "BDCAB"
print(f"문자열 1: {X}\\n문자열 2: {Y}\\n")
dp = lcs_length(X, Y)
print(f"LCS 길이: {dp[len(X)][len(Y)]}")
print(f"LCS: {lcs_traceback(dp, X, Y)}")`
          }
        ]
      },
      {
        question: "용량 3kg짜리 가방에 최대한 높은 값어치를 담는 방법을 구하도록 구현하시오.\n- 인형키링(0.5kg, 5만원), 노트북(2kg, 70만원), 시계(0.5kg, 100만원), 휴대전화(1kg, 90만원)\n- 모든 물건은 자르거나 쪼갤 수 없다.\n- 타뷸레이션 표를 작성하시오.",
        answers: [
          {
            type: "text",
            content: `0/1 배낭 문제를 DP로 풀기 위해 무게를 0.5kg 단위로 정수화한다 (×2).
용량: 6 (= 3kg × 2), 인형키링(1, 5), 노트북(4, 70), 시계(1, 100), 휴대전화(2, 90)

타뷸레이션 표 (dp[i][w] = i번째 물건까지 고려, 용량 w일 때 최대 가치):

         w=0  w=1  w=2  w=3  w=4  w=5  w=6
없음:      0    0    0    0    0    0    0
인형키링:  0    5    5    5    5    5    5
노트북:    0    5    5    5   70   75   75
시계:      0  100  105  105  105  170  175
휴대전화:  0  100  105  190  195  195  195

최대 가치: 195만원 (시계 + 휴대전화 = 100 + 90 + 인형키링 5 = 195만원)`
          },
          {
            type: "code",
            content: `def knapsack_01(capacity, items):
    # items: [(이름, 무게, 가치)]
    # 무게를 0.5단위 -> 정수화 (×2)
    cap = int(capacity * 2)
    n = len(items)

    dp = [[0] * (cap + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        name, w, v = items[i-1]
        w_int = int(w * 2)
        for j in range(cap + 1):
            if w_int <= j:
                dp[i][j] = max(dp[i-1][j], dp[i-1][j - w_int] + v)
            else:
                dp[i][j] = dp[i-1][j]

    # 역추적
    result = []
    j = cap
    for i in range(n, 0, -1):
        if dp[i][j] != dp[i-1][j]:
            result.append(items[i-1][0])
            j -= int(items[i-1][1] * 2)

    return dp[n][cap], result

items = [
    ("인형키링", 0.5, 5),
    ("노트북", 2, 70),
    ("시계", 0.5, 100),
    ("휴대전화", 1, 90)
]

max_val, selected = knapsack_01(3, items)
print(f"최대 가치: {max_val}만원")
print(f"선택한 물건: {selected}")`
          }
        ]
      },
      {
        question: "타뷸레이션과 메모이제이션의 차이점을 서술하시오.",
        answers: [
          {
            type: "text",
            content: `타뷸레이션 (Tabulation) - 상향식(Bottom-Up):
- 작은 부분 문제부터 시작하여 큰 문제로 차례대로 해결한다.
- 반복문(iteration)을 사용하여 DP 테이블을 채운다.
- 모든 부분 문제를 빠짐없이 계산한다.
- 재귀 호출 오버헤드가 없어 일반적으로 더 빠르다.
- 스택 오버플로우 위험이 없다.

메모이제이션 (Memoization) - 하향식(Top-Down):
- 큰 문제부터 시작하여 필요한 부분 문제만 재귀적으로 해결한다.
- 재귀 함수와 캐시(딕셔너리/배열)를 사용한다.
- 필요한 부분 문제만 계산하므로 일부 경우 더 효율적일 수 있다.
- 재귀 호출 오버헤드가 있고, 깊은 재귀 시 스택 오버플로우 위험이 있다.
- 코드가 직관적이고 원래 점화식과 유사하게 작성할 수 있다.`
          }
        ]
      }
    ]
  },
  {
    section: "Backtracking",
    problems: [
      {
        question: "다음 지도에서 남한의 각 광역자치단체를 인접한 지역끼리는 다른 색으로 색칠하려고 한다.\n- 그래프로 변환하여 그리시오.\n- 경기도는 G, 강원도는 B로 칠하고, 나머지 광역자치단체도 R,G,B,Y만 사용하여 색칠하려고 할 때, 상태공간트리를 나타내시오.",
        answers: [
          {
            type: "text",
            content: `그래프 색칠 문제 (Graph Coloring)를 백트래킹으로 해결한다.

남한 광역자치단체 인접 관계 (간략화):
- 경기도: 강원도, 충청북도, 충청남도
- 강원도: 경기도, 충청북도, 경상북도
- 충청북도: 경기도, 강원도, 충청남도, 전라북도, 경상북도
- 충청남도: 경기도, 충청북도, 전라북도
- 전라북도: 충청북도, 충청남도, 전라남도, 경상남도
- 전라남도: 전라북도, 경상남도
- 경상북도: 강원도, 충청북도, 경상남도
- 경상남도: 전라북도, 전라남도, 경상북도

경기도 = G(초록), 강원도 = B(파랑)으로 고정 후,
백트래킹으로 나머지 지역을 R, G, B, Y 중 인접 지역과 다른 색으로 칠한다.

색칠 결과 (예시):
경기도: G, 강원도: B, 충북: R, 충남: B, 전북: G, 전남: R, 경북: G, 경남: B`
          },
          {
            type: "code",
            content: `def graph_coloring(graph, colors, fixed={}):
    regions = list(graph.keys())
    assignment = dict(fixed)

    def is_safe(region, color):
        for neighbor in graph[region]:
            if neighbor in assignment and assignment[neighbor] == color:
                return False
        return True

    def backtrack(idx):
        if idx == len(regions):
            return True
        region = regions[idx]
        if region in assignment:
            return backtrack(idx + 1)
        for color in colors:
            if is_safe(region, color):
                assignment[region] = color
                if backtrack(idx + 1):
                    return True
                del assignment[region]
        return False

    if backtrack(0):
        return assignment
    return None

# 남한 광역자치단체 인접 그래프
graph = {
    "경기도": ["강원도", "충청북도", "충청남도"],
    "강원도": ["경기도", "충청북도", "경상북도"],
    "충청북도": ["경기도", "강원도", "충청남도", "전라북도", "경상북도"],
    "충청남도": ["경기도", "충청북도", "전라북도"],
    "전라북도": ["충청북도", "충청남도", "전라남도", "경상남도"],
    "전라남도": ["전라북도", "경상남도"],
    "경상북도": ["강원도", "충청북도", "경상남도"],
    "경상남도": ["전라북도", "전라남도", "경상북도"]
}

colors = ['R', 'G', 'B', 'Y']
fixed = {"경기도": "G", "강원도": "B"}

print("백트래킹 색칠 결과:")
result = graph_coloring(graph, colors, fixed)
if result:
    for region, color in result.items():
        print(f"{region}: {color}")`
          }
        ]
      }
    ]
  }
];
