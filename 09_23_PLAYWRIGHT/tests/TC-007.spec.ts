import { test, expect } from '@playwright/test';

test('TC-007: Validar funcionalidad del boton "Add to Cart"', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click()
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
  
  // Aserción: verificar que el botón del carrito muestra "1"
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});