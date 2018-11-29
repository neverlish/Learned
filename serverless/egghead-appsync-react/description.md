## 2 Create your first AWS AppSync GraphQL API

- AWS Appsync -> Getting Started
  - Build from scratch -> Name: TodoApp
  - Schema -> Create Resource
    ```
    type Todo {
      id: ID!
      title: String!
      completed: Boolean
    }
    ```
