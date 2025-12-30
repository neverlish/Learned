# 3 설치가 필요할 땐 이렇게
## 9 로컬 설치 방법 (NPM, Docker)
- docker volume create n8n_data
- docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n

## 10 Docker 보안 강화 방법
- cd traefik-n8n-ssl
  - brew install mkcert
  - mkcert -install
  - mkcert -cert-file certs/server.crt -key-file certs/server.key "*.localhost" "localhost" "n8n.localhost"
  - docker-compose up -d
  - openssl s_client -showcerts -connect localhost:8443 -servername n8n.localhost
- visit https://n8n.localhost:8443/