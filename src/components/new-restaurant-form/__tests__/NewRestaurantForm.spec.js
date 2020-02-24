import React from 'react';
import { mount } from 'enzyme';

import NewRestaurantForm from '../new-restaurant-form.component';

describe('NewRestaurantForm', () => {
  describe('when save button is clicked', () => {
    it('calls the onSave handler', () => {
      const saveHandler = jest.fn();
      const wrapper = mount(<NewRestaurantForm onSave={saveHandler} />);
      wrapper
        .find('[data-test="input-restaurant"]')
        .simulate('change', { target: { value: 'New message' } });

      wrapper.find('.save-restaurant-btn').simulate('click');

      expect(saveHandler);
    });
  });
});
