## 2 애플리케이션 배포

### 배포 롤백하기
- 롤백: `$ serverless rollback --timestamp <timestamp>`
- 배포 목록: `$ serverless deploy list`

## 3 작업 모니터링

### 비용 모니터링
- Cloudwatch -> Billing -> Billing Metrics -> Create Alarm

### 오류 모니터링
- `$ serverless metrics --startTime 30m`
- `$ serverless logs -f myFunction --tail`
