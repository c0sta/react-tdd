import React from 'react';
import { mount } from 'enzyme';
import App from './App';

test('renders learn react link', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.hello').text()).toContain('Hellow world!');
});
