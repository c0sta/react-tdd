import React from 'react';

const NewRestaurantForm = () => {
  return (
    <form style={{ backgrounColor: '#e1e1e1' }}>
      <h1>Form New Restaurant</h1>
      <input data-test="input-restaurant" type="text" />
      <button className="save-restaurant-btn" type="button">
        Save restaurant{' '}
      </button>
    </form>
  );
};

export default NewRestaurantForm;
