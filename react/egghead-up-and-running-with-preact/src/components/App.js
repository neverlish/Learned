import { h } from 'preact';
import User from './User';

const users = [
  {
    image: 'https://avatars1.githubusercontent.com/u/1643522?v=4&s=460',
    name: 'Shane Osbourne'
  },
  {
    image: 'https://avatars1.githubusercontent.com/u/170270?v=4&s=460',
    name: 'Sindre Sorhus'
  }
]

export function App () {
  return (
    <div class='app'>
      {users.map (user => <User image={user.image} name={user.name} key={user.name}/>)}
    </div>
  )
}

export default App;
