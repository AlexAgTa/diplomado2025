import { test, expect } from '@playwright/test';

test('TC-001: Verify that login with valid username and password success.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Aserción: comprobar que la URL contiene '/inventory.html'
  await expect(page).toHaveURL(/.*inventory\.html/);
});

