import { Locator, Page } from "playwright";
export class Login{
    private page: Page;
    private email:Locator;
    private password:Locator;
    private loginButton:Locator;

    constructor(page: Page) {
        this.page = page;
        this.email=this.page.locator('//input[@placeholder="Enter your email..."]');
        this.password=this.page.locator('//input[@placeholder="Enter your password..."]')
        this.loginButton=this.page.locator('//button[./span[text()="Log in"]]');
    }

    fillEmail= async (input:string) => {
        await this.email.fill(input);
    }

    fillPassword= async (input:string) => {
        await this.password.fill(input);
    }

    clickOnLoginButton= async () => {
        await this.loginButton.click();
    }

    fullLoginProcess= async (email:string,password:string) => {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickOnLoginButton();
    }
}