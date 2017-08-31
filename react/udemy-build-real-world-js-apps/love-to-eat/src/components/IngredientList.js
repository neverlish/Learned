import React, {Component} from 'react';

class IngredientList extends Component {
  displayIngredients() {
    let resultsArray = [];

    this.props.recipe.ingredients.map((item, i) => {
      resultsArray.push(<li key={i}>{item.quantity} - {item.ingredient}</li>);
    });

    return resultsArray;
  }

  render() {
    return (
      <ul>
        {this.displayIngredients()}
      </ul>
    );
  }
}

export default IngredientList;
