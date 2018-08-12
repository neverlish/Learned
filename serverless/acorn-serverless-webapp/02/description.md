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
