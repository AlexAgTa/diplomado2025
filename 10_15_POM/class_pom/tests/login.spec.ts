import { test, expect } from '@playwright/test';
import { LoginPage } from '../e2e-pom/pages/loginPage';
import { testConfig } from '../e2e-pom/utils/testConfig';

test.describe('login succesfully using POM', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, testConfig.baseURL);
    await loginPage.navigateTo();
  });

  test('should login with valid credentials', async () => {
    await loginPage.login(testConfig.credentials);
    
    const isLoginSuccessful = await loginPage.isLoginSuccessful();
    expect(isLoginSuccessful).toBeTruthy();
  });
});