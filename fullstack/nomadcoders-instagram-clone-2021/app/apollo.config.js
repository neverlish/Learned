module.exports = {
  client: {
    includes: ["./screens/*.{tsx,ts}", "./fragments.ts", "./components/**/*.tsx", "./hooks/*.tsx"],
    tagName: "gql",
    service: {
      name: 'backend',
      url: 'http://localhost:4000/graphql',
    }
  }
}