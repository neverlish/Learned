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

## 4 Execute Queries within the AWS AppSync Console
```
query get {
  getTodo(id:"cb261fd5-c55a-4b31-8cc1-40e8f56d279e") {
    id
    title
    completed
  }
}

query list {
  listTodos {
    items {
      id
      title
      completed
    }
  }
}

query list {
  listTodos(filter:{
    title:{
      contains:"Work Out"
    }
  }) {
    items {
      id
      title
      completed
    }
  }
}

mutation create {
  createTodo(input:{
    title: "Book Flight",
    completed:false
  }) {
    id
    title
    completed
  }
}
```

## 5 Connect to AWS AppSync from a React Application
- AWS Appsync TodoApp -> Download Config

## 9 Building AWS AppSync APIs using the AWS Amplify CLI
- `$ amplify configure`
  - set region
  - add AWS user
  - put accessKeyId and secretAccessKey
  - set Profile Name
- `$ cd my-restaurant-app && amplify init`
  - choose profile created before
- `$ amplify add api`
  - authorization type: API key
  - have annotated graphql schema?: no
  - want guided schema creation?: yes
  - describes project: Single object with fields
  - edit schema(schema.graphql) and enter
- `$ amplify push`
