import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5174',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {},
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    browser: 'electron',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  }
});
