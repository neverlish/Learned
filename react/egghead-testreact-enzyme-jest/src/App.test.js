import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('<App />', () => {
  const wrapper = shallow(<App />)
  it('h1 contains correct text', () => {
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
  })
})
