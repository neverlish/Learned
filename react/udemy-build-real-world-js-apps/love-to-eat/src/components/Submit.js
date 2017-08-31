import React, {Component} from 'react';

class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.submitRecipe = this.submitRecipe.bind(this);
  }

  submitRecipe() {
    console.log('button clicked');
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h2>Submit</h2>
        <button onClick={this.submitRecipe}>Submit a Recipe</button>
      </div>
    );
  }
}

export default Submit;
