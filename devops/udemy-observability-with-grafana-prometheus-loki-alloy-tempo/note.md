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

# 5 Using Grafana
## 39 Connecting Grafana to Prometheus
- localhost:3000
  - connections -> Data Source & Add Data Source -> Prometheus
    - url: http://localhost:9090
    - save & test

## 40 Creating and Managing Dashboards in Grafana
- Dashboards -> New -> New Folder
  - Folder Name: Tech Team
  - Create Dashboard
    - Save Dashbaord
      - Title: ShoeHub
      - Folder: Tech Team
      - Save
    - Edit -> Settings
      - Tags: online course, shoehub, test
    - Add -> Row

## 41 Creating Your First Panel : The Time Series Panel
- Add -> Visualization
  - Visualization: Time Series
- Query
  - code: rate(microsoft_aspnetcore_hosting_http_server_request_duration_sum[1m])
- Save Dashboard

## 42 Multiple and Accumulative Queries
- Edit panel
  - Standard options -> Display name: Response (ms)
- New Visualization
  - query: rate(shoehub_sales{ShoeType=~"Boots|Loafers|HighHeels"}[1m])

## 44 Data Transformations
- Edit Panel
  - Transformations -> Add Transformation -> Add field from calculation
    - Mode: Reduce row
    - Calculation: Total
    - Alias: Total Sales
  - Save

## 45 Visually Comparing Values with Pie Charts
- Add Visualization
  - Visualization: Pie Chart
  - Title: Card Payments in Countries
  - query
    - rate(shoehub_payments{CountryCode="AU", PaymentMethod="Card"}[$__rate_interval])
      - Options -> Legend -> Custom: Australia
    - rate(shoehub_payments{CountryCode="IN", PaymentMethod="Card"}[$__rate_interval])
      - Options -> Legend -> Custom: India
    - rate(shoehub_payments{CountryCode="US", PaymentMethod="Card"}[$__rate_interval])
      - Options -> Legend -> Custom: US

## 46 Comparing Metric Data of Two Different Times (Time Shift)
- Add Visualization
  - Visualization: Time Series
  - Title: Sales Today vs Sales Last Week
  - query
    - rate(shoehub_sales{ShoeType=~"Loafers"}[$__interval])
    - rate(shoehub_sales{ShoeType=~"Loafers"}[$__interval] offset 1m)

## 48 Thresholds in Grafana
- Add Visualization
  - Visualization: Time Series
  - Title: Percentage of Payment Methods in the US
  - query
    - sum(shoehub_payments{CountryCode="US", PaymentMethod="Card"}) / sum(shoehub_payments{CountryCode="US"}) * 100
      - Options -> Legend -> Custom: Card
    - sum(shoehub_payments{CountryCode="US", PaymentMethod="Cash"}) / sum(shoehub_payments{CountryCode="US"}) * 100
      - Options -> Legend -> Custom: Cash
    - sum(shoehub_payments{CountryCode="US", PaymentMethod="Paypal"}) / sum(shoehub_payments{CountryCode="US"}) * 100
      - Options -> Legend -> Custom: Paypal

## 49 Variables and Dynamic Dashboards
- Dashboard Setting -> Variables -> Add Variable
  - (type: custom, Name: country, Label: Country, Custom options: AU,IN,US)
  - type: Query, Name: country, Label: Country, Data Source: prometheus, Query type; Classic Query, Classic Query: label_values(shoehub_payments{PaymentMethod="Card"}, CountryCode), Sort: Alphabetical(desc), Include all option
- Panel "Percentage of Payment Methods in the US" -> edit
  - title: Percentage of Payment Methods in the $country
  - query
    - sum(shoehub_payments{CountryCode="$country", PaymentMethod="Card"}) / sum(shoehub_payments{CountryCode="$country"}) * 100
    - sum(shoehub_payments{CountryCode="$country", PaymentMethod="Cash"}) / sum(shoehub_payments{CountryCode="$country"}) * 100
    - sum(shoehub_payments{CountryCode="$country", PaymentMethod="Paypal"}) / sum(shoehub_payments{CountryCode="$country"}) * 100
  - Repeat options:
    - Repeat by variable: country, Max per row: 3

## 51 Solved: Creating Dynamic Dashboards
- Dashboard Setting -> Variables -> Add Variable
  - type: Query, Name: paymentMethod, Label: Payment Method, Data Source: prometheus, Query type; Classic Query, Classic Query: label_values(shoehub_payments{Country="US"}, PaymentMethod), Sort: Alphabetical(desc), Include all option
- Add Visualization
  - Visualization: Time Series
  - Title: Payment Amount by Method of $paymentMethod
  - query
    - shoehub_payments{PaymentMethod="$paymentMethod"}
     Options -> Legend -> Custom: {{CountryCode}}
  - Repeat options:
    - Repeat by variable: paymentMethod, Max per row: 3

## 52 Increasing the visibility of data with logarithmic scaling
- Add Visualization
  - query
    - 2
    - 500
  - Axis
    - scale: Logarithmic
    - Log base: 10

## 53 Working with the Gauge and Bar Gauge Panels
- Add Visualization
  - Visualization: Gauge
  - query
    - shoehub_payments{CountryCode="US"}
    - Options -> Legend -> Custom: {{PaymentMethod}}
  - Thresholds
    - remove 80
    - Add Threshold: 400, 600
  - Value options
    - Calculation: Mean
  - Gauge
    - show threshold labels
  - title: Payments in US

# 6 Working with Alerts, Notifications and Annotations in Grafana
## 55 Working with Alert Rules
- Alerting -> Alert rules -> New alert rule
  - Name: Low Card Payment
  - Define query and alert condition
    - query
      - shoehub_payments{PaymentMethod="Card"}
    - options
      - Time Range: now-5m to now
      - Max date points
      - Min interval: 15s
    - Advanced options
      - delete Reduce, Threshold expression
      - Add expression: Reduce
        - Input: A
        - Function: Last
      - Add expression: Threshold
        - Input: B
        - Is Below: 400
  - Add folder and labels
    - Folder: Tech Team
    - Add labels -> team = tech
  - Set evaluation behavior
    - New evaluation group: Card Payments, 20s
    - Pending period: 1m

## 56 Notification Policies and Contact Points
- grafana.ini
  - edit smtp
- Alerting
  - Contact points -> Create Contact Point
  - Notification policies -> New child policy

## 58 Silencing Alert Notifications
- Alerting -> Silences -> Create silence
