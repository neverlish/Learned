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
