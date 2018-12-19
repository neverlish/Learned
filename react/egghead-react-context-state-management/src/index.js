import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Color = React.createContext('black');

const FancyButton = props => (
  <Color.Consumer>
    {color => {
      if (typeof color === 'undefined') {
        throw Error(
          'FancyButton requires a Color Provider'
        );
      }
      return (
        <button className={`fancy-btn ${color}`} {...props}>
          Click Me
        </button>
      );
    }}
  </Color.Consumer>
);

const App = () => (
  <div>
    <FancyButton />
    <Color.Provider value="red">
      <FancyButton />
    </Color.Provider>
    <Color.Provider value="green">
      <FancyButton />
    </Color.Provider>
    <Color.Provider value="blue">
      <FancyButton />
    </Color.Provider>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import LoginPage from './LoginPage';
// import MainPage from './MainPage';
// import { UserProvider, UserConsumer } from './UserContext';
// import { EmailProvider } from './EmailContext';
// import './index.css';

// function Root() {
//   return (
//     <UserConsumer>
//       {({ user }) =>
//         user ? (
//           <MainPage />
//         ) : (
//           <LoginPage />
//         )
//       }
//     </UserConsumer>
//   )
// }

// ReactDOM.render(
//   <UserProvider>
//     <EmailProvider>
//       <Root />
//     </EmailProvider>
//   </UserProvider>,
//   document.querySelector('#root')
// );
