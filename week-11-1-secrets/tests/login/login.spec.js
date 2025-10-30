import { test, expect } from '@playwright/test';
import { Homepage } from '../../page_objects/home.page.js';
import { LoginPage } from '../../page_objects/login.page.js';
import { DashboardPage } from '../../page_objects/dashboard.page.js';

test("Login with existing account", async ({ page }, testInfo) => {
  const homepage = new Homepage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const email = testInfo.project.use.env.adminEmail;
  const password = testInfo.project.use.env.adminPassword;

  await page.goto(testInfo.project.use.env.baseUrl);
  await homepage.loginButton.click();
  await loginPage.login(email, password);

  await expect(dashboardPage.fullUsersName).toHaveText('Jim Carrey');
  await expect(dashboardPage.userRole).toHaveText('role: admin');
})