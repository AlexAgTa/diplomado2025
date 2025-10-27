import { Page } from '@playwright/test';

/**
 * Interface that defines what can be performed by an Actor
 */
export interface Performable {
    performAs(page: Page): Promise<void>;
}