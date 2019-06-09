import React from 'react';
import { observer } from 'mobx-react';
import store from '../common/store';

@observer
class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Tiny SNS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <form className="my-2 my-lg-0">
              {store.user === null && (
                '로그인 해주세요'
              )}
              {store.user !== null && (
                store.user.name + '님 반갑습니다.'
              )}
            </form>
          </div>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;