import React, {Component} from 'react';
import IngredientList from './IngredientList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipies: JSON.parse(localStorage.getItem('recipies')) || []
    }
  }

  displayRecipies() {
    let resultsArray = [];

    this.state.recipies.map((recipe, i) => {
      return resultsArray.push(
        <div key={i} className='col-sm-4'>
          {recipe.name}<br/>
          {recipe.description}<br/>
          <IngredientList recipe={recipe}/>
        </div>
      );
    });

    return resultsArray
  }

  render() {
    return (
      <div clasName='row'>
        <h1>Home</h1>
        {this.displayRecipies()}
      </div>
    );
  }
}

export default Home;
