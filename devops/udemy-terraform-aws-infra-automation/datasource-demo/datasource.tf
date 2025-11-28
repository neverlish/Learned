data "terraform_remote_state" "first-steps" {
  backend = "s3"

  config = {
    bucket = "terraform-neverlish"
    key    = "first-steps/terraform.tfstate"
    region = "ap-northeast-2"
  }
}

locals {
  vpc_id = data.terraform_remote_state.first-steps.outputs.vpc_id
}

output "vpc_id" {
  value = local.vpc_id
}