import { test, Page, expect, BrowserContext} from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { MainPage } from '../logic/mainPage';
import config from '../config.json'

test.describe('Filter and sort validation', () => {
    let browser: BrowserWrapper;
    let mainPage: MainPage;
    const taskName='study';

    test.beforeEach(async () => {
        browser=new BrowserWrapper();
        const page=await browser.getPage(config.mainUrl);
        mainPage=new MainPage(page);
        await mainPage.clickOnAddNewTaskButton();
        await mainPage.fillTaskName(taskName);
        await mainPage.clickOnAddTaskButton();
    })

    test('Add new task', async () => {
        const isTaskAdded=await mainPage.checkIfTaskAdded(taskName);
        expect(isTaskAdded).not.toBeNull();

    });

   

});