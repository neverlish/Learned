## 6 - 3 도커를 사용한 배포 - 2 도커파일 정의

- `docker pull node:alpine`
- `docker build -t imagini:0.0.1 .`
- `docker run -i -t imagini:0.0.1 sh`
- `docker run -v $(pwd)/settings.json:/opt/app/settings.json imagini:0.0.1`