## Lamba와 S3 매핑하기

- `apex --env dev deploy myS3ToLambdaFunc -r ap-northeast-2 -p default`
- 버킷 생성
  - neverlish-lambda-image-processing-01
  - neverlish-lambda-image-processing-01-output
- 생성된 함수에 neverlish-lambda-image-processing-01 S3 트리거 이벤트 설정

## Lambda와 DynamoDB 매핑하기
- `apex --env dev deploy myDynamoToLambdaFunc -r ap-northeast-2 -p default`
- DynamoDB 테이블 생성
  - 테이블명: LambdaTriggerDB
  - 기본키: IP_ADDRESS(문자열)
- myDynamoToLambdaFunc 함수에 트리거 설정
  - DynamoDB : LambdaTriggerDB

## Lambda와 SNS 매핑하기
- DynamoDB 테이블 생성
  - 테이블명: LambdaTriggerSNS
  - 기본키: userName(문자열)
- `apex --env dev deploy mySnsToLambdaFunc -r ap-northeast-2 -p default`
- SNS 주제 생성
  - 주제의 구독 생성
    - 프로토콜: AWS Lambda
    - 엔드포인트: mySnsToLambdaFunc 람다 함수
- 구독 생성 후 람다 페이지에서 트리거 확인
- 주제 에서 '메세지 게시'에 userName 입력