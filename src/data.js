export const weeksData = [
  {
    id: 1,
    title: "1주차: 큐 (Queue) 복습",
    role: "개념 복습 및 기본 자료구조 구현",
    reflection: "가장 기본적인 자료구조인 큐를 배열과 연결 리스트 두 가지 방식으로 구현해 보았습니다. 데이터가 들어온 순서대로 처리되는 FIFO(First In First Out)의 특징을 다시 한 번 상기할 수 있었습니다.",
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
        if self.tail is None:
            self.front = self.tail = new
        else:
            self.tail.next = new
            self.tail = new

    def deQueue(self):
        if self.front is None:
            return "Queue is empty"
        data = self.front.data
        if self.front == self.tail:
            self.front = self.tail = None
        else:
            self.front = self.front.next
        return data

    def printQueue(self):
        cur = self.front
        res = []
        while cur:
            res.append(str(cur.data))
            cur = cur.next
        print("Queue: [" + ", ".join(res) + "]")

q = Queue()
q.enQueue(1)
q.enQueue(2)
q.enQueue(3)
q.printQueue()
print("Dequeued:", q.deQueue())
q.printQueue()`,
  },
  {
    id: 2,
    title: "2주차: 우선순위 큐 (Priority Queue)와 힙 (Heap)",
    role: "최소 힙 / 최대 힙 구현 및 활용",
    reflection: "일반 큐와 달리 데이터의 '우선순위'에 따라 추출되는 우선순위 큐를 힙(Heap) 구조를 통해 O(log N)의 시간복잡도로 구현했습니다. 파이썬의 heapq 모듈의 편리함도 함께 느꼈습니다.",
    code: `import heapq

class MinHeap:
    def __init__(self):
        self.heap = []
        
    def push(self, val):
        heapq.heappush(self.heap, val)
        
    def pop(self):
        if len(self.heap) == 0:
            return None
        return heapq.heappop(self.heap)
        
    def display(self):
        print("Current Heap:", self.heap)

h = MinHeap()
h.push(5)
h.push(1)
h.push(10)
h.push(3)
h.display()

print("Popped:", h.pop())
h.display()`,
  },
  {
    id: 3,
    title: "3주차: 해시 테이블 (Hash Table)",
    role: "해시 함수 구현 및 충돌 해결",
    reflection: "Division, Folding 방식의 해시 함수를 직접 작성해보며 해시 테이블의 원리를 이해했습니다. 충돌(Collision) 해결을 위한 Chaining 기법의 중요성도 깨달았습니다.",
    code: `class HashTable:
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
        return self.table[idx][1]

    def display(self):
        for i, slot in enumerate(self.table):
            print(f"[{i}] {slot}")

ht = HashTable()
ht.insert(16, "Apple")
ht.insert(23, "Banana")
ht.insert(9, "Cherry")

ht.display()
print("Search 23:", ht.search(23))`,
  },
  {
    id: 4,
    title: "4주차: 시간복잡도 분석 (Time Complexity)",
    role: "다양한 알고리즘의 수행 시간 비교",
    reflection: "피보나치 수열을 단순 재귀 O(2^n), 메모이제이션 O(n), 행렬 거듭제곱 O(log n)으로 구현하고 실제 수행 시간을 비교해보았습니다. 알고리즘 최적화의 위력을 실감했습니다.",
    code: `import time

# O(N) 피보나치 (메모이제이션)
memo = {}
def fibo_n(n):
    if n in memo: return memo[n]
    if n <= 2: return 1
    memo[n] = fibo_n(n-1) + fibo_n(n-2)
    return memo[n]

# O(2^N) 피보나치 (단순 재귀)
def fibo_2n(n):
    if n <= 2: return 1
    return fibo_2n(n-1) + fibo_2n(n-2)

n = 30
t1 = time.time()
ans1 = fibo_n(n)
t2 = time.time()
print(f"O(N) Result: {ans1}, Time: {t2-t1:.6f}s")

t1 = time.time()
ans2 = fibo_2n(n)
t2 = time.time()
print(f"O(2^N) Result: {ans2}, Time: {t2-t1:.6f}s")`,
  },
  {
    id: 5,
    title: "5주차: 문자열 탐색 알고리즘",
    role: "Brute Force, KMP, Boyer-Moore 탐색 구현",
    reflection: "단순 탐색을 넘어 KMP와 보이어-무어(Boyer-Moore)와 같은 최적화된 문자열 탐색 기법을 배웠습니다. 전처리 배열(Skip Table 등)을 활용해 불필요한 비교를 건너뛰는 아이디어가 훌륭했습니다.",
    code: `def brute_force_search(text, pattern):
    n, m = len(text), len(pattern)
    result = []
    
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match:
            result.append(i)
            
    return result

text_data = "ABABDABACDABABCABAB"
pattern_data = "ABABCABAB"
matches = brute_force_search(text_data, pattern_data)

print(f"텍스트: {text_data}")
print(f"패턴: {pattern_data}")
print(f"발견된 인덱스: {matches}")`,
  },
  {
    id: 6,
    title: "6주차: 그리디 알고리즘 (Greedy Algorithm)",
    role: "허프만 코딩(Huffman Coding)을 이용한 데이터 압축",
    reflection: "매 순간 최적이라고 생각되는 것을 선택해 나가는 그리디 기법을 허프만 트리에 적용해보았습니다. 빈도가 높은 문자에 짧은 코드를 부여해 전체 데이터를 압축하는 과정이 인상깊었습니다.",
    code: `import heapq
from collections import Counter

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
        
    def __lt__(self, other):
        return self.freq < other.freq

text = "greedy algorithm huffman coding"
freq = Counter(text)
heap = [Node(char, count) for char, count in freq.items()]
heapq.heapify(heap)

while len(heap) > 1:
    node1 = heapq.heappop(heap)
    node2 = heapq.heappop(heap)
    merged = Node(None, node1.freq + node2.freq)
    merged.left = node1
    merged.right = node2
    heapq.heappush(heap, merged)

print("허프만 트리 구성 완료! (루트 노드 빈도:", heap[0].freq, ")")
print(f"원본 텍스트 길이: {len(text)}")`,
  },
  {
    id: 7,
    title: "7주차: 분할 정복 (Divide and Conquer)",
    role: "다수결 원소(Majority Element) 찾기",
    reflection: "큰 문제를 작은 부분 문제로 나누어 해결한 뒤 합치는 분할 정복 기법을 익혔습니다. 선거 투표에서 과반수 후보를 찾는 알고리즘을 O(N log N) 수준으로 개선해 볼 수 있었습니다.",
    code: `def find_president(votes):
    def divide_and_conquer(left, right):
        if left == right:
            return votes[left]
            
        mid = (left + right) // 2
        left_cand = divide_and_conquer(left, mid)
        right_cand = divide_and_conquer(mid + 1, right)
        
        if left_cand == right_cand:
            return left_cand
            
        left_count = sum(1 for i in range(left, right+1) if votes[i] == left_cand)
        right_count = sum(1 for i in range(left, right+1) if votes[i] == right_cand)
        
        return left_cand if left_count > right_count else right_cand

    n = len(votes)
    candidate = divide_and_conquer(0, n - 1)
    
    if votes.count(candidate) > n // 2:
        return candidate
    return "재투표 필요"

votes = [2, 2, 1, 1, 2, 2, 3]
print("투표 결과:", votes)
print("당선자:", find_president(votes))`,
  },
  {
    id: 8,
    title: "8주차: 동적 계획법 (Dynamic Programming)",
    role: "사칙연산 수식의 최댓값/최솟값 구하기",
    reflection: "과거에 계산한 값을 테이블에 저장해두고 재사용하는 DP의 핵심 원리를 배웠습니다. 괄호를 치는 모든 경우의 수를 DP 테이블을 통해 빠르게 계산해내는 과정이 놀라웠습니다.",
    code: `def solution(arr):
    nums = [int(x) for x in arr[::2]]
    ops = arr[1::2]
    n = len(nums)
    
    max_dp = [[-float('inf')] * n for _ in range(n)]
    min_dp = [[float('inf')] * n for _ in range(n)]
    
    for i in range(n):
        max_dp[i][i] = min_dp[i][i] = nums[i]
        
    for length in range(2, n + 1):
        for start in range(n - length + 1):
            end = start + length - 1
            for k in range(start, end):
                if ops[k] == '+':
                    max_dp[start][end] = max(max_dp[start][end], max_dp[start][k] + max_dp[k+1][end])
                    min_dp[start][end] = min(min_dp[start][end], min_dp[start][k] + min_dp[k+1][end])
                else:
                    max_dp[start][end] = max(max_dp[start][end], max_dp[start][k] - min_dp[k+1][end])
                    min_dp[start][end] = min(min_dp[start][end], min_dp[start][k] - max_dp[k+1][end])
                    
    return max_dp[0][n-1]

expression = ["1", "-", "3", "+", "5", "-", "8"]
print("수식:", "".join(expression))
print("최댓값:", solution(expression))`,
    pdf: "8주차 동적 계획법.pdf",
    visualizer: "knapsack_visualizer.html"
  },
  {
    id: 9,
    title: "9주차: 백트래킹 (Backtracking)",
    role: "상태 공간 트리 탐색 및 가지치기 (Pruning)",
    reflection: "가능한 모든 경우를 탐색하되, 유망하지 않은 경로는 즉시 차단(Pruning)하여 효율성을 높이는 백트래킹 기법을 학습했습니다. N-Queens 문제나 스도쿠 풀이에 아주 적합함을 알 수 있었습니다.",
    code: `def solve_n_queens(n):
    def is_safe(board, row, col):
        for i in range(row):
            if board[i] == col or abs(board[i] - col) == abs(i - row):
                return False
        return True

    def backtrack(row, board, result):
        if row == n:
            result.append(board[:])
            return
            
        for col in range(n):
            if is_safe(board, row, col):
                board[row] = col
                backtrack(row + 1, board, result)
                # 상태 복구는 덮어쓰기로 자연스럽게 처리됨

    result = []
    backtrack(0, [-1]*n, result)
    return result

n = 4
solutions = solve_n_queens(n)
print(f"{n}-Queens 문제 해답 개수: {len(solutions)}")
print("첫 번째 해답:")
for row_val in solutions[0]:
    print(". " * row_val + "Q " + ". " * (n - 1 - row_val))`
  }
];
