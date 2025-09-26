import { test, expect } from '@playwright/test';

test('TC-025: Verificar que el producto añadido al carrito, es el mismo producto del cart.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Guardar el nombre del producto antes de añadirlo al carrito
  const productName = await page.locator('.inventory_item_name').first().innerText();

  // Añadir el producto al carrito
  await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();

  // Ir al carrito
  await page.getByRole('link', { name: '1' }).click();

  // Verificar que el nombre del producto en el carrito es igual al guardado
  const cartProductName = await page.locator('.inventory_item_name').first().innerText();
  expect(cartProductName).toBe(productName);
});