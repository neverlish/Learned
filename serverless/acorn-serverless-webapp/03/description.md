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

### 로그 검색
- 일반 로그 검색: `serverless invoke --function FUNCTION --log`
- 운영 환경 실행 중인 람다의 로그 검색: `serverless logs --function FUNCTION`
- 로그 필터링: `serverless logs --function FUNCTION --filter error --startTime 30m`
- 리스너 추가: `serverless logs --function FUNCTION --tail`

### 서비스 삭제
- 일반 삭제: `serverless remove`
- 명시적 삭제: `serverless remove --stage STAGE --region REGION`
