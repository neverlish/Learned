data "terraform_remote_state" "first-steps" {
  backend = "s3"

  config = {
    bucket = "terraform-neverlish"
    key    = "first-steps/terraform.tfstate"
    region = "ap-northeast-2"
  }
}

output "vpc_id" {
  value = data.terraform_remote_state.first-steps.outputs.vpc_id
}