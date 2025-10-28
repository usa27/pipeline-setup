import { test, expect } from '@playwright/test';
import { Homepage } from '../../page_objects/home.page.js';
import { LoginPage } from '../../page_objects/login.page.js';
import { DashboardPage } from '../../page_objects/dashboard.page.js'

test("Login with existing account", async ({ page }) => {
  const homepage = new Homepage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await page.goto('/');
  await homepage.loginButton.click();
  await loginPage.login();

  await expect(dashboardPage.fullUsersName).toHaveText('Jim Carrey');
  await expect(dashboardPage.userRole).toHaveText('role: admin');
})