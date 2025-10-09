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
