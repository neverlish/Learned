# 3 Installing Prometheus & Collecting Metrics on Any OS
## 13 Node Exporter - Part 2 (Linux, Mac)
- set 2 instance
  - Prometheus
  - Application Server
- ssh on app server
  - sudo apt update
  - sudo apt-get install -y prometheus-node-exporter
  - sudo service prometheus-node-exporter status
- visit PUBLIC_URL_APP_SERVER:9100

## 14 Node Exporter - Part 3 (Linux, Mac)
- ssh on prometheus
  - sudo apt update
  - sudo apt-get install -y prometheus
  - cd /etc/prometheus
  - sudo vi prometheus.yml
    - add app url to targets
