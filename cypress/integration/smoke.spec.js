describe('Smoke test', () => {
  it('makes sure the welcome msg comes uup', () => {
    cy.visit('http://localhost:3000').contains('Hellow world!');
  });
});
