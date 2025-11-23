# 5 Kubernetes Basics
## 17 Deploying Your Pod
- cd deployments
  - kubectl create -f pod.yaml
  - kubectl get pods
  - kubectl apply -f pod.yaml
  - kubectl delete pod nginx

## 18 ReplicaSets
- cd deployments
  - kubectl create -f replicaset.yaml
  - kubectl get pods
  - kubectl get replicasets
  - kubectl delete pod myreplicaset-xp4d5
  - kubectl delete replicaset myreplicaset

## 19 Deployments
- cd deployments
  - kubectl create -f deployments.yaml
  - kubectl get pods
  - kubectl get replicasets
  - kubectl get deployments
  - kubectl delete deployment mydeployment

# 6 Beyond Basics
## 22 Multi-Container Setup
- cd multi
  - watch kubectl get pods
  - kubectl create -f deployment.yaml
  - kubectl describe pod mydeployment-bd5b4878f-8gwvw
  - kubectl exec -it mydeployment-bd5b4878f-8gwvw -c server -- /bin/bash
    - apt-get update
    - apt-get install curl
    - curl localhost

## 23 Init Containers
- cd multi
  - kubectl create -f initdeployment.yaml
  - kubectl get pods
  - kubectl logs mydeployment-6bcc5866f9-29fwv -c myinit

# 7 Networking
## 26 Ingress
- minikube addons enable ingress
- kubectl get pods -n kube-system
- cd service/ingress
  - kubectl create -f service.yaml
  - kubectl get service
  - kubectl create -f deployment.yaml
  - kubectl get deployments
  - kubectl create -f ingress.yaml
  - kubectl get ingress
- kubectl get ingress
- sudo vi /private/etc/hosts
  - 192.168.49.2 mysite.local
- http://mysite.local/

## 28 LoadBalancer
- cd deployments
  - kubectl create -f pod.yaml
- cd service
  - kubectl create -f loadbalancer.yaml
  - kubectl get service
  - kubectl delete service awslb
- kubectl delete pod nginx 

## 29 Pod to Pod Communication
- kubectl describe service websrvc
Name:                     websrvc
Namespace:                default
Labels:                   <none>
Annotations:              <none>
Selector:                 server=web
Type:                     ClusterIP
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.104.106.120
IPs:                      10.104.106.120
Port:                     <unset>  8080/TCP
TargetPort:               80/TCP
Endpoints:                10.244.0.55:80,10.244.0.56:80
Session Affinity:         None
Internal Traffic Policy:  Cluster
Events:                   <none>
-> websrvc.default.svc.cluster.local

## 30 Namespaces
- cd namespace
  - kubectl create -f pod1.yaml
  - kubectl create -f namespace.yaml
  - kubectl get namespace
  - kubectl create -f pod2.yaml
  - kubectl get pods -n dev
  - kubectl delete pod myapp2 -n dev
  - kubectl delete namespace dev
  - kubectl delete pod myapp1

## 32 Challenge 3 Solution
- cd challenge3
  - kubectl create -f deployment.yaml
  - kubectl create -f nodeport.yaml

# 8 Storage
## 40 Storage Deployment
- cd storage
  - kubectl create -f storage.yaml
  - kubectl get pv
  - kubectl get pvc
  - kubectl delete pod storagedemo
  - kubectl delete pvc mypvc
  - kubectl delete pv pv01
  
## 41 ConfigMaps
- cd storage
  - kubectl create configmap httpd-conf --from-file httpd.conf
  - kubectl get cm
  - kubectl describe cm httpd-conf
  - kubectl get cm httpd-conf -o yaml > httpd-configmap.yaml
  - kubectl create -f podcm.yaml
  - kubectl delete cm httpd-conf
  - kubectl delete pod myapp

## 45 Challenge 5 Solution
- cd challenge5
  - docker container run -d --name nginx nginx
  - docker exec -it nginx /bin/bash
    - cd /etc/nginx/
      - cat nginx.conf
  - kubectl create cm nginx-conf --from-file=nginx.conf
  - kubectl create -f pod.yaml
  - kubectl delete pod nginx
  - kubectl delete cm nginx-conf

# 9 Useful Commands
## 46 Getting into a Container
- cd service
  - kubectl create -f deployment.yaml
  - kubectl create -f ingress.yaml
  - kubectl create -f service.yaml
  - kubectl get pods
  - kubectl exec -it webdeployment-7b86c68cb5-fqh6c -- /bin/bash

## 47 Getting Logs
- kubectl logs webdeployment-7b86c68cb5-fqh6c

## 48 Getting More Details
- kubectl describe pod webdeployment-7b86c68cb5-fqh6c

## 49 Trick For Creating YAML Files
- kubectl get service websrvc -o yaml > mysrvc.yaml

## 50 Making Changes on the Fly
- kubectl get deployments
- kubectl edit deployment webdeployment