provider "aws" {
  region = "ap-northeast-2"
}


resource "aws_instance" "example" {
  ami           = data.aws_ami.ubuntu.id
  # instance_type = var.instance_type
  # instance_type = var.instance_type["example"]
  instance_type = var.instance_type.example
  tags = {
    Name = "example"
  }
}

