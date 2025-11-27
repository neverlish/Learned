# 4 테라폼 기초
## 12 변수 (Variables)
- terraform apply -var instance_type=t4g.micro
- terraform console
  > var.instance_type
- terraform apply -var-file dev.tfvars

## 14 Terraform 상태 - terraform.tfstate
- terraform state list
- terraform state mv aws_instance.example aws_instance.web