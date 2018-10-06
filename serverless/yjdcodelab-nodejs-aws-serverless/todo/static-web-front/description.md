## 09-3 - 서버없이 Web Application 배포하기 3
- 버킷 설정 -> 정적 웹사이트 호스팅 -> 이 버킷을 사용하여 웹 사이트를 호스팅합니다. -> index.html
- `$ aws s3 cp ./dist s3://neverlish-serverless-static-web/ --recursive --acl public-read`
