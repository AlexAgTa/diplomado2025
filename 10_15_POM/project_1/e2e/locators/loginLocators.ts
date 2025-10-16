import { Page } from '@playwright/test';

export class LoginLocators {
        private page: Page;

        constructor(page: Page) {
            this.page = page;
        }

        get usernameInput() {
            return this.page.locator('[data-test="username"]');
        }

        get passwordInput() {
            return this.page.locator('[data-test="password"]');
        }

        get loginButton() {
            return this.page.getByRole('button', { name: 'LOGIN' });
        }

}