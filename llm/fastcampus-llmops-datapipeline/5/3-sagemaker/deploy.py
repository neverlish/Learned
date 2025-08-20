import mlflow.sagemaker

from mlflow.deployments import get_deploy_client

config = {
  "execution_role_arn": "",
  "bucket_name": "",
  "image_url": "",
  "region_name": "",
  "archive": False,
  "instance_type": "",
  "instance_count": 1,
  "synchronous": True,
}

client = get_deploy_client(config)

client.create_deployment(
  name="prod-endpoint",
  model_uri="",
  flavor="python_function",
  config=config
)