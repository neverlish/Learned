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

## 18 (Optional) Collecting Metrics in Mac using Node Exporter
- brew install node_exporter
- brew services start node_exporter
- visit localhost:9100
- vi /opt/homebrew/etc/prometheus.yml
```
...
- job_name: "node_exporter"
  static_configs:
    - targets: ['localhost:9100']
```
- brew services restart prometheus

# 4 Installing and Configuring Grafana
## 35 Configuring Grafana
- cd /opt/homebrew/etc/grafana
- sudo cp grafana.ini custom.ini
- sudo vi grafana.inis