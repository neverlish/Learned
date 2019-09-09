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

## Lambda와 CloudWatch 이벤트 매핑하기
- DynamoDB 테이블 생성
  - 테이블명: LambdaExportToS3
  - 기본키: userName(문자열)
- S3 버킷 생성: neverlish-dynamodb-backup-s3
- `apex --env dev deploy myCWScheduleToLambdaFunc -r ap-northeast-2 -p default`
- Cloudwatch - 규칙 - 이벤트 -> 규칙 생성
  - 일정: 고정 비율 / 1일
  - 대상: Lambda 함수 / eventDriven_myCWScheduleToLambdaFunc

## Lambda와 Kinesis 매핑하기
- Kinesis 스트림 생성 : myKinesisStream
  - 샤드: 1
- SNS 주제 생성: myHTTPSns
  - 구독 생성
    - 프로토콜: Email
- `apex --env dev deploy myKinesisToLambdaFunc -r ap-northeast-2 -p default`
  - 람다 트리거에 Kinesis 스트림 설정
- `aws kinesis put-record --stream-name myKinesisStream --partition-key KEY --data DATA`