variable "ec2name" {
  type = string
}

resource "aws_instance" "ec2" {
  ami = "ami-04fcc2023d6e37430"
  instance_type = "t2.micro"
  tags = {
    Name = var.ec2name
  }
}