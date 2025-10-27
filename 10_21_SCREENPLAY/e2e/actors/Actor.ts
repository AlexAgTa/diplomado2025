import type { Page } from 'playwright';
import type { Performable } from '../interactions/Performable.js';

/**
 * Represents an actor who can perform tasks and answer questions
 */
export class Actor {
    private readonly name: string;
    private readonly page: Page;

    constructor(name: string, page: Page) {
        this.name = name;
        this.page = page;
    }

    /**
     * Creates a new Actor instance
     * @param name The name of the actor
     * @param page The Playwright page instance
     */
    static named(name: string, page: Page): Actor {
        return new Actor(name, page);
    }

    /**
     * Performs a series of tasks
     * @param tasks Array of tasks to perform
     */
    async attemptsTo(...tasks: Performable[]): Promise<void> {
        for (const task of tasks) {
            await task.performAs(this.page);
        }
    }

    /**
     * Gets the actor's page instance
     */
    getPage(): Page {
        return this.page;
    }
}