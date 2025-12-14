// Support file for Cypress E2E tests
// Add any global configurations here

// Example: Ignore specific errors if needed
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});
