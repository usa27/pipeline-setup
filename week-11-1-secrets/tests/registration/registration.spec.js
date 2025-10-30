import { test, expect } from '@playwright/test';
import { Homepage } from '../../page_objects/home.page.js';
import { RegisterPage } from '../../page_objects/register.page.js';
import { DashboardPage } from '../../page_objects/dashboard.page.js';
import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName(); 
const lastName = faker.person.lastName(); 
const randomEmail = faker.internet.email(); 
const password = '12345'

test('Should register a new account', async({ page }, testInfo) => {
    const homePage = new Homepage(page);
    const registerPage = new RegisterPage(page);
    const dashboardPage = new DashboardPage(page);

    await page.goto(testInfo.project.use.env.baseUrl);

    await homePage.registerButton.click();

    await registerPage.register(firstName, lastName, randomEmail, password)

    await expect(dashboardPage.fullUsersName).toHaveText(`${firstName} ${lastName}`);
    await expect(dashboardPage.userRole).toHaveText('role: user')

})

test('Should not register without filling in the required fields', async({ page }, testInfo) => {
    const homePage = new Homepage(page);
    const registerPage = new RegisterPage(page);

    await page.goto(testInfo.project.use.env.baseUrl);
    await homePage.registerButton.click();
    await registerPage.registerButton.click();

    await expect(page.getByText('First name required')).toBeVisible();
    await expect(page.getByText('Last name required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();

})

test('Should not register with an already existing email account', async({ page }, testInfo) => {
    const homePage = new Homepage(page);
    const registerPage = new RegisterPage(page);

    await page.goto(testInfo.project.use.env.baseUrl);
    await homePage.registerButton.click();
    await registerPage.existingUser();

    await expect(registerPage.inputDataError).toHaveText('Input data validation failed');

})