import { Page } from '@playwright/test';
import { BasePage } from './basePage';

interface LoginCredentials  {
    username: string;
    password: string;
}

export class LoginPage extends BasePage {
    private readonly usernameInput = '[data-test="username"]';
    private readonly passwordInput = '[data-test="password"]';
    //private readonly loginButton = 'button:has-text("LOGIN")';
    private readonly productsTitle = 'text=Products';

    constructor(page: Page, baseURL: string) {
        super(page, baseURL);
    }

    async login(credentials: LoginCredentials): Promise<void> {
        await this.fillUsername(credentials.username);
        await this.fillPassword(credentials.password);
        await this.clickLoginButton();
    }

    private async fillUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
    }

    private async fillPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordInput, password);
    }

    private clickLoginButton(): Promise<void> {
        return this.page.getByRole('button', { name: 'LOGIN' }).click();
    }

    async isLoginSuccessful(): Promise<boolean> {
        return this.page.isVisible(this.productsTitle);
    }
}