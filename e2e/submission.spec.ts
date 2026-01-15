import { test, expect } from '@playwright/test';

test('should submit intake form successfully', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form
    await page.fill('input[id="name"]', 'Test User');
    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="brandName"]', 'www.testbrand.com');
    await page.selectOption('select[id="budget"]', '$3000-$5000');
    await page.click('button:has-text("Paid Ads")');
    await page.fill('textarea[id="message"]', 'Interested in paid ads strategy.');

    // Submit
    await page.click('button:has-text("Send Application")');

    // Verify success message
    await expect(page.locator('h2:has-text("Application Received!")')).toBeVisible({ timeout: 10000 });
});
