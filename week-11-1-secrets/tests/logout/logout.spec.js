// import { test, expect } from "@playwright/test";
import { test } from '../../fixtures/fixtures.js';
import { expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/login.page.js";
import { DashboardPage } from "../../page_objects/dashboard.page.js";

test("Login out", async ({ authenticatedPage }) => {
  const loginPage = new LoginPage(authenticatedPage);
  const dashboardPage = new DashboardPage(authenticatedPage);

  await authenticatedPage.goto('/dashboard/user/profile');

  await expect(dashboardPage.fullUsersName).toHaveText("Jim Carrey");
  await expect(dashboardPage.userRole).toHaveText("role: admin");

  await dashboardPage.logout();

  await expect(loginPage.pageTitle).toHaveText("Sign in to Delek Homes");
});
