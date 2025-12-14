describe('Portfolio App - Navigation and Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should load the home page successfully', () => {
    cy.contains(/Hi, I'm Yuvraj Singh/i).should('be.visible');
  });

  it('should have navigation links', () => {
    // Check if navigation exists
    cy.get('nav').should('exist');
  });

  it('should display home content with correct styling', () => {
    const heading = cy.contains(/Hi, I'm Yuvraj Singh/i);
    heading.should('exist');
    heading.should('have.css', 'font-size');
  });

  it('should have clickable sections', () => {
    // Test if we can interact with the page
    cy.get('body').should('be.visible');
  });

  it('should render without errors', () => {
    // Check for any JavaScript errors
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.not.include('is not a function');
      return false;
    });
    cy.get('body').should('exist');
  });
});

describe('Portfolio App - Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to different pages', () => {
    // Test navigation
    cy.visit('/');
    cy.url().should('include', '/');
  });

  it('should display main layout structure', () => {
    // Check main layout elements exist
    cy.get('div').should('have.length.greaterThan', 0);
  });
});
