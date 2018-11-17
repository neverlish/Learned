## 0 AWS AppSync Setup with Amplify 
- `$ npm i -g @aws-amplify/cli`
- `$ amplify configure`
- `$ create-react-app FOLDER --typescript`
- `$ amplify init`
- `$ amplify add api`
  - GraphQL
  - API name: Auction
  - API authorization type: API key
  - annotated GraphQL schema?: No
  - want guided schema creation?: Yes
  - Single object with fields
  - want edit schema now?: Yes
  - edit .graphql file and press enter
- `$ amplify push`

## 5 AppSync Authentication with Cognito User Pools
- `$ amplify api remove`
  - resource: Auction
- `$ amplify api add`
  - service: GraphQL
  - API name: AuthAuction
  - authorization type: Cognito
  - security configuration: default
  - have annotated GraphQL schema?: No
  - want guided schema cration?: Yes
  - best describes project: Objects with fine-grained access control
  - want to edit schema now?: Yes
  - edit schema.graphql and Enter
    ```graphql
      type Auction 
        @model 
        @auth(
          rules: [
            {
              allow: owner,
              queries: null,
              mutations: [create, update, delete]
            }
          ]
        ) 
      {
        id: ID!
        name: String!
        price: Float!
      }

    ```
- `$ amplify push`
