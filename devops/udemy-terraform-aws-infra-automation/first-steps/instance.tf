provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_instance" "example" {
  ami           = "ami-04fcc2023d6e37430"
  instance_type = "t2.micro"
}

