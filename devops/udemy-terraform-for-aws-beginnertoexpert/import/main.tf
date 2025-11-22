provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_vpc" "myvpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_vpc" "myvpc2" {
  cidr_block = "10.0.1.0/24"
}