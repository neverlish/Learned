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
          <div className='thumbnail'>
            <img src={recipe.image} alt={recipe.name}/>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <IngredientList recipe={recipe}/>
          </div>
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
