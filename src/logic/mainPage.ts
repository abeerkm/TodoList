import { Locator, Page } from "playwright";
import { BasePage } from "../infra/basePage";
export class MainPage extends BasePage{
    private addNewTaskButton:Locator;
    private searchButton:Locator;
    constructor(page: Page) {
        super(page);
        this.initPage();
        this.addNewTaskButton=this.page.locator('//button[@class="plus_add_button"]');
        this.searchButton= this.page.locator('//a[@aria-label="Search"]')
    }

    clickOnAddNewTaskButton= async () => {
        await this.addNewTaskButton.click();
    }

    fillTaskName= async (input:string) => {
        const taskName= this.page.locator('//div[@aria-label="Task name"]');       
        await taskName.fill(input);
        }
    

    clickOnAddTaskButton= async () => {
        const addTaskButton= this.page.locator('//button[@aria-label="Add task"]');
        await addTaskButton.click();
    }

    checkIfTaskAdded= async (input:string) => {
        await this.page.waitForSelector(`//div[@class="task_content" and text()="${input}"]`);
        const task=await this.page.locator(`//div[@class="task_content" and text()="${input}"]`);
        return task;
    }

    markTaskAsComplete=async () => {
        await this.page.waitForSelector('//button[@aria-label="Mark task as complete"]')
        const markAsCompleteButton= this.page.locator('//button[@aria-label="Mark task as complete"]').last();
        await markAsCompleteButton.click();
        await this.page.waitForTimeout(2000);

    }

    clickOnEditButton= async (input:string) => {
        await this.page.waitForSelector(`//div[@class="task_content" and text()="${input}"]`);
        const task=await this.page.locator(`//div[@class="task_content" and text()="${input}"]`);
        await task.hover();
        const editButton=await this.page.locator('//button[@aria-label="Edit"]');
        await editButton.click();
    }
    changeTaskeName=async (input:string) => {
        this.fillTaskName(input);
        const saveButton= this.page.locator('//button[@data-testid="task-editor-submit-button"]');
        await saveButton.click();
    }

    searchForSpecificWord= async (command:string) => {
        await this.searchButton.click();
        const input= this.page.locator('//input[@placeholder="Search or type a command…"]');
        await input.type(command);
    }

    isValueFounded = async (command: string) => {
        const searchInputValue = await this.page.locator('mark').first();
        if (!searchInputValue)
            return false; 
        const textContent = await searchInputValue.textContent();
        return textContent ? textContent.includes(command) : false;
    }

   

   
}