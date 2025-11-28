#!/bin/bash

apt-get update
apt-get update -y
apt-get install -y nginx unzip
# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
rm -rf awscliv2.zip aws

rm /var/www/html/index.nginx-debian.html

aws s3 sync s3://${bucket_name} /var/www/html

