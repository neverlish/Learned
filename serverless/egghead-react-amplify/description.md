## 1 Install & Configure the AWS Amplify CLI
- `amplify configure`
  - create new AWS user
  - create new AWS cli profile

## 2 Create & Configure an AWS Amplify Project with a React Application
- `amplify init`

## 3 Use the AWS Amplify withAuthenticator HOC to Implement a React User Authorization Flow
- `amplify add auth`
- `amplify push`

## 5 Create & Interact with an AWS AppSync GraphQL API with AWS Amplify
- `amplify add api`
  - GraphQL
  - name: AmplifyTodoApp
  - API Key
  - have annotated graphql schema? No
  - want a guided schema creation? Yes
  - Single object with fields
  - edit schema now? Yes
- `amplify push`
