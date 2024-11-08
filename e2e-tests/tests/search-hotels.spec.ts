import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

// before each test will sign in
test.beforeEach(async ({ page }) => {
	await page.goto(UI_URL);

	// get the sign in button
	await page.getByRole("link", { name: "Sign In" }).click();

	// checking if we got redirected to sign in page
	await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

	await page.locator("[name=email]").fill("test@test.com");
	await page.locator("[name=password]").fill("123456");

	await page.getByRole("button", { name: "Login" }).click();

	await expect(page.getByText("Login Successful")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
	await page.goto(UI_URL);

	await page.getByPlaceholder("Where are you going?").fill("Dublin");
	await page.getByRole("button", {name: "Search"}).click()

	await expect(page.getByText("Hotels Found In Dublin")).toBeVisible()
	await expect(page.getByText("Dublin Getaways")).toBeVisible()
});

test("should show hotel detail", async ({page}) => {
	await page.goto(UI_URL)

	await page.getByPlaceholder("Where are you going?").fill("Dublin");
	await page.getByRole("button", {name: "Search"}).click()

	await page.getByText("Dublin Getaways").click()
	await expect(page).toHaveURL(/detail/)
	await expect(page.getByRole("button", {name: "Book now"})).toBeVisible()

	
})