import React, {Component} from 'react';
import alphabets from '../alphabets.json';

class EasyABC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alphabets: alphabets,
      currentPosition: 0
    }
  }
  render() {
    return (
      <div className='game'>
        <div className='option'>
          <div className='fields'>
            <div className='field-block'>
              {this.state.alphabets[this.state.currentPosition].letter}
            </div>
          </div>
          <div className='buttons'>
            <a className='button prev'>Previous</a>
            <a className='button sound'>Play Sound Again</a>
            <a className='button next'>Next</a>
          </div>
          <div className='fields'>
            <div className='field-block'>
              <div className='left-field'>
                <div className='placeholder-span hide'>Click Next to view Image</div>
                <img
                  className='letter-image'
                  alt={this.state.alphabets[this.state.currentPosition].word}
                  src={this.state.alphabets[this.state.currentPosition].image}/>
              </div>
              <div className='right-field'>
                <div className='placeholder-span hide'>Click Next to view Spelling</div>
                <div className='word'>
                  {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EasyABC;
