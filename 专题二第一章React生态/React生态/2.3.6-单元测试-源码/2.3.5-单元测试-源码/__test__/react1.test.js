import renderer from 'react-test-renderer'
import React from 'react';
import Hello from '../components/hello';
// import Hello2 from '../components/hello2'
import Button from '../components/button'

import { shallow,mount } from 'enzyme';


test('react', () => {
  const app = shallow(<Hello />);

  expect(app.find('div').text()).toEqual('hello');
  expect(app.instance().echo()).toEqual('echo');
});


// test('input',() => {
//   const app = shallow(<Hello2/>)
//   expect(app.find('div').text()).toEqual('hello');
//   expect(app.instance().echo()).toEqual('echo');
//   // expect(input.find('div').text()).toEqual('aa');
// })
//
//
//
test('button',() => {
  const btn = shallow(<Button/>)
  btn.find('button').simulate("click")
  expect(btn.state('num')).toEqual(2);
})


