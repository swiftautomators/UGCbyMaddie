import { test, expect } from '@playwright/test';

test('should submit the intake form successfully', async ({ page }) => {
    await page.goto('/');

    // Scroll to form
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill the form
    await page.fill('input[id="name"]', 'Test User');
    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="brandName"]', 'Test Brand URL');
    await page.selectOption('select[id="budget"]', '$3000-$5000');

    // Select strategy (radio buttons implemented as buttons in my refactor)
    await page.click('button:has-text("Paid Ads")');

    await page.fill('textarea[id="message"]', 'This is a test submission from Playwright.');

    // Submit
    await page.click('button:has-text("Send Application")');

    // Verify success message
    await expect(page.locator('h2:has-text("Application Received!")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('p:has-text("Thanks for reaching out!")')).toBeVisible();
});
