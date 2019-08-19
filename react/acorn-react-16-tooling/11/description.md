## 11 - 2 Node 컨테이너로 시작하기

- `docker build -t barely-sms-ui .`
- `docker run -p 3000:3000 barely-sms-ui`

## 11 - 3 React 앱을 서비스로 구성하기
- `docker build -f Dockerfile.ui -t barely-sms-ui .`
- `docker build -f Dockerfile.api -t barely-sms-api .`
- `docker-compose up`