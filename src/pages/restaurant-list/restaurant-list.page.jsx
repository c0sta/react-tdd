import React from 'react';
import NewRestaurantForm from '../../components/new-restaurant-form/new-restaurant-form.component';

const RestaurantListPage = () => {
  return (
    <div className="restaurant-list">
      <h1>Olá, Usuário</h1>
      <NewRestaurantForm />
      <button className="add-restaurant-btn" type="button">
        Add Restaurant
      </button>
    </div>
  );
};

export default RestaurantListPage;
