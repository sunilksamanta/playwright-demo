import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('counter-button').click();
  await page.getByTestId('counter-button').click();
  await page.getByTestId('name-input').click();
  await page.getByTestId('name-input').fill('Heloo');
  await page.getByTestId('todo-input').click();
  await page.getByTestId('todo-input').fill('Ncie');
  await page.getByTestId('add-todo-button').click();
});