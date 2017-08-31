import React, {Component} from 'react';

class Submit extends Component {

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-12'>
          <h1>Submit</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter the name of recipe"/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" id="description" placeholder="Enter a brief description"/>
            </div>
            <div className="form-inline form-group">
              <label htmlFor="quantity">quantity</label>
              <input type='text' className="form-control" id="quantity" placeholder="Quantity"/>
              <label htmlFor="ingredient">Ingredient</label>
              <input type='text' className="form-control" id="ingredient" placeholder="Ingredient"/>
              <button type="submit" className="btn btn-info">Add</button>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Submit;
