terraform {
  backend "s3" {
    bucket = "terraform-neverlish"
    key = "first-steps"
    region = "ap-northeast-2"
    dynamodb_table = "terraform-locking"
  }
}

provider "aws" {
  region = "ap-northeast-2"
}