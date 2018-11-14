## 05 - 1 리액트 시작하기 - 장바구니 만들기
- `$ aws s3 sync ./build s3://jinhohyeon.com --acl public-read`
- `$ aws s3 cp ./build/index.html s3://jinhohyeon.com --cache-control no-cache --acl public-read`

## 09 - 2 - 비공개 알림
- IoT 정책 만들기
  - IoT -> 보안 -> 정책 생성
    - Name: iot-policy
    - Action: iot:Connect, iot:Subscribe, iot:Publish, iot:Receive
    - Resource ARN: *
    - Effect: Allow
