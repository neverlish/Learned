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