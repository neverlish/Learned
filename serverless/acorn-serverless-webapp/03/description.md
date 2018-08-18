## 1 서버리스 프레임워크

### 프레임워크 설치
- `npm i -g serverless@1.x`

### 프레임워크 구성
- 최소 접근 요구 사항: 람다, 클라우드포메이션, IAM, 클라우드워치

### 새 프로젝트 생성
- `serverless create --template aws-nodejs --name hello-serverless -p hello-serverless`

### 서비스 배포
- 일반 배포: `serverless deploy`
- stage, region 설정 배포: `serverless deploy --stage STAGE --region REGION`
- 함수만 배포: `serverless deploy function --function FUNCTION_NAME`

### 함수 호출
- 일반 호출: `serverless invoke --function FUNCTION --path event.json`
- 명시적 호출: `serverless invoke --function FUNCTION --stage STAGE --region REGION`
- local 호출: `serverless invoke local --function hello --path event.json`
