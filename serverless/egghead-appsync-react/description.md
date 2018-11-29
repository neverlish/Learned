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

## 3 Execute Mutations within the AWS AppSync Console
- Appsync TodoApp -> Queries
  ```
  mutation create {
    createTodo(input:{
      title: "Get Grocery",
      completed:false
    }) {
      id
      title
      completed
    }
  }

  mutation update {
    updateTodo(input:{
      id:"3399efec-7c9b-445e-aafe-8aa9c8d0edd1",
      completed:true
    }) {
      id
      title
      completed
    }
  }
  
  mutation delete {
    deleteTodo(input:{
      id:"3399efec-7c9b-445e-aafe-8aa9c8d0edd1",
    }) {
      id
      title
      completed
    }
  }

  ```
