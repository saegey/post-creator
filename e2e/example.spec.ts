import { test, expect } from "@playwright/test";

test("should navigate to the Register page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/login");
  // Find an element with the text 'About Page' and click on it
  await page.click("text=Create an account");
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL("http://localhost:3000/register");
  // The new page should contain an h1 with "About Page"
  // await page.getByLabel("Password").isVisible;
  await expect(page).toHaveTitle("Register");
});

test("should Register page should contain", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/register");
	await expect(page).toHaveTitle("Register");
  // The new page should contain an h1 with "About Page"
  await page.getByLabel("Password").isVisible;
  await expect(page).toHaveTitle("Register");
});
