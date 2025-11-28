# 4 테라폼 기초
## 12 변수 (Variables)
- terraform apply -var instance_type=t4g.micro
- terraform console
  > var.instance_type
- terraform apply -var-file dev.tfvars

## 14 Terraform 상태 - terraform.tfstate
- terraform state list
- terraform state mv aws_instance.example aws_instance.web

## 15 VPC 첫 단계
- terraform apply -target module.vpc
- terraform taint aws_instance.web

## 16 VPC, Security Group, SSH Key 첫 단계
- ssh -i ~/.ssh/id_ed25519 ubuntu@PUBLIC_IP

## 18 user_data를 사용한 프로비저닝
- enter ec2 instance
  $ sudo -s
  # cat /var/log/cloud-init-output.log

## 20 원격 상태
- terraform state pull
- terraform force-unlock -h

## 21 Datasources
- terraform output