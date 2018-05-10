# 15 - 1 - 3 이진 탐색 알고리즘

def binary_search(data, target):
  # 리스트를 정렬 상태로 만든다
  data.sort()
  # start는 시작 인덱스, end는 마지막 인덱스
  start = 0
  end = len(data) - 1

  # start와 end는 교차하기 전까지 반복
  while start <= end:
    # mid는 start와 end의 가운데 인댁스
    mid = (start + end) // 2

    # target 데이터가 mid의 데이터와 같다면 mid를 반환
    if data[mid] == target:
      return mid

    # target 데이터가 작다면 end를 mid-1로 지정
    elif data[mid] > target:
      end = mid - 1
    
    # target 데이터가 크다면 start를 mid+1로 지정
    else:
      start = mid + 1
  # start와 end가 교차했을 때까지 target을 찾지 못했다면 target이 리스트에 존재하지 않는다
  return None

if __name__ == '__main__':
  data = [i ** 2 for i in range(1, 11)]
  target = 9
  
  idx = binary_search(data, target)

  if idx == None:
    print('{}이 존재하지 않습니다'.format(target))
  else:
    print('찾는 데이터의 인덱스는 {}이고 데이터는 {}입니다'.format(idx, data[idx])) # 찾는 데이터의 인덱스는 2이고 데이터는 9입니다
