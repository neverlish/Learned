# 2.3 Docker를 이용하여 Prometheus 설치하기

```vim
docker run \
> -d --name=prometheus \
> -p 9090:9090 \
> -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
> -v ./config:/etc/prometheus \
> -v ./data:/data \
> prom/prometheus:v2.29.2 \
> --config.file=/etc/prometheus/prometheus.yml \
> --storage.tsdb.path=/data \
> --web.enable-lifecycle --storage.tsdb.retention.time=20d --log.level=debug
```

# 2.4 Exporter 알아보기

```vim
docker run -d --name=node_exporter -p 9100:9100 -v "/:/host:ro,rslave" quay.io/prometheus/node-exporter:latest --path.rootfs=/host
```

# 2.8 Push GW 알아보기

```vim
docker run -d -p 9091:9091 --name pushgateway prom/pushgateway:v1.4.1
```

```vim
echo "test_metric 1" | curl --data-binary @- http://localhost:9091/metrics/job/test_job
```

# 2.9 Alertmanager 알아보기
```vim
docker run \
-d --name=prometheus -p 9090:9090 \
-v ./config:/etc/prometheus \
-v ./data:/data \
prom/prometheus:v2.29.2 \
--config.file=/etc/prometheus/alerting.yml \
--storage.tsdb.path=/data --web.enable-lifecycle --storage.tsdb.retention.time=20d --rules.alert.resend-delay=10s
```

```vim
docker run -p 9093:9093 --name alertmanager -d -v ./config:/etc/alertmanager quay.io/prometheus/alertmanager
```