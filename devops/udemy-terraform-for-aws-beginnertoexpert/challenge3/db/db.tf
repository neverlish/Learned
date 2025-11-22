resource "aws_instance" "db" {
  ami = "ami-04fcc2023d6e37430"
  instance_type = "t2.micro"

  tags = {
    Name = "DB Server"
  }
}


output "PrivateIP" {
  value = aws_instance.db.private_ip
}
