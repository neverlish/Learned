provider "aws" {
  region = "ap-northeast-2"
}

variable "number_of_servers" {
  type = number
}

resource "aws_instance" "ec2" {
  ami = "ami-04fcc2023d6e37430"
  instance_type = "t2.micro"
  count = var.number_of_servers
}