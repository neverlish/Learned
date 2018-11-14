## 1 AWS

### 사용자 계정과 보안 처리

#### AWS IAM
- AWS IAM에서 사용자 생성
  1. Programmic access + S3FullAccess group 생성
    - 생성 시 Access key, Secret Access key 확인
  2. AWS Management Console Access 생성
    - Auto-generated password 옵션 체크
    - 생성 후 접속 링크, 비밀번호 확인

### 프론트엔드 서비스 

#### 아마존 S3
- CLI에서 S3 사용
  - 버킷 생성: `aws s3 mb s3://my-bucket-name`
  - 파일 업로드: `aws s3 cp test.txt s3://my-bucket-name --acl public-read
  - 목록 나열: `aws s3 ls s3://my-bucket-name`
  - 다운로드: `aws s3 cp s3://my-bucket-name file_path`

### 메시징과 통지

#### 아마존 SNS

- SNS 주제 생성: `aws sns create-topic --name email-alerts`
  - 리턴 : `"TopicArn": "TOPIC_ARN"`
- 이메일 수신 설정: `aws sns subscribe --topic-arn TOPIC_ARN --protocol email --notification-endpoint EMAIL`
  - 리턴: `"SubscriptionArn": "pending confirmation"`
- 테스트: `aws sns publich --topic-arn TOPIC_ARN --message "MESSAGE"`


### 백엔드 서비스

#### 람다 함수 만들기

- https://console.aws.amazon.com/lambda/home -> 함수 만들기
  - 런타임 : node.js
  - 역할 : 사용자 지정 역할 생성
    - IAM 역할: lamdba-access-s3-and-sns
    - 정책 문서:
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": "arn:aws:s3:::MY-BUCKET/*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "sns:publish"
                ],
                "Resource": "arn:aws:sns:ap-northeast-2:367416660003:email-alerts"
            }
        ]
    }
    ```
- 트리거 추가
  - S3 선택
    - 버킷 선택
    - 이벤트 유형: 객체 생성됨(모두)
    - 접두사: logs/
    - 접미사: txt
- 코드 편집
  ```
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const sns = new AWS.SNS();

  exports.handler = (event, context, callback) => {
      const bucketName = event.Records[0].s3.bucket.name;
      const objectKey = event.Records[0].s3.object.key;
      const s3Params = {
          Bucket: bucketName,
          Key: objectKey
      };
      
      s3.getObject(s3Params, (err, data) => {
          if (err) throw err;
          
          const fileContent = data.Body.toString();
          if (fileContent.indexOf('error') !== -1) {
              const msg = `file ${objectKey} has errors`;
              const snsParams = {
                  Message: msg,
                  TopicArn: 'SNS-ARN'
              };
              sns.publish(snsParams, callback);
          }
      });
  }
  ```
  
### 아마존 API 게이트웨이
- API Gateway -> 새 API 생성
- 메서드 생성 - POST -> Lambda 함수에 람수함수명 입력
- 메서드 배포 -> 스테이지 설정
- 리소스 -> 테스트
  ```
  {
      "Records": [
          {
              "s3": {
                  "bucket": {
                      "name": "BUCKET_NAME"
                  },
                  "object": {
                      "key": "FILE_PATH"
                  }
              }
          }
      ]
  }
  ```
