import { test, expect} from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { MainPage } from '../logic/mainPage';
import config from '../config.json'

test('search for specific word', async () => {
    const browser=new BrowserWrapper();
    const page=await browser.getPage(config.mainUrl);
    const mainPage=new MainPage(page);
    await mainPage.searchForSpecificWord("General");
    expect(await mainPage.isValueFounded("General")).toBeTruthy();

});