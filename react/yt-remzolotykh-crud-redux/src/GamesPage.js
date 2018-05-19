import React from 'react';
import { connect } from 'react-redux';
import GamesList from './GamesList';

class GamesPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Games List</h1>

        <GamesList games={this.props.games} />
      </div>
    )
  }
}

GamesPage.propTypes = {
  games: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps)(GamesPage);
