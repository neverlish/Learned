provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_iam_user" "myUser" {
  name = "TJ"
}

resource "aws_iam_policy" "customPolicy" {
  name = "GlacierEFSEC2"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glacier:*"
      ],
      "Resource": "*"
    }
  ]
}
  EOF
}

resource "aws_iam_policy_attachment" "policyBind" {
  name = "attachment"
  users = [aws_iam_user.myUser.name]
  policy_arn = aws_iam_policy.customPolicy.arn
}