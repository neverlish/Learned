## Lamba와 S3 매핑하기

- `apex --env dev deploy myS3ToLambdaFunc -r ap-northeast-2 -p default`
- 버킷 생성
  - neverlish-lambda-image-processing-01
  - neverlish-lambda-image-processing-01-output
- 생성된 함수에 neverlish-lambda-image-processing-01 S3 트리거 이벤트 설정