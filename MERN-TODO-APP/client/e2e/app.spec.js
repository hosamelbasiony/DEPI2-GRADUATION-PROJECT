// @ts-check
import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('/');
//   await expect(page).toHaveTitle(/Learn Jenkins/);
// });

test('has "DEPI-2 TODOS" in the body', async ({ page }) => {
  await page.goto('/login');

  const isVisible = await page.locator('h1:has-text("DEPI-2 TODOS")').isVisible();
  expect(isVisible).toBeTruthy();
});

// test('has expected app version', async ({ page }) => {
//   await page.goto('/');

//   const expectedAppVersion = process.env.REACT_APP_VERSION ? process.env.REACT_APP_VERSION : '1';

//   console.log(expectedAppVersion);

//   const isVisible = await page.locator(`p:has-text("Application version: ${expectedAppVersion}")`).isVisible();
//   expect(isVisible).toBeTruthy();
// });
