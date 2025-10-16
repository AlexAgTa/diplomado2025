import { test, expect } from '@playwright/test';
import { LoginTasks } from '../tasks/loginTasks';
import { TestData } from '../utils/testData';

test('test login success new model', async ({ page }) => {
  const url = TestData.URL;
  const username = TestData.USERS.STANDARD_USER.username;
  const password = TestData.USERS.STANDARD_USER.password;
  const loginTasks = new LoginTasks(page);
  await loginTasks.navigateToLoginPage(url);
  await loginTasks.doLogin(username, password);
  await expect(page.getByText(TestData.VALIDATIONS_TEXTS.PRODUCTS_HEADER)).toBeVisible();
  await expect(page.getByText(TestData.VALIDATIONS_TEXTS.PRODUCTS_HEADER)).toHaveText(TestData.VALIDATIONS_TEXTS.PRODUCTS_HEADER);
});