export const weeksData = [
  {
    id: 1,
    title: "1주차: 큐 (Queue) 복습",
    role: "개념 복습 및 기본 자료구조 구현",
    reflection: "가장 기본적인 자료구조인 큐를 배열과 연결 리스트 두 가지 방식으로 구현해 보았습니다. 데이터가 들어온 순서대로 처리되는 FIFO(First In First Out)의 특징을 다시 한 번 상기할 수 있었습니다.",
    codes: [
      {
        title: "큐 클래스 구현 (연결 리스트) + 테스트",
        code: `class Node:
  def __init__(self, data):
    self.data = data
    self.next = None


class Queue:
  def __init__(self):
    self.front = None
    self.tail = None

  def enQueue(self, num):
    new = Node(num)
    if self.tail == None:
      self.front = self.tail = new
    else:
      self.tail.next = new
      self.tail = new

  def deQueue(self):
    if self.front == None:
      print("dequeue FAIL: Queue is empty.")
    elif self.front == self.tail:
      data = self.front.data
      self.front = self.tail = None
      return data
    else:
      data = self.front.data
      self.front = self.front.next
      return data

  def printQueue(self):
    cur = self.front
    print("Queue: ", end="")
    if cur == None:
      print("is empty.")
    else:
      while cur != None:
        print(f'{cur.data}', end=", ")
        cur = cur.next
      print()

  def size(self):
    cur = self.front
    size = 0
    while cur != None:
      size += 1
      cur = cur.next
    return size

# 테스트
Q = Queue()
Q.printQueue()

Q.enQueue(9)
Q.printQueue()

Q.enQueue(3)
Q.enQueue(12)
Q.enQueue(24)
Q.printQueue()

print(f"삭제된 값: {Q.deQueue()}")
Q.printQueue()

print(f"삭제된 값: {Q.deQueue()}")
Q.printQueue()`
      },
      {
        title: "놀이기구 줄 관리 프로그램 (개선 버전)",
        code: `# 놀이기구 줄 관리 프로그램
# [웹 환경 적응] input()과 시간 기반 로직 대신 시뮬레이션으로 대체

class Node:
  def __init__(self, data):
    self.data = data
    self.next = None

class Queue:
  def __init__(self):
    self.front = None
    self.tail = None
  def enQueue(self, num):
    new = Node(num)
    if self.tail == None:
      self.front = self.tail = new
    else:
      self.tail.next = new
      self.tail = new
  def deQueue(self):
    if self.front == None:
      print("dequeue FAIL: Queue is empty.")
      return None
    elif self.front == self.tail:
      data = self.front.data
      self.front = self.tail = None
      return data
    else:
      data = self.front.data
      self.front = self.front.next
      return data
  def printQueue(self):
    cur = self.front
    print("Queue: ", end="")
    if cur == None:
      print("is empty.")
    else:
      while cur != None:
        print(f'{cur.data}', end=", ")
        cur = cur.next
      print()
  def size(self):
    cur = self.front
    size = 0
    while cur != None:
      size += 1
      cur = cur.next
    return size

line = Queue()

def run(size):
  if size > 3:
    for i in range(3):
      line.deQueue()
  elif size == 0:
    return
  else:
    for i in range(size):
      line.deQueue()
  print('야호 신난다!')

# 시뮬레이션: 손님들이 줄을 섬
names = ["민수", "영희", "철수", "지은", "동현", "수진", "태호"]
for name in names:
  line.enQueue(name)
  print(f"줄을 서시오! -> {name}")
  line.printQueue()

# 5초 경과 시뮬레이션 - 놀이기구 운행!
print("\\n--- 5초 경과, 놀이기구 운행! (최대 3명 탑승) ---")
run(line.size())
line.printQueue()

print("\\n--- 5초 경과, 놀이기구 운행! ---")
run(line.size())
line.printQueue()`
      },
      {
        title: "queue.Queue 모듈 활용",
        code: `from queue import Queue as q2

q = q2()
q.put(1)
q.put(2)
q.put(3)
print("큐 내용:", list(q.queue))

val = q.get()
print(f"꺼낸 값: {val}")
print("큐 내용:", list(q.queue))

print(f"큐가 비어있나? {q.empty()}")
print("큐 내용:", list(q.queue))`
      }
    ]
  },
  {
    id: 2,
    title: "2주차: 우선순위 큐 (Priority Queue)와 힙 (Heap)",
    role: "최소 힙 / 최대 힙 구현 및 활용",
    reflection: "일반 큐와 달리 데이터의 '우선순위'에 따라 추출되는 우선순위 큐를 힙(Heap) 구조를 통해 O(log N)의 시간복잡도로 구현했습니다. 파이썬의 heapq 모듈의 편리함도 함께 느꼈습니다.",
    codes: [
      {
        title: "우선순위 큐 구현 (연결 리스트 기반)",
        code: `import heapq

class Node:
  def __init__(self, data, pri):
    self.data = data
    self.next = None
    self.pri = pri


class Queue:
  def __init__(self):
    self.front = None
    self.tail = None

  def enQueue(self, num, pri):
    new = Node(num, pri)
    if self.tail == None:
      self.front = self.tail = new
    elif self.front == self.tail:
      if self.front.pri <= new.pri:
        self.front.next = new
        self.tail = new
      else:
        self.front = new
        self.front.next = self.tail
    else:
      cur = self.front
      if new.pri < self.front.pri:
        new.next = self.front
        self.front = new
        return
      while True:
        if (cur.pri <= new.pri) and (new.pri < cur.next.pri):
          new.next = cur.next
          cur.next = new
          return
        elif cur == self.tail:
          self.tail.next = new
          self.tail = new
          return
        else:
          cur = cur.next

  def deQueue(self):
    if self.front == None:
      print("dequeue FAIL: Queue is empty.")
      return None
    elif self.front == self.tail:
      data = self.front.data
      self.front = self.tail = None
      return data
    else:
      data = self.front.data
      self.front = self.front.next
      return data

  def printQueue(self):
    cur = self.front
    print("Queue: ", end="")
    if cur == None:
      print("is empty.")
    else:
      while cur != None:
        print(f'{cur.data}', end=", ")
        cur = cur.next
      print()

  def size(self):
    cur = self.front
    size = 0
    while cur != None:
      size += 1
      cur = cur.next
    return size

# 테스트
a = Queue()
a.enQueue(2, 5)
a.enQueue(3, 6)
a.enQueue(9, 1)
a.enQueue(10, 5.5)
a.printQueue()`
      },
      {
        title: "최소 힙(Min Heap) 직접 구현",
        code: `#   0
#  12
# 3456...
#
#   1
#  23
# 4567....

class heap: #min heap 구현
  def __init__(self):
    self.l = ['start'] #인덱스가 0보단 1부터 시작하는게 계산하기 쉬움

  def en(self, data):
    self.l.append(data)
    a = int(len(self.l)-1) #자식노드 인덱스
    parent = int(a//2) #부모노드 인덱스
    if a == 1:
      return
    while a>1:  #자식 부모 크기 비교 & 위치 변경
     if self.l[parent] > self.l[a]:
        x = self.l[parent]
        self.l[parent] = self.l[a]
        self.l[a] = x
        a = parent #인덱스 업데이트
        parent = int(a//2)
     else:
        break

  def de(self):
    if len(self.l) <= 1:
      return None

    data = self.l[1] #값 저장
    self.l[1] = self.l[-1] #맨아래, 맨 오른쪽 노드를 최상위로 가져옴
    del self.l[-1]

    a = 1 #부모노드 인덱스
    son = a*2 #자식 노드 인덱스

    while son <= len(self.l) - 1: #자식노드가 있는 동안
      if son + 1 <= len(self.l) - 1 and self.l[son] > self.l[son+1]: #자식 노드중 작은 것 판별
        min_son = son + 1
      else:
        min_son = son

      if self.l[a] > self.l[min_son]: #자식 노드가 더 작은 경우 자리변경
        x = self.l[a]
        self.l[a] = self.l[min_son]
        self.l[min_son] = x
        a = min_son #인덱스 업데이트
        son = a * 2
      else:
        break

    return data

h = heap()
h.en(5)
h.en(4)
h.en(8)
print("첫 번째 pop:", h.de())

h.en(1)
h.en(999)
h.en(3)
print("\\n나머지 순서대로 pop:")
for i in range(5):
  print(h.de())`
      },
      {
        title: "재고 보충 문제 (Heap 활용)",
        code: `# 재고 보충 문제 - Heap 사용 버전
# 제한 사항: 총 stocks가 k 이상이 될때까지 추가해야함.
# 그 도중에 stocks가 음수가 되면 안됨(0은 가능).
# 주문 횟수를 최소로 하는 경우의 수를 찾아야함
#
# 목표 알고리즘:
# 1. 현재 총 stocks로 버틸 수 있는 날 이전까지 보급가능 날(dates) 정리
# 2. 전체 보급 가능한 날짜 중 가장 보급량(supplies)이 많은 날에서 가져옴
# 3. 해당 날짜 정보 제거
# 4. 총 K일 버틸 수 있는지 확인. 불가능시 1번으로 돌아감

import heapq

class max_heap:
  def __init__(self):
    self.l = []
  def en(self, data):
    heapq.heappush(self.l, -data)
  def de(self):
    if not self.l:
      return None
    return -heapq.heappop(self.l)

# [웹 환경 적응] input() 대신 예시 데이터 사용
stock = 4
dates = [4, 10, 15]
sup = [20, 2, 10]
k = 30

print(f"초기 재고: {stock}")
print(f"보급 가능 날짜: {dates}")
print(f"보급량: {sup}")
print(f"목표 일수: {k}")

h = max_heap()
times = 0

def survive(stock, dates):
  i = 0
  while len(dates) > i:
    if stock < dates[i]:
      break
    i+=1
  return i

while stock < k:
  can_survive = survive(stock, dates)

  for i in range(can_survive):
    h.en(sup[i])

  del sup[:can_survive]
  del dates[:can_survive]

  stock += h.de()
  times += 1

print(f'\\n최소 보충 횟수: {times}')`
      },
      {
        title: "재고 보충 문제 (리스트 활용, Heap 미사용)",
        code: `# 재고 보충 문제 - Heap 사용하지 않는 버전
# 리스트를 선택적으로 복사해서 max 값을 찾는 방식

# [웹 환경 적응] input() 대신 예시 데이터 사용
stock = 4
dates = [4, 10, 15]
sup = [20, 2, 10]
k = 30

print(f"초기 재고: {stock}")
print(f"보급 가능 날짜: {dates}")
print(f"보급량: {sup}")
print(f"목표 일수: {k}")

times = 0

def survive(stock, dates):
  i = 0
  can_survive = []
  while len(dates) > i:
    if stock >= dates[i]:
      can_survive.append(dates[i])
    else:
      break
    i+=1
  return len(can_survive)

while stock < k:
  can_survive = survive(stock, dates)
  possible_sup = sup[:can_survive] #heap 대신 리스트를 선택적으로 복붙해서 사용
  max_val = max(possible_sup)   #최댓값 구하기
  max_index = possible_sup.index(max_val) #최댓값의 인덱스 구하기
  dates.pop(max_index) #해당 값 삭제

  stock += sup.pop(max_index) #서플라이 값을 stock에 추가, 해당 값 삭제
  times += 1

print(f'\\n최소 보충 횟수: {times}')`
      }
    ],
    pdf: "2주차 우선순위 큐와 힙.pdf"
  },
  {
    id: 3,
    title: "3주차: 해시 테이블 (Hash Table)",
    role: "해시 함수 구현 및 충돌 해결",
    reflection: "Division, Folding 방식의 해시 함수를 직접 작성해보며 해시 테이블의 원리를 이해했습니다. 충돌(Collision) 해결을 위한 Chaining 기법의 중요성도 깨달았습니다.",
    codes: [
      {
        title: "해시 테이블 - Division 방식",
        code: `class HashTableDivision:
  def __init__(self, size=7):
    self.size = size
    self.table = [None] * size

  def hash_fn(self, key):
    return key % self.size

  def insert(self, key, value):
    idx = self.hash_fn(key)
    self.table[idx] = (key, value)

  def search(self, key):
    idx = self.hash_fn(key)
    if self.table[idx] is None:
      return None
    return self.table[idx][-1]

  def display(self):
    print("\\n[ 해시 테이블 상태 ]")
    for i, slot in enumerate(self.table):
      print(f"  [{i}] {slot}")
    print()

ht = HashTableDivision(size=7)

ht.insert(16, "apple")   # 16 % 7 = 2
ht.insert(5,  "daisy")   # 5  % 7 = 5

ht.display()

print("search(16):", ht.search(16))
print("search(22):", ht.search(22))
print("search(5):", ht.search(5))`
      },
      {
        title: "해시 테이블 - Folding 방식 (초기 버전)",
        code: `class HashTableFolding:
  def __init__(self, size=193):
    self.size = size
    self.table = [None] * size

  def fold(self, key):
    hash = 0
    if len(str(key)) % 2: #어째서인지 큰 자리 숫자부터 묶길 바라는 예제를 위한 더러운 코드
      div = 10

      hash += (key % div)
      key = key // div

      div = 100

      while key>0:
        hash += (key % div)
        key = key // div

    else:
      div = 100

      while key>0:
        hash += (key % div)
        key = key // div

    return hash % self.size

  def insert(self, key, value):
    idx = self.fold(key)
    self.table[idx] = (key, value)

  def search(self, key):
    idx = self.fold(key)
    if self.table[idx] is None:
      return None
    return self.table[idx][-1]

  def display(self):
    print("\\n[ 해시 테이블 상태 ]")
    for slot in self.table:
      if slot is None:
        continue
      idx = self.fold(slot[0])
      print(f"[{idx}]{slot}")
    print()

ht = HashTableFolding()
ht.insert(123456789, "apple")
ht.insert(987654321, "banana")
ht.insert(111222333, "cherry")

ht.display()
print("search(123456789):", ht.search(123456789))
print("search(111222333):", ht.search(111222333))
print("search(999999999):", ht.search(999999999))`
      },
      {
        title: "해시 테이블 - Folding 방식 (개선 버전 + delete 기능)",
        code: `class HashTableFolding:
  def __init__(self, size=193, N=100):
    self.size = size
    self.N = N
    self.table = [None] * size

  def fold(self, key):
    hash = 0

    div = self.N
    while key>0: #깔끔 모든 문제는 이래야함.
      hash += (key % div)
      key = key // div

    return hash % self.size

  def insert(self, key, value):
    idx = self.fold(key)
    self.table[idx] = (key, value)

  def search(self, key):
    idx = self.fold(key)
    if self.table[idx] is None:
      return None
    return self.table[idx][-1]

  def delete(self, key):
        idx = self.fold(key)
        if self.table[idx] is not None and self.table[idx][0] == key:
            self.table[idx] = None

  def display(self):
    print("\\n[ 해시 테이블 상태 ]")
    for slot in self.table:
      if slot is None:
        continue
      idx = self.fold(slot[0])
      print(f"[{idx}]{slot}")
    print()

ht = HashTableFolding()
ht.insert(111, "apple")
ht.insert(321321, "banana")
ht.insert(41242, "cherry")

ht.display()
print("search(111):", ht.search(111))
print("search(321321):", ht.search(321321))
print("search(41242):", ht.search(41242))
print("search(999999999):", ht.search(999999999))

ht.delete(111)
print("\\n--- 111 삭제 후 ---")
ht.display()`
      },
      {
        title: "학생 출석 관리 시스템",
        code: `# 해시 테이블을 활용한 학생 출석 관리
# [웹 환경 적응] input() 대신 예시 데이터 사용

class HashTableFolding:
  def __init__(self, size=193, N=100):
    self.size = size
    self.N = N
    self.table = [None] * size
  def fold(self, key):
    hash = 0
    div = self.N
    while key>0:
      hash += (key % div)
      key = key // div
    return hash % self.size
  def insert(self, key, value):
    idx = self.fold(key)
    self.table[idx] = (key, value)
  def search(self, key):
    idx = self.fold(key)
    if self.table[idx] is None:
      return None
    return self.table[idx][-1]
  def delete(self, key):
    idx = self.fold(key)
    if self.table[idx] is not None and self.table[idx][0] == key:
      self.table[idx] = None
  def display(self):
    print("\\n[ 해시 테이블 상태 ]")
    for slot in self.table:
      if slot is None:
        continue
      idx = self.fold(slot[0])
      print(f"[{idx}]{slot}")
    print()

cafeteria_table = HashTableFolding()

def check(id):
  name = cafeteria_table.search(id)
  if name:
    print(f"출석 확인: {id} {name}님 환영합니다.")
  else:
    print(f"출입 금지: {id} 잘못된 학번입니다.")

# 학기 초 명단 등록 (시뮬레이션)
print("[ 학기 초 명단 등록 ]")
students = [(20240001, "김민수"), (20240002, "이영희"), (20240003, "박철수")]
for sid, name in students:
  cafeteria_table.insert(sid, name)
  print(f"등록: {sid} {name}")

cafeteria_table.display()

# 출석 확인
print("[ 출석 확인 ]")
check(20240001)
check(20240002)
check(99999999)

# 전학생 제거
print("\\n[ 전학생 제거: 20240002 ]")
cafeteria_table.delete(20240002)
cafeteria_table.display()
check(20240002)`
      },
      {
        title: "Two Sum 문제 (해시 활용)",
        code: `# Two Sum 문제: 배열에서 두 수의 합이 target이 되는 쌍 찾기
# 해시 테이블을 활용해 O(n) 시간에 해결

def solution(arr, target):
    seen = {}  # 해시 테이블 역할

    for num in arr:
        complement = target - num

        if complement > 0 and complement in seen:
            return True
        seen[num] = True

    return False


print(solution([2,7,11,15], 9))   # True (2+7=9)
print(solution([2,7,11,15], 10))  # False
print(solution([1,3,5,7], 6))     # True (1+5=6)
print(solution([1,3,5,7], 2))     # False
print(solution([4,4,8,12], 8))    # True (4+4=8)`
      }
    ],
    pdf: "3주차 해시 테이블.pdf"
  },
  {
    id: 4,
    title: "4주차: 시간복잡도 분석 (Time Complexity)",
    role: "다양한 알고리즘의 수행 시간 비교",
    reflection: "피보나치 수열을 단순 재귀 O(2^n), 메모이제이션 O(n), 행렬 거듭제곱 O(log n)으로 구현하고 실제 수행 시간을 비교해보았습니다. 알고리즘 최적화의 위력을 실감했습니다.",
    codes: [
      {
        title: "계단 오르기 - 시간복잡도 비교 (O(N) / O(log N) / O(2^N))",
        code: `import time as t
import sys

sys.setrecursionlimit(10000)

n = 30
print(f"계단의 수: {n}\\n")

# ===== O(N) 피보나치 (메모이제이션) =====
memo = {}
def fibo_memo(n):
    if n in memo:
        return memo[n]
    if n == 1:
        return 1
    if n == 2:
        return 2
    memo[n] = fibo_memo(n-1) + fibo_memo(n-2)
    return memo[n]

t1 = t.time()
ans = fibo_memo(n)
t2 = t.time()
t_fibo_memo = t2 - t1
print(f'O(N) 메모이제이션: 경우의 수 {ans}, 소요 시간 {t_fibo_memo:.6f}초')

# ===== O(log N) 행렬 거듭제곱 =====
def multiply_matrix(A, B):
    return [
        [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
        [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
    ]

def power_matrix(M, p):
    result = [[1, 0], [0, 1]]  # 단위 행렬
    base = M
    while p > 0:
        if p % 2 == 1:
            result = multiply_matrix(result, base)
        base = multiply_matrix(base, base)
        p //= 2
    return result

def climb_stairs_log_n(n):
    if n == 1:
        return 1
    if n == 2:
        return 2
    transformation_matrix = [[1, 1], [1, 0]]
    matrix_n_minus_2 = power_matrix(transformation_matrix, n - 2)
    a_n = matrix_n_minus_2[0][0] * 2 + matrix_n_minus_2[0][1] * 1
    return a_n

t1 = t.time()
ans = climb_stairs_log_n(n)
t2 = t.time()
t_vec = t2 - t1
print(f'O(log N) 행렬 거듭제곱: 경우의 수 {ans}, 소요 시간 {t_vec:.6f}초')

# ===== O(2^N) 피보나치 (단순 재귀) =====
def fibo_2n(n):
    if n == 1:
        return 1
    if n == 2:
        return 2
    return fibo_2n(n-1) + fibo_2n(n-2)

t1 = t.time()
ans = fibo_2n(n)
t2 = t.time()
t_fibo_nor = t2 - t1
print(f'O(2^N) 단순 재귀: 경우의 수 {ans}, 소요 시간 {t_fibo_nor:.6f}초')

# ===== 결과 비교 =====
time_results = {
    'O(n)': t_fibo_memo,
    'O(log n)': t_vec,
    'O(2^n)': t_fibo_nor
}

print("\\n소요 시간 오름차순 출력:")
sorted_results = sorted(time_results.items(), key=lambda item: item[1])
for big_o, time_taken in sorted_results:
    print(f"{big_o}: {time_taken:.6f}초")`
      },
      {
        title: "정렬 알고리즘 성능 비교 (병합/퀵/버블)",
        code: `import time as t
import sys
import random as r

sys.setrecursionlimit(100000)

# 1. 정렬 알고리즘 정의
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])
    return merge(left_half, right_half)

def merge(left, right):
    result = []
    i = 0
    j = 0
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

def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# 2. 유틸리티 함수
def calc_min_diff(arr):
    min_dif = float('inf')
    for i in range(len(arr) - 1):
        dif = arr[i+1] - arr[i]
        if dif < min_dif:
            min_dif = dif
    return min_dif

# 3. 난수 배열 생성
ARRAY_SIZE = 3000
print(f"배열 크기: {ARRAY_SIZE}개의 난수 생성 완료\\n")
original_arr = [r.randint(-100000, 100000) for _ in range(ARRAY_SIZE)]

time_results = {}

# 4. 성능 측정
# [병합 정렬 평가]
arr_merge = original_arr.copy()
t1 = t.time()
arr_merge_sorted = merge_sort(arr_merge)
min_dif_merge = calc_min_diff(arr_merge_sorted)
t2 = t.time()
tmerge = t2 - t1
time_results['병합 정렬'] = tmerge
print(f"병합 정렬 완료 -> 차의 최솟값: {min_dif_merge}")

# [퀵 정렬 평가]
arr_quick = original_arr.copy()
t1 = t.time()
quick_sort(arr_quick, 0, len(arr_quick) - 1)
min_dif_quick = calc_min_diff(arr_quick)
t2 = t.time()
tquick = t2 - t1
time_results['퀵 정렬'] = tquick
print(f"퀵 정렬 완료 -> 차의 최솟값: {min_dif_quick}")

# [버블 정렬 평가]
arr_bubble = original_arr.copy()
t1 = t.time()
bubble_sort(arr_bubble)
min_dif_bubble = calc_min_diff(arr_bubble)
t2 = t.time()
tbubble = t2 - t1
time_results['버블 정렬'] = tbubble
print(f"버블 정렬 완료 -> 차의 최솟값: {min_dif_bubble}\\n")

# 5. 결과 출력
print("기존 순서 출력:")
for sort_name, time_taken in time_results.items():
    print(f"{sort_name}: {time_taken:.6f}초")

print("\\n소요 시간 오름차순 출력:")
sorted_results = sorted(time_results.items(), key=lambda item: item[1])
for sort_name, time_taken in sorted_results:
    print(f"{sort_name}: {time_taken:.6f}초")`
      }
    ],
    pdf: "4주차 문자열 탐색.pdf"
  },
  {
    id: 5,
    title: "5주차: 문자열 탐색 알고리즘",
    role: "Brute Force, Rabin-Karp, KMP, Boyer-Moore 탐색 구현",
    reflection: "단순 탐색을 넘어 KMP와 보이어-무어(Boyer-Moore)와 같은 최적화된 문자열 탐색 기법을 배웠습니다. 전처리 배열(Skip Table 등)을 활용해 불필요한 비교를 건너뛰는 아이디어가 훌륭했습니다.",
    codes: [
      {
        title: "Brute Force 탐색",
        code: `def brute_force_search(text, pattern):
    n = len(text)
    m = len(pattern)
    total = []

    if m == 0 or n<m: #계산할 필요 없음
        return total

    for i in range(n - m + 1): #n-m 까지 순회, 텍스트 길이가 패턴 보다 짧을 순 없음
        j = 0 #초기화
        while j < m and text[i + j] == pattern[j]:#i 번째 칸부터 텍스트와 패턴의 값 1대1 대조
            j += 1

        if j == m: # 완전, 끝까지 일치시
          total.append(i)

    return total

# 검증
text_data = "ABABDABACDABABCABAB"
pattern_data = "ABABCABAB"
matches = brute_force_search(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "ABABDABACDABABCABABabcdefgABABCABAB"
pattern_data = "ABABCABAB"
matches = brute_force_search(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "박제가 되어 버린 천재를 아시오? 나는 유쾌하오. 이런 때 연애까지가 유쾌하오."
pattern_data = "유쾌"
matches = brute_force_search(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")`
      },
      {
        title: "Rabin-Karp 탐색 (해시 기반)",
        code: `def rabin_karp_search(text, pattern, q=139):
    """
    라빈-카프 알고리즘을 사용하여 텍스트 내에서 패턴을 검색하는 함수입니다.
    매칭되는 모든 시작 인덱스를 리스트로 반환합니다.
    """
    n = len(text)
    m = len(pattern)

    if m == 0 or n < m:
        return []

    d = 2  # 진수

    result = []
    p_hash = 0  # 패턴의 해시값
    t_hash = 0  # 텍스트 부분 문자열의 해시값
    h = 1

    # h = (d^(m-1)) % q 계산
    for i in range(m - 1):
        h = (h * d)
    h = h%q

    # 패턴과 텍스트의 첫 번째 부분 문자열에 대한 초기 해시값 계산
    for i in range(m):
        p_hash = (d * p_hash + ord(pattern[i])) % q
        t_hash = (d * t_hash + ord(text[i])) % q

    print(f"패턴의 해시값: {p_hash}")

    # 텍스트를 순회하며 해시값 비교 및 롤링 해시 갱신
    for i in range(n - m + 1):
        if p_hash == t_hash:
            # 해시값이 일치하면 실제 문자를 하나씩 비교 (해시 충돌 대비)
            match = True
            for j in range(m):
                if text[i + j] != pattern[j]:
                    match = False
                    break
            if match:
                result.append(i)

        # 다음 부분 문자열의 해시값 계산 (롤링 해시)
        if i < n - m:
            t_hash = (((t_hash - ord(text[i]) * h) << 1) + ord(text[i + m])) % q
            if t_hash < 0:
                t_hash += q

    return result

# 실행 예시 (q=13 사용)
q_value = 13

text_data = "ABABDABACDABABCABAB"
pattern_data = "ABABCABAB"
matches = rabin_karp_search(text_data, pattern_data, q_value)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "ABABDABACDABABCABABabcdefgABABCABAB"
pattern_data = "ABABCABAB"
matches = rabin_karp_search(text_data, pattern_data, q_value)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")`
      },
      {
        title: "KMP 탐색",
        code: `# KMP 알고리즘

def compute_lps_array(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0  # 이전 최대 접두사 길이
    i = 1 #lps의 첫 값은 항상 0

    while i < m: #끝까지 순회
        if pattern[i] == pattern[length]: #패턴의 현재 문자[i] == 접두사의 다음 문자(length)
            length += 1 #다음 인덱스 검사
            lps[i] = length
            i += 1
        else:
            if length != 0: #문자 불일치, 하지만 이전에 이미 일치했던 접두사 존재
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    print(f"패턴: {pattern}")
    print(f"LPS: {lps}")
    return lps

def kmp_search(text, pattern):
    """
    KMP 알고리즘을 사용하여 텍스트 내에서 패턴을 검색하는 함수입니다.
    매칭되는 모든 시작 인덱스를 리스트로 반환합니다.
    """
    n = len(text)
    m = len(pattern)

    if m == 0 or n<m:
        return []

    lps = compute_lps_array(pattern)
    result = []
    i = 0  # 텍스트의 인덱스
    j = 0  # 패턴의 인덱스

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            # 패턴을 찾은 경우
            result.append(i - j)
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            # 불일치가 발생한 경우
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return result

# 실행 예시
text_data = "ABABDABACDABABCABAB"
pattern_data = "ABABCABAB"
matches = kmp_search(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "ABABDABACDABABCABABabcdefgABABCABAB"
pattern_data = "ABABCABAB"
matches = kmp_search(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "박제가 되어 버린 천재를 아시오? 나는 유쾌하오. 이런 때 연애까지가 유쾌하오."
pattern_data = "유쾌"
matches = kmp_search(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")`
      },
      {
        title: "Boyer-Moore 탐색 (나쁜 문자 테이블)",
        code: `# 보이어 무어 - 나쁜 문자(Bad Character) 테이블 버전

def generate_bad_character_table(pattern):
    """
    패턴 내 각 문자의 가장 오른쪽 등장 위치를 기록하는
    나쁜 문자 테이블을 생성하는 함수입니다.
    """
    m = len(pattern)
    bad_char_table = {}

    for i in range(m):
        bad_char_table[pattern[i]] = i

    print(f"Bad Character Table: {bad_char_table}")
    return bad_char_table

def boyer_moore_bad_char(text, pattern):
    n = len(text)
    m = len(pattern)

    if m == 0 or n < m:
        return []

    bad_char_table = generate_bad_character_table(pattern)
    result = []
    s = 0

    while s <= n - m:
        j = m - 1

        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1

        if j < 0:
            result.append(s)
            if s + m < n:
                bad_char_index = bad_char_table.get(text[s + m], -1)
                s += m - bad_char_index
            else:
                s += 1
        else:
            bad_char_index = bad_char_table.get(text[s + j], -1)
            s += max(1, j - bad_char_index)

    return result

# 실행 예시
text_data = "ABABDABACDABABCABAB"
pattern_data = "ABABCABAB"
matches = boyer_moore_bad_char(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")`
      },
      {
        title: "Boyer-Moore 탐색 (건너뛰기 테이블)",
        code: `# 보이어 무어 - 건너뛰기(Skip) 테이블 버전

def generate_skip_table(pattern):
    m = len(pattern)
    skip_table = {}

    # 패턴의 마지막 문자를 제외한 나머지 문자들에 대해 건너뛰기 거리 계산
    # 수식: 패턴의 길이(m) - 1 - 현재 인덱스(i)
    for i in range(m - 1):
        skip_table[pattern[i]] = m - 1 - i

    print(f"Skip Table: {skip_table}")
    return skip_table

def boyer_moore_skip(text, pattern):
    n = len(text)
    m = len(pattern)
    total = []

    if m == 0 or n < m:
        return total

    skip_table = generate_skip_table(pattern)
    s = 0

    while s <= n - m:
        j = m - 1

        # 뒤에서부터 패턴과 텍스트 비교
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1

        if j < 0:
            # 패턴이 완전히 일치한 경우
            total.append(s)
            s += skip_table.get(text[s + m - 1], m)
        else:
            # 불일치 발생 시
            s += skip_table.get(text[s + m - 1], m)

    return total

# 실행 예시
text_data = "ABABDABACDABABCABAB"
pattern_data = "ABABCABAB"
matches = boyer_moore_skip(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "ABABDABACDABABCABABabcdefgABABCABAB"
pattern_data = "ABABCABAB"
matches = boyer_moore_skip(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")

print()
text_data = "박제가 되어 버린 천재를 아시오? 나는 유쾌하오. 이런 때 연애까지가 유쾌하오."
pattern_data = "유쾌"
matches = boyer_moore_skip(text_data, pattern_data)
print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")`
      }
    ],
    pdf: "5주차 알고리즘 설계와 성능 분석.pdf"
  },
  {
    id: 6,
    title: "6주차: 그리디 알고리즘 (Greedy Algorithm)",
    role: "허프만 코딩(Huffman Coding)을 이용한 데이터 압축",
    reflection: "매 순간 최적이라고 생각되는 것을 선택해 나가는 그리디 기법을 허프만 트리에 적용해보았습니다. 빈도가 높은 문자에 짧은 코드를 부여해 전체 데이터를 압축하는 과정이 인상깊었습니다.",
    codes: [
      {
        title: "허프만 코딩 (전체 구현: 인코딩/디코딩/압축률)",
        code: `import heapq
from collections import Counter


class Node:
    def __init__(self, char, freq, left=None, right=None):
        self.char = char
        self.freq = freq
        self.left = left
        self.right = right

    def __lt__(self, other):
        return self.freq < other.freq


def build_huffman_tree(text):
    freq = Counter(text)

    heap = []
    order = 0

    for char, count in freq.items():
        heapq.heappush(heap, (count, order, Node(char, count)))
        order += 1

    if len(heap) == 1:
        count, _, node = heapq.heappop(heap)
        return Node(None, count, left=node), freq

    print("[허프만 트리 구축 과정]")

    while len(heap) > 1:
        freq1, _, node1 = heapq.heappop(heap)
        freq2, _, node2 = heapq.heappop(heap)

        print(f"해 선택: 빈도 가장 작은 두 노드 선택 -> {node1.char}:{freq1}, {node2.char}:{freq2}")

        merged = Node(None, freq1 + freq2, node1, node2)

        print(f"실행 가능성 검사: 두 노드를 합쳐 빈도 {freq1 + freq2}의 새 노드 생성")
        print()

        heapq.heappush(heap, (merged.freq, order, merged))
        order += 1

    print("해 완성 검사: 남은 노드가 하나이므로 허프만 트리 완성")
    print()

    return heap[0][2], freq


def make_codes(node, current_code, codes):
    if node is None:
        return

    if node.char is not None:
        if current_code == "":
            codes[node.char] = "0"
        else:
            codes[node.char] = current_code
        return

    make_codes(node.left, current_code + "0", codes)
    make_codes(node.right, current_code + "1", codes)


def encode(text, codes):
    result = ""
    for char in text:
        result += codes[char]
    return result


def decode(encoded, root):
    result = ""
    node = root

    for bit in encoded:
        if bit == "0":
            node = node.left
        else:
            node = node.right

        if node.char is not None:
            result += node.char
            node = root

    return result


def huffman_coding(text):
    if text == "":
        print("빈 문자열은 압축할 수 없습니다.")
        return

    root, freq = build_huffman_tree(text)

    codes = {}
    make_codes(root, "", codes)

    print("[문자 빈도]")
    for char, count in freq.items():
        print(f"{repr(char)}: {count}")

    print()

    print("[허프만 코드]")
    for char, code in codes.items():
        print(f"{repr(char)}: {code}")

    print()

    encoded = encode(text, codes)
    decoded = decode(encoded, root)

    original_bits = len(text) * 8
    compressed_bits = len(encoded)

    compression_ratio = compressed_bits / original_bits
    reduction_ratio = 1 - compression_ratio

    print("[압축 결과]")
    print(f"원본 문자열: {text}")
    print(f"압축된 비트열: {encoded}")
    print(f"원본 비트 수: {original_bits}")
    print(f"압축 비트 수: {compressed_bits}")
    print(f"압축 비율: {compression_ratio * 100:.2f}%")
    print(f"감소율: {reduction_ratio * 100:.2f}%")

    print()

    print("[복원 결과]")
    print(f"복원 문자열: {decoded}")

    if decoded == text:
        print("복원 성공")
    else:
        print("복원 실패")


# [웹 환경 적응] input() 대신 예시 문자열 사용
text = "greedy algorithm huffman coding"
huffman_coding(text)`
      }
    ],
    pdf: "6주차 탐욕 알고리즘.pdf"
  },
  {
    id: 7,
    title: "7주차: 분할 정복 (Divide and Conquer)",
    role: "다수결 원소(Majority Element) 찾기",
    reflection: "큰 문제를 작은 부분 문제로 나누어 해결한 뒤 합치는 분할 정복 기법을 익혔습니다. 선거 투표에서 과반수 후보를 찾는 알고리즘을 O(N log N) 수준으로 개선해 볼 수 있었습니다.",
    codes: [
      {
        title: "회장 후보 찾기 - Brute Force",
        code: `# Brute Force 사용
def find_president_brute_force(votes):
    n = len(votes)

    if n == 0:
        return "재투표가 필요합니다."

    for candidate in votes:
        count = 0

        for vote in votes:
            if vote == candidate:
                count += 1

        if count > n // 2:
            return candidate

    return "재투표가 필요합니다."

# 테스트
test_cases = [
    ([2, 2, 1, 1, 2, 2, 3], "기본 테스트"),
    ([], "빈 리스트"),
    ([2, 2, 2, 2, 2], "만장일치"),
    ([1, 1, 2, 2], "완벽한 동률"),
    ([1, 2, 3, 4, 5], "완전한 분산"),
    ([3, 3, 3, 1, 2], "최소 과반수"),
    ([1, 1, 1, 2, 2, 3], "정확히 절반"),
]

for votes, desc in test_cases:
    result = find_president_brute_force(votes)
    print(f"{desc}: {votes} -> 결과: {result}")`
      },
      {
        title: "회장 후보 찾기 - 분할 정복 (Divide and Conquer)",
        code: `# Divide and Conquer 사용
def find_president_divide_conquer(votes):
    n = len(votes)

    if n == 0:
        return "재투표가 필요합니다."

    def divide_and_conquer(left, right):
        # 정복: 원소가 하나만 남으면 그 원소를 후보로 반환
        if left == right:
            return votes[left]

        # 분할: 투표 구간을 왼쪽과 오른쪽으로 나눔
        mid = (left + right) // 2
        left_candidate = divide_and_conquer(left, mid)
        right_candidate = divide_and_conquer(mid + 1, right)

        # 결합: 왼쪽 후보와 오른쪽 후보가 같으면 그대로 반환
        if left_candidate == right_candidate:
            return left_candidate

        left_count = 0
        right_count = 0

        for i in range(left, right + 1):
            if votes[i] == left_candidate:
                left_count += 1
            if votes[i] == right_candidate:
                right_count += 1

        if left_count > right_count:
            return left_candidate
        elif right_count > left_count:
            return right_candidate
        else:
            return None

    candidate = divide_and_conquer(0, n - 1)

    if candidate is not None and votes.count(candidate) > n // 2:
        return candidate
    else:
        return "재투표가 필요합니다."

# 테스트
test_cases = [
    ([2, 2, 1, 1, 2, 2, 3], "기본 테스트"),
    ([], "빈 리스트"),
    ([2, 2, 2, 2, 2], "만장일치"),
    ([1, 1, 2, 2], "완벽한 동률"),
    ([1, 2, 3, 4, 5], "완전한 분산"),
    ([3, 3, 3, 1, 2], "최소 과반수"),
    ([1, 1, 1, 2, 2, 3], "정확히 절반"),
]

for votes, desc in test_cases:
    result = find_president_divide_conquer(votes)
    print(f"{desc}: {votes} -> 결과: {result}")`
      }
    ],
    pdf: "7주차 분할 정복 알고리즘.pdf"
  },
  {
    id: 8,
    title: "8주차: 동적 계획법 (Dynamic Programming)",
    role: "사칙연산 수식의 최댓값/최솟값 구하기",
    reflection: "과거에 계산한 값을 테이블에 저장해두고 재사용하는 DP의 핵심 원리를 배웠습니다. 괄호를 치는 모든 경우의 수를 DP 테이블을 통해 빠르게 계산해내는 과정이 놀라웠습니다.",
    codes: [
      {
        title: "사칙연산 최댓값 구하기 (DP)",
        code: `def solution(arr):
    nums = list(map(int, arr[::2]))
    ops = arr[1::2]

    n = len(nums)

    # max_dp[i][j]: nums[i]부터 nums[j]까지 만들 수 있는 최댓값
    # min_dp[i][j]: nums[i]부터 nums[j]까지 만들 수 있는 최솟값
    max_dp = [[float("-inf")] * n for _ in range(n)]
    min_dp = [[float("inf")] * n for _ in range(n)]

    # 숫자 하나만 있는 구간
    for i in range(n):
        max_dp[i][i] = nums[i]
        min_dp[i][i] = nums[i]

    # 구간 길이: 2개 숫자부터 n개 숫자까지
    for length in range(2, n + 1):
        for start in range(n - length + 1):
            end = start + length - 1

            # start ~ end 구간을 k 기준으로 나눔
            for k in range(start, end):
                op = ops[k]

                left_max = max_dp[start][k]
                left_min = min_dp[start][k]
                right_max = max_dp[k + 1][end]
                right_min = min_dp[k + 1][end]

                if op == "+":
                    max_dp[start][end] = max(
                        max_dp[start][end],
                        left_max + right_max
                    )
                    min_dp[start][end] = min(
                        min_dp[start][end],
                        left_min + right_min
                    )

                else:  # op == "-"
                    max_dp[start][end] = max(
                        max_dp[start][end],
                        left_max - right_min
                    )
                    min_dp[start][end] = min(
                        min_dp[start][end],
                        left_min - right_max
                    )

    return max_dp[0][n - 1]

# 테스트
print("1-3+5-8 의 최댓값:", solution(["1", "-", "3", "+", "5", "-", "8"]))  # 1
print("5-3+1+2-4 의 최댓값:", solution(["5", "-", "3", "+", "1", "+", "2", "-", "4"]))  # 3`
      },
      {
        title: "피보나치 수열 (DP 메모이제이션)",
        code: `memo = {
    0: 1,
    1: 1,
    2: 2
}

def fibo(n):
  if n in memo:
    return memo[n]
  memo[n] = fibo(n-1) + fibo(n-2)
  return memo[n]

# 테스트
for i in range(1, 11):
  print(f"fibo({i}) = {fibo(i)}")`
      }
    ],
    pdf: "8주차 동적 계획법.pdf",
    visualizer: "knapsack_visualizer.html"
  },
  {
    id: 9,
    title: "9주차: 백트래킹 (Backtracking)",
    role: "상태 공간 트리 탐색 및 가지치기 (Pruning)",
    reflection: "가능한 모든 경우를 탐색하되, 유망하지 않은 경로는 즉시 차단(Pruning)하여 효율성을 높이는 백트래킹 기법을 학습했습니다. N-Queens 문제나 스도쿠 풀이에 아주 적합함을 알 수 있었습니다.",
    codes: [
      {
        title: "미로 탈출하기 (백트래킹)",
        code: `# 미로 탈출하기 - 백트래킹
# [웹 환경 적응] input() 대신 예시 미로 사용

def solve_maze(maze):
    n = len(maze)
    m = len(maze[0])

    start = (0, 0)
    goal = (n - 1, m - 1)

    # 북, 남, 동, 서
    directions = [
        (-1, 0),  # 북
        (1, 0),   # 남
        (0, 1),   # 동
        (0, -1)   # 서
    ]

    visited = [[False] * m for _ in range(n)]
    path = []

    def backtrack(x, y):
        # 범위를 벗어나면 이동 불가
        if x < 0 or x >= n or y < 0 or y >= m:
            return False

        # 벽이거나 이미 방문한 길이면 이동 불가
        if maze[x][y] == 1 or visited[x][y]:
            return False

        # 현재 위치 방문 처리
        visited[x][y] = True
        path.append((x, y))

        # 목표 지점 도착
        if (x, y) == goal:
            return True

        # 북, 남, 동, 서 순서로 이동 시도
        for dx, dy in directions:
            nx = x + dx
            ny = y + dy

            if backtrack(nx, ny):
                return True

        # 네 방향 모두 실패하면 이전 위치로 되돌아감
        path.pop()
        visited[x][y] = False
        return False

    if maze[0][0] == 1 or maze[n - 1][m - 1] == 1:
        return None

    if backtrack(0, 0):
        return path
    else:
        return None


def print_path_on_maze(maze, path):
    result = [row[:] for row in maze]

    for x, y in path:
        result[x][y] = "*"

    result[0][0] = "S"
    result[len(maze) - 1][len(maze[0]) - 1] = "E"

    for row in result:
        print(" ".join(map(str, row)))


# 예시 미로 (0: 길, 1: 벽)
maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
]

path = solve_maze(maze)

if path is None:
    print("탈출 불가능")
else:
    print("탈출 경로:")
    for row, col in path:
        print(f"  ({col}, {row})")

    print("\\n미로 위 경로:")
    print_path_on_maze(maze, path)`
      },
      {
        title: "서울시 지도 색칠하기 (백트래킹)",
        code: `# 서울시 지도 색칠하기 - 백트래킹
# [웹 환경 적응] input() 대신 예시 데이터 사용

seoul_map = {
    "강남구": ["광진구","서초구", "송파구", "성동구", "용산구"],
    "강동구": ["송파구", "광진구"],
    "강북구": ["도봉구", "노원구", "성북구"],
    "강서구": ["양천구", "영등포구", "마포구"],
    "관악구": ["동작구", "서초구", "금천구", "구로구"],
    "광진구": ['강남구', '강동구', '동대문구', '성동구', '송파구', '중랑구'],
    "구로구": ["양천구", "영등포구", "동작구", "관악구", "금천구"],
    "금천구": ["구로구", "관악구"],
    "노원구": ['강북구', '도봉구', '성북구', '중랑구'],
    "도봉구": ["강북구", "노원구"],
    "동대문구": ["성북구", "종로구", "성동구", "광진구", "중랑구"],
    "동작구": ["영등포구", "구로구", "관악구", "서초구", "용산구"],
    "마포구": ["강서구", "영등포구", "용산구", "서대문구", "은평구"],
    "서대문구": ["은평구", "마포구", "종로구", "중구"],
    "서초구": ["동작구", "관악구", "강남구", '용산구'],
    "성동구": ["중구", "동대문구", "광진구", "강남구", "용산구", "종로구"],
    "성북구": ["강북구", "노원구", "중랑구", "동대문구", "종로구"],
    "송파구": ["강남구", "강동구", "광진구"],
    "양천구": ["강서구", "영등포구", "구로구"],
    "영등포구": ["강서구", "양천구", "마포구", "용산구", "동작구", "구로구"],
    "용산구": ["마포구", "영등포구", "동작구", "서초구", "강남구", "성동구", "중구"],
    "은평구": ["서대문구", "마포구", "종로구"],
    "종로구": ["은평구", "서대문구", "중구", "성북구", "동대문구", "성동구"],
    "중구": ["종로구", "서대문구", "용산구", "성동구"],
    "중랑구": ["노원구", "성북구", "동대문구", "광진구"],
}
districts = list(seoul_map.keys())


def is_possible(district, color, coloring):
    """현재 district에 color를 칠할 수 있는지 확인"""
    for neighbor in seoul_map[district]:
        if neighbor in coloring and coloring[neighbor] == color:
            return False
    return True


def backtracking(index, color_count, coloring):
    """백트래킹으로 각 구에 색상 배정"""
    if index == len(districts):
        return True

    district = districts[index]

    for color in range(1, color_count + 1):
        if is_possible(district, color, coloring):
            coloring[district] = color

            if backtracking(index + 1, color_count, coloring):
                return True

            del coloring[district]

    return False


# 4색으로 색칠 시도
color_count = 4
coloring = {}

if backtracking(0, color_count, coloring):
    print(f"\\n{color_count}색으로 지도 색칠 결과:")
    for district in districts:
        print(f"  {district}: {coloring[district]}번 색상")
else:
    print(f"\\n{color_count}색으로는 서울시 지도를 색칠할 수 없습니다.")`
      },
      {
        title: "서울시 지도 색칠 - 상태 공간 트리 시각화 (코드 참조용)",
        runnable: false,
        code: `# 서울시 지도 색칠하기 - 백트래킹 상태 공간 트리 시각화
# ※ 이 코드는 graphviz 라이브러리를 사용하여 Colab에서 실행됩니다.
# ※ 웹 환경에서는 실행할 수 없으므로 코드 참조용입니다.

# !apt-get -qq install graphviz fonts-nanum
# !pip -q install graphviz
# !fc-cache -fv > /dev/null

from graphviz import Digraph
from IPython.display import Image, display

# 10개의 구를 선택하여 백트래킹 트리를 시각화
districts = ["강남구", "노원구", "강동구", "강북구", "강서구",
             "관악구", "광진구", "구로구", "금천구", "도봉구"]

MAX_DEPTH = 10
COLOR_COUNT = 4
TARGET_SOLUTIONS = 2

node_count = 0
step_count = 0
solutions = []

def make_node_id():
    global node_count
    node_count += 1
    return f"node_{node_count}"

def next_step():
    global step_count
    step_count += 1
    return step_count

def is_possible(district, color, coloring):
    for neighbor in seoul_map[district]:
        if neighbor in coloring and coloring[neighbor] == color:
            return False
    return True

def get_conflict_reason(district, color, coloring):
    for neighbor in seoul_map[district]:
        if neighbor in coloring and coloring[neighbor] == color:
            return neighbor
    return None

def draw_real_backtracking_tree(graph, parent_id, index, coloring, path):
    """
    실제 백트래킹 실행 순서를 트리로 시각화합니다.
    - 가능한 색을 고르고, 다음 구로 내려감
    - 깊이 10에 도달하면 해답 기록
    - 해답 2개를 찾으면 종료
    """
    if len(solutions) >= TARGET_SOLUTIONS:
        return True

    if index == MAX_DEPTH:
        solution_number = len(solutions) + 1
        solution_colors = [color for _, color in path]
        solutions.append(solution_colors)

        step = next_step()
        end_id = make_node_id()
        graph.node(end_id, f"{step}. 해답 {solution_number} 발견\\n깊이 10 도달",
                   shape="box", style="filled", fillcolor="lightblue")
        graph.edge(parent_id, end_id, label="해답")

        if len(solutions) >= TARGET_SOLUTIONS:
            return True
        return False

    district = districts[index]

    for color in range(1, COLOR_COUNT + 1):
        if len(solutions) >= TARGET_SOLUTIONS:
            return True

        step = next_step()
        current_id = make_node_id()
        possible = is_possible(district, color, coloring)

        if not possible:
            conflict = get_conflict_reason(district, color, coloring)
            graph.node(current_id, f"{step}. {district}\\n{color}번 색 검사\\n불가능\\n{conflict}와 충돌",
                       shape="circle", style="filled", fillcolor="mistyrose", color="red")
            graph.edge(parent_id, current_id, label="충돌")
            continue

        graph.node(current_id, f"{step}. {district}\\n{color}번 색 검사\\n가능\\n선택",
                   shape="circle", style="filled", fillcolor="palegreen")
        graph.edge(parent_id, current_id, label="선택")

        coloring[district] = color
        path.append((district, color))

        finished = draw_real_backtracking_tree(graph, current_id, index + 1, coloring, path)

        if finished:
            return True

        # 백트래킹: 현재 색을 취소하고 부모 노드로 되돌아감
        back_step = next_step()
        back_id = make_node_id()
        graph.node(back_id, f"{back_step}. 백트래킹\\n{district}의 {color}번 색 취소\\n직전 구로 돌아감",
                   shape="box", style="filled", fillcolor="lemonchiffon")
        graph.edge(current_id, back_id, label="되돌아감", style="dashed")

        path.pop()
        del coloring[district]

    return False

# Digraph 생성 및 실행
graph = Digraph("Real Backtracking Tree", format="png")
graph.attr(rankdir="TB", size="18,24", ratio="compress", ordering="out")
graph.attr("node", fontname="NanumGothic", fontsize="10")
graph.attr("edge", fontname="NanumGothic", fontsize="9")

root_id = "root"
graph.node(root_id, "ROOT", shape="circle", style="filled", fillcolor="white")
draw_real_backtracking_tree(graph, root_id, 0, {}, [])

# 결과 출력
for i, solution in enumerate(solutions, start=1):
    print(f"경로 {i}")
    for district, color in zip(districts, solution):
        print(f"  {district}: {color}번 색")`
      }
    ],
    pdf: "9주차 백트래킹.pdf"
  }
];
