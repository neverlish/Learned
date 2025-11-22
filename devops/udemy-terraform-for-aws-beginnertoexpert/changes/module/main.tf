provider "aws" {
  region = "ap-northeast-2"
}

module "ec2" {
  source = "./ec2"
#   count = 3
  for_each = toset(["dev", "test", "prod"])
}
