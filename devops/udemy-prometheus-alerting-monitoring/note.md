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