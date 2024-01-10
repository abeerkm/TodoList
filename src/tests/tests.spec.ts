import { test, Page, expect, BrowserContext} from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { MainPage } from '../logic/mainPage';
import config from '../config.json'

test.describe('Filter and sort validation', () => {
    let browser: BrowserWrapper;
    let mainPage: MainPage;
    let taskName: string;

    test.beforeEach(async () => {
        browser=new BrowserWrapper();
        const page=await browser.getPage(config.mainUrl);
        mainPage=new MainPage(page);
        await mainPage.clickOnAddNewTaskButton();
        taskName='study';
        await mainPage.fillTaskName(taskName);
        await mainPage.clickOnAddTaskButton();
    })
    test.afterEach(async () => {
        await mainPage.markTaskAsComplete();
        await browser.closeBrowser();
      });

    test('Add new task', async () => {
        const isTaskAdded=await mainPage.checkIfTaskAdded(taskName);
        await expect(isTaskAdded).not.toBeNull();

    });

    test('Edit task', async () => {
        await mainPage.clickOnEditButton(taskName);
        const newTaskName='new task Name'
        await mainPage.changeTaskeName(newTaskName);
        const isTaskAdded=await mainPage.checkIfTaskAdded(newTaskName);
        await expect(isTaskAdded).not.toBeNull();
    });

});