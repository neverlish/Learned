from data import test

import boto3
import json

endpoint_name = "prod-endpoint"
region = "ap-northeast-2"

smrt = boto3.client(
  "sagemaker-runtime",
  region_name=region
)

test_data_json = json.dumps({'instances': test[:20].toarray()[:, :-1].tolist()})

prediction = smrt.invoke_endpoint(
  endpoint_name=endpoint_name,
  body=test_data_json,
  content_type="application/json"
)

prediction = prediction["Body"].read().decode('ascii')

print(prediction)
