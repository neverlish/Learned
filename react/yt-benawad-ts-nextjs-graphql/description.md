## 03 GraphQL Code Generator Next.js

- gql-gen init
  - `npm i -g graphql-code-generator`
  - `gql-gen init`
    - type: Application built with React
    - schema: http://localhost:4000/graphql
    - where are operations and fragments: graphql/**/*.ts
    - plugins: TypeScript React Apollo
    - where to write output: generated/apolloComponents.tsx
    - want introspection file?: No
    - name config file: codegen.yml
    - package.json script: generate