## 2 Create a User and setup the AWS CLI to interact with AWS

- IAM -> Create user
  - Programmatic access: true
  - Attach existing policies directly -> AdministratorAccess

## 4 Deploy a Node.js function to AWS Lambda using the Serverless Framework

- `$ sls deploy`
- `$ sls invoke --function helloWorld`
  - `$ sls invoke --function helloWorld --log`
- `$ sls logs --function helloWorld`
- `$ sls deploy function --function helloWorld`
