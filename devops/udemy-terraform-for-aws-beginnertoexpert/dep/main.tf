provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_instance" "db" {
  ami = "ami-04fcc2023d6e37430"
  instance_type = "t2.micro"

  tags = {
    Name = "DB Server"
  }
}

resource "aws_instance" "web" {
  ami = "ami-04fcc2023d6e37430"
  instance_type = "t2.micro"

  tags = {
    Name = "Web Server"
  }

  depends_on = [aws_instance.db]
}

data "aws_instance" "dbsearch" {
  filter {
    name = "tag:Name"
    values = ["DB Server"]
  }
}

output "dbservers" {
  value = data.aws_instance.dbsearch
}