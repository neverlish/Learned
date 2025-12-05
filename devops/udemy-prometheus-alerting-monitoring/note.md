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
