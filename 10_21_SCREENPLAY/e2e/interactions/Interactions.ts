import { Page } from '@playwright/test';
import { Performable } from './Performable';

export class Enter implements Performable {
    private readonly text: string;
    private readonly selector: string;

    private constructor(text: string, selector: string) {
        this.text = text;
        this.selector = selector;
    }

    static text(text: string): { into: (selector: string) => Enter } {
        return {
            into: (selector: string) => new Enter(text, selector)
        };
    }

    async performAs(page: Page): Promise<void> {
        await page.fill(this.selector, this.text);
    }
}

export class Click implements Performable {
    private readonly selector: string;

    private constructor(selector: string) {
        this.selector = selector;
    }

    static on(selector: string): Click {
        return new Click(selector);
    }

    async performAs(page: Page): Promise<void> {
        await page.click(this.selector);
    }
}

export class Navigate implements Performable {
    private readonly url: string;

    private constructor(url: string) {
        this.url = url;
    }

    static to(url: string): Navigate {
        return new Navigate(url);
    }

    async performAs(page: Page): Promise<void> {
        await page.goto(this.url);
    }
}