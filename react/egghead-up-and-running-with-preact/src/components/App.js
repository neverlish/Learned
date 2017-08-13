import { h, Component } from 'preact';
import linkState from 'linkstate';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    }
  }

  componentDidMount() {
    fetch(this.props.config.urls.user)
      .then(resp => resp.json())
      .then(user => {
        setTimeout(() => {
          this.setState({
            user,
            loading: false
          })
        }, 2000)
      })
      .catch(err => console.error(err));
  }

  render({config}, {loading, user}) {    
    return (
      <div class='app'>
        {loading 
          ? <p>Fetching {config.urls.user}</p>
          : <User
              image={user.avatar_url}
              name={user.name}/>
        }
      </div>
    )
  }
}

export default App;
