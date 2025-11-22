terraform {
  backend "s3" {
    key = "terraform/terraform.tfstate"
    bucket = "neverlish-remote-backend-2025"
    region = "ap-northeast-2"
  }
}