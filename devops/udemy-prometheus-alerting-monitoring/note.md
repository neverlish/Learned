# 1 Install Prometheus
- launce ec2 instance with ubuntu ami
- ssh
  - sudo apt update
  - sudo apt-get install -y prometheus
  - sudo service prometheus status
  - sudo service prometheus-node-exporter status
  - ps -u prometheus
- PUBLIC_URL
  - PUBLIC_URL:9090/classic/graph
  - PUBLIC_URL:9100
  - PUBLIC_URL:9100/metrics

# 3 Reverse Proxy Prometheus with Nginx
- ssh
  - sudo apt install nginx -y
  - cd /etc/nginx/sites-enabled/
  - sudo nano prometheus
```
server {
    listen 80;
    listen [::]:80;
    server_name PUBLIC_URL;

    location / {
        proxy_pass http://localhost:9090;
    }
}
```
  - sudo nginx -t
  - sudo systemctl restart nginx

# 4 Add SSL to Prometheus Reverse Proxy
- ssh
  - sudo snap install --classic certbot
  - sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
  - sudo vi /etc/nginx/sites-enabled/prometheus
```
server {
    server_name PUBLIC_URL;
    location / {
        proxy_pass http://localhost:9090;
    }

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = PUBLIC_URL) {
        return 301 https://$host$request_uri;
    }
    
    listen 80;
    listen [::]:80;
    server_name PUBLIC_URL;
    return 404;
}
```

# 5 Add Basic Authentication to the Prometheus User Interface
- ssh
  - cd /etc/nginx/
  - sudo apt install apache2-utils -y
  - sudo htpasswd -c /etc/nginx/.htpasswd admin
  - sudo vi /etc/nginx/sites-enabled/prometheus
```
server {
    auth_basic "Protected Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
    ...
    location / {
        proxy_pass http://localhost:9090;
    }
}
```
  - sudo nginx -t
  - sudo systemctl restart nginx
  - sudo iptables -A INPUT -p tcp -s localhost --dport 9090 -j ACCEPT
  - sudo iptables -A INPUT -p tcp --dport 9090 -j DROP
  - sudo iptables -A INPUT -p tcp -s localhost --dport 9100 -j ACCEPT
  - sudo iptables -A INPUT -p tcp --dport 9100 -j DROP
  - sudo iptables -L

# 6 Scrape Target Basics
- PUBLIC_URL:9090
  - query
- ssh
  - curl localhost:9090/metrics
  - sudo cat /etc/prometheus/prometheus.yml

# 7 Install an External Node Exporter
- launce another ec2 instance with ubuntu ami
- instance 2 ssh
  - sudo apt update
  - sudo apt-get install -y prometheus-node-exporter
  - sudo service prometheus-node-exporter status
- instance 1 ssh
  - sudo vi /etc/prometheus/prometheus.yml
  - add the following scrape config:
```
scrape_configs:
  - job_name: node
    # If prometheus-node-exporter is installed, grab stats about the local
    # machine by default.
    static_configs:
      - targets: ['localhost:9100']
      - targets: ['INSTANCE_2_PUBLIC_IP:9100']
```
  - promtool check config /etc/prometheus/prometheus.yml
  - sudo service prometheus restart
- instance 1 url
  - https://PUBLIC_URL:9090/classic/targets

# 8 Deleting a Time Series
- instance 1 ssh
  - sudo vi /etc/default/prometheus
    - add ARGS="--web.enable-admin-api" to the file
  - sudo service prometheus restart
  - curl -X POST -g 'http://localhost:9090/api/v1/admin/tsdb/delete_series?match[]={instance="INSTANCE"}'

# 9 PromQL Example Queries
- instance 1 web
  - query
    - scrape_duration_seconds
    - scrape_duration_seconds{instance="localhost:9100"}
    - node_cpu_seconds_total{mode=~".*irq"}
    - node_netstat_Tcp_InSegs{instance="localhost:9100"}[5m]
    - rate(scrape_duration_seconds{instance="localhost:9100"}[1m:20s])
    - rate(node_netstat_Tcp_InSegs[10m])
    - sum(go_threads)
    - deriv(ceil(rate(node_netstat_Tcp_InSegs{instance="localhost:9100"}[1m]))[1m:])

# 10 Recording Rules
- instance 1 ssh
  - cd /etc/prometheus
  - sudo vi prometheus_rules.yml
```
groups:
  - name: custom_rules
    rules:
      - record: node_memory_MemFree_percent
        expr: 100 - (100 * node_memory_MemFree_bytes / node_memory_MemTotal_bytes)

      - record: node_filesystem_free_percent
        expr: 100 * node_filesystem_free_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}
```
  - promtool check rules prometheus_rules.yml
  - sudo vi prometheus.yml
    - add `- "prometheus_rules.yml"` under the `rule_files` section

# 11 Alerting Rules
- instance 1 ssh
  - add to prometheus_rules.yml
```
  - name: alert_rules
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
            severity: critical
        annotations:
            summary: 'Instance {{ $labels.instance }} down'
            description: '{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute.'
  - alert: DiskSpaceFree10Percent
        expr: node_filesystem_free_percent <= 10
        labels:
            severity: warning
        annotations:
            summary: 'Instance {{ $labels.instance }} has 10% or less Free disk space'
            description: '{{ $labels.instance }} has only {{ $value }}% or less free.'
```
  - sudo service prometheus restart
  - sudo service prometheus-node-exporter stop
    - visit PUBLIC_URL:9090/classic/alerts
  - sudo service prometheus-node-exporter start

