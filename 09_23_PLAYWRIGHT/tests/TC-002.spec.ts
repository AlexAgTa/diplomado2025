import { test, expect } from '@playwright/test';

test('TC-002: Login con credenciales inválidas', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Aserción: comprobar que el mensaje de error es visible
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});