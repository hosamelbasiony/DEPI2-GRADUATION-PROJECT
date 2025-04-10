import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'e2e',
  timeout: 30 * 1000, // Set a global timeout of 30 seconds for all tests.
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000, // 5 seconds
  },
  // Maximum time each action (like click) should wait before timing out.
  
  fullyParallel: true,

  forbidOnly: false, // Set to true to fail the build if test.only is left in the source code.
  retries: 0, // Number of retries for failed tests.
  workers: 1, // Number of concurrent workers to use for running tests.

  // Reporter to use
  reporter: 'html',
  outputDir: 'playwrite-test-results', // Directory to save test results.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:5173',
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run your local dev server before starting the tests.
//   webServer: {
//     command: 'npm run start',
//     url: 'http://localhost:3000',
//     reuseExistingServer: true,
//   },
});