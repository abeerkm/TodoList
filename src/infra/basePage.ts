import { Locator, Page } from "playwright";
export class BasePage{
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async initPage(){
        await this.page.waitForLoadState()
    }

    
}