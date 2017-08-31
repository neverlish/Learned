import React, {Component} from 'react';
import Ingredients from './Ingredients';
import IngredientList from './IngredientList';

class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRecipe: {
        name: 'New Recipe',
        description: 'Description',
        ingredients: []
      }
    };
    this.submitRecipe = this.submitRecipe.bind(this);
  }

  submitRecipe() {
    console.log('Submit Recipe');
    console.log(this.name.value, this.description.value);

    let newRecipe = this.state.newRecipe;
    newRecipe.name = this.name.value;
    newRecipe.description = this.description.value;

    this.setState({newRecipe});
  }

  addIngredient(quantity, ingredient) {
    console.log('Add Ingredients in Submit js');
    let newRecipe = this.state.newRecipe;
    newRecipe.ingredients.push({quantity: quantity, ingredient: ingredient})
    this.setState({newRecipe: newRecipe});
  }

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-12'>
          <h1>Submit</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                ref={(input) => {this.name = input;}}
                className="form-control"
                id="name"
                placeholder="Enter the name of recipe"/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                ref={(input) =>  {this.description = input;}}
                id="description"
                placeholder="Enter a brief description"/>
            </div>
            <IngredientList recipe={this.state.newRecipe}/>
            <Ingredients addIngredient={(quantity, ingredient) => {this.addIngredient(quantity, ingredient)}}/>
            <button type="button" onClick={this.submitRecipe} className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Submit;
