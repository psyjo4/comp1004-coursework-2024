const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:5500/pages/', // Adjust if using a different local server or URL
    browserName: 'chromium',
    headless: false, // Set to true if you want to run tests headlessly
  },
});
