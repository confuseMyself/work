import React from 'react';
import ReactDOM from 'react-dom';
import HashHistory from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HashHistory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
