import React from 'react';
import { mount } from 'enzyme';
import App from './App';

test('renders App component', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.restaurant-list').text()).toContain('Olá, Usuário');
});
