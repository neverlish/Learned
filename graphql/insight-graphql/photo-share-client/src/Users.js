import React from 'react'
import { Query, Mutation } from "react-apollo"
import { ROOT_QUERY } from './App'
import { gql } from 'apollo-boost'

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`

const Users = () =>
  <Query query={ROOT_QUERY} fetchPolicy='cache-and-network'>
    {({ data, loading, refetch }) => loading ?
      <p>사용자 불러오는 중...</p> :
      <UserList
        count={data.totalUsers}
        users={data.allUsers}
        refetchUsers={refetch}
      />
    }
  </Query>

const updateUserCache = (cache, { data: { addFakeUsers } }) => {
  let data = cache.readQuery({ query: ROOT_QUERY })
  data.totalUsers += addFakeUsers.length
  data.allUsers = [
    ...data.allUsers,
    ...addFakeUsers
  ]
  cache.writeQuery({ query: ROOT_QUERY, data })
}

const UserList = ({ count, users, refetchUsers }) =>
  <div>
    <p>{count} Users</p>
    <button onClick={() => refetchUsers()}>다시 가져오기</button>
    <Mutation
      mutation={ADD_FAKE_USERS_MUTATION}
      variables={{ count: 1 }}
      update={updateUserCache}>
      {addFakeUsers =>
        <button onClick={addFakeUsers}>임시 사용자 추가</button>
      }
    </Mutation>
    <ul>
      {users.map(user =>
        <UserListItem
          key={user.githubLogin}
          name={user.name}
          avatar={user.avatar}
        />
      )}
    </ul>
  </div>

const UserListItem = ({ name, avatar }) =>
  <li>
    <img src={avatar} width={48} height={48} alt='' />
    {name}
  </li>

export default Users