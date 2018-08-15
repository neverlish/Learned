## 02 How to setup Typeorm
- init typeorm: `$ typeorm init --database pg`
- create db: `$ createdb DB_NAME`
- check db
  - `$ psql DB_NAME`
  - `# \d`
  - `# \d user`

## 06 Typescript Types for GraphQL Resolvers
- generated graphql types
  - `$ graphql init` -> .graphqlconfig.yaml
  - `$ graphql prepare`
  - `$ gql2ts src/schema.graphql -o src/generated/schema.ts`

