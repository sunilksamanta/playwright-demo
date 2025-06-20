import { test, expect } from '@playwright/test';

test.describe('Advanced Playwright Features Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should demonstrate network interception', async ({ page }) => {
    // Intercept and modify network requests (if your app made any)
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Mocked response' })
      });
    });
    
    // Your test continues here...
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should demonstrate waiting for elements', async ({ page }) => {
    const nameInput = page.getByTestId('name-input');
    
    // Wait for element to be visible
    await expect(nameInput).toBeVisible();
    
    // Wait for element to be enabled
    await expect(nameInput).toBeEnabled();
    
    // Fill and wait for greeting to appear
    await nameInput.fill('Playwright');
    await expect(page.getByTestId('greeting')).toHaveText('Hello, Playwright!');
  });

  test('should demonstrate mobile viewport', async ({ page, browserName }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test mobile-specific behavior
    await expect(page.locator('h1')).toBeVisible();
    
    // Take mobile screenshot
    await expect(page).toHaveScreenshot(`mobile-${browserName}.png`);
  });

  test('should demonstrate keyboard interactions', async ({ page }) => {
    const todoInput = page.getByTestId('todo-input');
    
    // Use keyboard shortcuts
    await todoInput.focus();
    await page.keyboard.type('Keyboard Todo');
    await page.keyboard.press('Enter');
    
    await expect(page.getByTestId('todo-list').locator('li')).toHaveCount(1);
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space'); // Should click the focused button
  });

  test('should demonstrate drag and drop (if applicable)', async ({ page }) => {
    // This is a placeholder - you'd implement drag/drop in your React app first
    await expect(page.locator('h1')).toBeVisible();
  });
});