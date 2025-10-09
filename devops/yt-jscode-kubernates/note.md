# 2.2 [예제] 웹 서버(Nginx)를 파드(Pod)로 띄워보기

- kubectl apply -f nginx-pod.yaml
- kubectl get pods

# 2.3 파드(Pod)로 띄운 프로그램에 접속이 안 되는 이유

- kubectl exec -it nginx-pod -- bash
  - root@nginx-pod:/# curl localhost:80
- sudo kubectl port-forward pod/nginx-pod 80:80
- kubectl delete pod nginx-pod

# 2.4 [예제] 백엔드(Spring Boot) 서버를 파드(Pod)로 띄워보기

- ./gradlew clean build
- docker build -t spring-server .
- kubectl apply -f spring-pod.yaml

# 2.5 이미지가 없다고 에러가 뜨는 이유 (이미지 풀 정책)

- kubectl delete pod spring-pod
- kubectl apply -f spring-pod.yaml
- kubectl exec -it spring-pod -- bash
  - bash-4.4# curl localhost:8080
- kubectl port-forward pod/spring-pod 12345:8080
- kubectl delete pod spring-pod

# 2.6 [예제] 백엔드(Nest.js) 서버를 파드(Pod)로 띄워보기

- docker build -t nest-server .
- kubectl apply -f nest-pod.yaml
- kubectl port-forward nest-pod 3000:3000

# 2.7 [예제] 프론트엔드(HTML, CSS, Nginx) 서버를 파드(Pod)로 띄워보기

- docker build -t my-web-server .
- kubectl apply -f web-server-pod.yaml
- kubectl port-forward web-server-pod 5000:80

# 2.8 [예제] 프론트엔드(Next.js) 서버를 파드(Pod)로 띄워보기

- docker build -t next-server .
- kubectl apply -f next-pod.yaml
- kubectl port-forward next-pod 3000:3000

# 2.10 [보충 강의] 파드(Pod) 디버깅 하는 방법

- kubectl describe pods {POD}
- kubectl logs {POD}
- kubectl exec -it {POD} -- bash

# 3.2 [예제] 디플로이먼트를 활용해 백엔드(Spring Boot) 서버 3개 띄워보기

- kubectl apply -f spring-deployment.yaml
- kubectl get deployment
- kubectl get replicaset

# 3.4 [예제] 서비스(Service)를 활용해 백엔드(Spring Boot) 서버와 통신해보기

- kubectl apply -f spring-service.yaml
- kubectl get service

# 3.5 디플로이먼트를 활용한 서버 개수 조절 방법

- kubectl apply -f spring-deployment.yaml

# 3.6 서버가 죽었을 때 자동으로 복구하는 기능 (Self-Healing)

- docker ps
- docker kill {CONTAINER_ID}
- kubectl get pods
  NAME READY STATUS RESTARTS AGE
  spring-deployment-77fb8d465f-9k8nf 1/1 Running 0 14m
  spring-deployment-77fb8d465f-bxh9z 1/1 Running 0 14m
  spring-deployment-77fb8d465f-hwrcc 1/1 Running 0 98s
  spring-deployment-77fb8d465f-j9mnl 1/1 Running 1 (23s ago) 98s
  spring-deployment-77fb8d465f-lxc6f 1/1 Running 0 14m

# 3.7 새로운 버전의 서버로 업데이트 시키기

- kubectl apply -f spring-deployment.yaml

# 3.8 [예제] 디플로이먼트, 서비스를 활용해 백엔드(Nest.js) 서버 띄워보기

- kubectl delete all --all
- docker build -t nest-server:1.0 .
- kubectl apply -f nest-deployment.yaml
- kubectl apply -f nest-service.yaml

# 4.2 EC2에서 도커 쿠버네티스 설치하기(k3s)

```
$
sudo apt-get update && \
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo apt-key fingerprint 0EBFCD88 && \
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
sudo apt-get update && \
sudo apt-get install -y docker-ce && \
sudo usermod -aG docker ubuntu && \
newgrp docker && \
sudo curl -L "https://github.com/docker/compose/releases/download/2.27.1/docker-compose-$(uname- s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

- docker -v
- docker compose version
- curl -sfL https://get.k3s.io | sh -
- sudo chmod 644 /etc/rancher/k3s/k3s.yaml
- sudo kubectl version
