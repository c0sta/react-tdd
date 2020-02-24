describe('Adding a restaurant', () => {
  beforeEach(() => cy.log('eu rodo antes de cada teste '));
  it('displays the restaurant in the list', () => {
    const restaurantName = 'Ponto 23';
    cy.visit('http://localhost:3000');

    cy.get('.add-restaurant-btn').click();

    cy.get('[data-test="input-restaurant"]').type(restaurantName);

    cy.get('.save-restaurant-btn').click();
  });
});
