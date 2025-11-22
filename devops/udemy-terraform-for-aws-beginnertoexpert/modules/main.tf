provider "aws" {
  region = "ap-northeast-2"
}

module "ec2" {
  source = "./ec2"
  ec2name = "Name From Module"
}

output "instance_id" {
  value = module.ec2.instance_id
}
