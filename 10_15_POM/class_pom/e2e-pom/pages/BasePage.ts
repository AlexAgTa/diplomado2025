import { Page } from "playwright/test";

export abstract class BasePage {

    protected readonly page: Page;
    protected readonly baseURL: string;

    constructor(page: Page, baseURL: string) {
        this.page = page;
        this.baseURL = baseURL;
    }

    async navigateTo(path: string = ''): Promise<void> {
        await this.page.goto(`${this.baseURL}${path}`);
    }
}