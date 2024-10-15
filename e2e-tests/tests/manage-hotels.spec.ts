import { test, expect } from "@playwright/test";
import path from "path";
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

test("should allow user to add a hotel", async ({ page }) => {
	await page.goto(`${UI_URL}/add-hotel`);

	// Filling in basic information about the hotel
	await page.locator('[name="name"]').fill("Test Hotel");
	await page.locator('[name="city"]').fill("Test City");
	await page.locator('[name="country"]').fill("Test Country");
	await page.locator('[name="description"]').fill("This is a test description");
	await page.locator('[name="pricePerNight"]').fill("100");
	await page.selectOption('select[name="starRating"]', "3");

	// Clicking on Hotel Type
	await page.getByText("Budget").click();

	// Clicking On Some Facilities
	await page.getByLabel("Free Wifi").check();
	await page.getByLabel("Parking").check();

	// Filling the number Of guests room can take
	await page.locator('[name="adultCount"]').fill("2");
	await page.locator('[name="childCount"]').fill("4");

	await page.setInputFiles('[name="imageFiles"]', [
		path.join(__dirname, "files", "1.jpg"),
		path.join(__dirname, "files", "1.jpg"),
	]);

	await page.getByRole("button", { name: "Save" }).click();

	await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });
});

test("should display hotels", async ({ page }) => {
	await page.goto(`${UI_URL}/my-hotels`);

	// checking if the hotel name is showing
	await expect(page.getByText("Dublin Getaways")).toBeVisible();

	// checking if the hotel description is showing
	await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();

	// checking other hotel details are showing
	await expect(page.getByText("Dublin, Ireland")).toBeVisible();
	await expect(page.getByText("All Inclusive")).toBeVisible();
	await expect(page.getByText("£119 per night")).toBeVisible();
	await expect(page.getByText("2 adults, 3 children")).toBeVisible();
	await expect(page.getByText("2 Star Rating")).toBeVisible();

	await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
	await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
	await page.goto(`${UI_URL}/my-hotels`);

	await page.getByRole("link", { name: "View Details" }).first().click();

	await page.waitForSelector('[name="name"]', { state: "attached" });
	await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways");
	await page.locator('[name="name"]').fill("Dublin Getaways Updated");
	await page.getByRole("button", { name: "Save" }).click();
	await expect(page.getByText("Hotel Saved!")).toBeVisible();

	await page.reload();

	await expect(page.locator('[name="name"]')).toHaveValue(
		"Dublin Getaways Updated"
	);
	await page.locator('[name="name"]').fill("Dublin Getaways");
	await page.getByRole("button", { name: "Save" }).click();
});
