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