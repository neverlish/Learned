# 10 - 2 - 2 멀티스레딩 구현

import threading
# 스레드에서 실행할 함수
def thread_main(li, i):
  # range() 안의 값이 스레드가 담당할 리스트의 인덱스 범위를 결정
  for i in range(offset * i, offset * (i + 1)):
    # 요소에 2를 곱한다
    li[i] *= 2

num_elem = 1000 # 리스트 요소 개수
num_thread = 4 # 스레드 개수

# 오프셋 = 리스트 요소 개수 // 스레드 개수
# 스레드 함수에서 연산을 담당한 인덱스 범위를 구하는 데 쓰인다
offset = num_elem // num_thread

li = [i + 1 for i in range(num_elem)]
print(li)

# 스레드를 담을 리스트
threads = []
for i in range(num_thread):
  # 스레드 객체를 생성
  # target은 실행할 스레드 함수
  # args는 전달할 인자 목록
  th = threading.Thread(target = thread_main, args = (li, i))
  threads.append(th)

for th in threads:
  # 스레드 실행 시작
  th.start()

for th in threads:
  # 스레드 실행 완료 대기
  th.join()

print(li)
# [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, ...., 1998, 2000]
