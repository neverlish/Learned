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

## 24 Terraform 명령
- terraform init -upgrade
- terraform graph
- terraform show

# 6 고급 테라폼 사용하기
## 56 데모: 내장된 함수
- terraform console
  > replace("hello this is a string", "e", "!")
  > "the server launched at ${timestamp()}"
  > tolist(["subnet-1", "subnet-2", "subnet-3"])
  > split(",", "subnet-1,subnet-2,subnet-3")
  > element(tolist(["subnet-1", "subnet-2", "subnet-3"]), 0)
  > element(tolist(["subnet-1", "subnet-2", "subnet-3"]), 1)
  > element(tolist(["subnet-1", "subnet-2", "subnet-3"]), 2)
  > slice(tolist(["subnet-1", "subnet-2", "subnet-3"]), 0, 2)
  > join(",", ce(list("subnet-1", "subnet-2", "subnet-3"), 0, 2))
  > tomap({"eu-west-1"="ami-1", "us-east-1"="ami-2"})
  > lookup(tomap({"eu-west-1"="ami-1", "us-east-1"="ami-2"}), "us-east-1")
  > index(tolist(["subnet-1", "subnet-2", "subnet-3"]), "subnet-2")
  > substr("abcd", 0, 1)
  > substr("abcd", 0, 3)
  > substr("abcd", 1, 3)
  > substr("abcd", -1, 1)
  > substr("abcd", -2, 2)

## 58 데모: For 반복문
- cd for-demo
- terraform console
  > [for s in ["a", "b", "c"] : s]
  > [for s in ["a", "b", "c"] : upper(s)]
  > [for s in var.list1 : s + 1]
  > [for s in var.list2 : upper(s)]
  > [for k, v in var.map1 : k]
  > [for k, v in var.map1 : v]
  > {for k, v in var.map1 : k => v}


# 7 패커
## 67 데모: 테라 폼을 이용한 패커
- cd packer-demo
  - sh build-and-launch.sh
  - ssh -i mykey ubuntu@PUBLIC_IP
    - dpkg -l | grep nginx
    - dpkg -l | grep docker
