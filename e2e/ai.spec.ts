import { test, expect } from '@playwright/test';

test('should generate AI strategy', async ({ page }) => {
    await page.goto('/');

    // Scroll to AI section
    await page.locator('#ai').scrollIntoViewIfNeeded();

    const input = page.locator('input[id="product-input"]');
    await input.fill('Electric Spin Scrubber');

    const generateBtn = page.locator('button:has-text("Generate")');
    await generateBtn.click();

    // Wait for results
    // Note: if API key is missing, it should still show the fallback
    await expect(page.locator('text=Winning Hook')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Direct Angle')).toBeVisible();
});
