module.exports = {
  client: {
    includes: ["./screens/*.{tsx,ts}", "./fragments.ts"],
    tagName: "gql",
    service: {
      name: 'backend',
      url: 'http://localhost:4000/graphql',
    }
  }
}