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