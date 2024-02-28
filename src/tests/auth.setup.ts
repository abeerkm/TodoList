// auth.setup.ts
import { expect, test as setup } from '@playwright/test';
import { Login } from '../logic/login';
import config from '../config.json';
import user from '../user.json'
const authFile = 'playwright/.auth/user.json';

setup('authenticate @login', async ({ page,context }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(config.loginUrl);
    const login=new Login(page);
    await login.fullLoginProcess(user.username,user.password);
    await page.waitForURL('https://app.todoist.com/app/today');
    await page.context().storageState({ path: authFile });
    page.close();
    await context.tracing.stop({ path: 'trace.zip' });

});