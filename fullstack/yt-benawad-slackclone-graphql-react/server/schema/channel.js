export default `
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    message: [Message!]!
    users: [User!]!
  }

  type ChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error!]
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false, members: [Int!]): ChannelResponse!
  }
`;
