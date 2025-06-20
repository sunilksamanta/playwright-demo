import { test, expect } from '@playwright/test';

test.describe('Playwright Demo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Playwright Demo App');
  });

  test.describe('Counter functionality', () => {
    test('should increment counter when button is clicked', async ({ page }) => {
      const counterButton = page.getByTestId('counter-button');
      
      // Initial state
      await expect(counterButton).toHaveText('Count: 0');
      
      // Click button multiple times
      await counterButton.click();
      await expect(counterButton).toHaveText('Count: 1');
      
      await counterButton.click();
      await counterButton.click();
      await expect(counterButton).toHaveText('Count: 3');
    });
  });

  test.describe('Name form functionality', () => {
    test('should display greeting when name is entered', async ({ page }) => {
      const nameInput = page.getByTestId('name-input');
      
      // Type name
      await nameInput.fill('John Doe');
      
      // Check greeting appears
      const greeting = page.getByTestId('greeting');
      await expect(greeting).toHaveText('Hello, John Doe!');
    });

    test('should update greeting when name changes', async ({ page }) => {
      const nameInput = page.getByTestId('name-input');
      
      await nameInput.fill('Alice');
      await expect(page.getByTestId('greeting')).toHaveText('Hello, Alice!');
      
      await nameInput.fill('Bob');
      await expect(page.getByTestId('greeting')).toHaveText('Hello, Bob!');
    });
  });

  test.describe('Todo list functionality', () => {
    test('should add new todo item', async ({ page }) => {
      const todoInput = page.getByTestId('todo-input');
      const addButton = page.getByTestId('add-todo-button');
      const todoList = page.getByTestId('todo-list');
      
      // Add first todo
      await todoInput.fill('Buy groceries');
      await addButton.click();
      
      // Check todo appears in list
      await expect(todoList.locator('li')).toHaveCount(1);
      await expect(todoList.locator('li').first()).toContainText('Buy groceries');
      
      // Input should be cleared
      await expect(todoInput).toHaveValue('');
    });

    test('should add multiple todos', async ({ page }) => {
      const todoInput = page.getByTestId('todo-input');
      const addButton = page.getByTestId('add-todo-button');
      const todoList = page.getByTestId('todo-list');
      
      // Add multiple todos
      const todos = ['Task 1', 'Task 2', 'Task 3'];
      
      for (const todo of todos) {
        await todoInput.fill(todo);
        await addButton.click();
      }
      
      // Check all todos are present
      await expect(todoList.locator('li')).toHaveCount(3);
      
      for (let i = 0; i < todos.length; i++) {
        await expect(todoList.locator('li').nth(i)).toContainText(todos[i]);
      }
    });

    test('should add todo using Enter key', async ({ page }) => {
      const todoInput = page.getByTestId('todo-input');
      const todoList = page.getByTestId('todo-list');
      
      await todoInput.fill('Press Enter Todo');
      await todoInput.press('Enter');
      
      await expect(todoList.locator('li')).toHaveCount(1);
      await expect(todoList.locator('li').first()).toContainText('Press Enter Todo');
    });

    test('should toggle todo completion', async ({ page }) => {
      // Add a todo first
      const todoInput = page.getByTestId('todo-input');
      const addButton = page.getByTestId('add-todo-button');
      
      await todoInput.fill('Complete this task');
      await addButton.click();
      
      const todoItem = page.locator('.todo-item').first();
      const todoText = todoItem.locator('span').first();
      
      // Initially not completed
      await expect(todoItem).not.toHaveClass(/completed/);
      
      // Click to complete
      await todoText.click();
      await expect(todoItem).toHaveClass(/completed/);
      
      // Click again to uncomplete
      await todoText.click();
      await expect(todoItem).not.toHaveClass(/completed/);
    });

    test('should delete todo item', async ({ page }) => {
      // Add a todo first
      const todoInput = page.getByTestId('todo-input');
      const addButton = page.getByTestId('add-todo-button');
      const todoList = page.getByTestId('todo-list');
      
      await todoInput.fill('Delete me');
      await addButton.click();
      
      await expect(todoList.locator('li')).toHaveCount(1);
      
      // Delete the todo
      const deleteButton = page.locator('.delete-button').first();
      await deleteButton.click();
      
      await expect(todoList.locator('li')).toHaveCount(0);
    });

    test('should display todo count correctly', async ({ page }) => {
      const todoInput = page.getByTestId('todo-input');
      const addButton = page.getByTestId('add-todo-button');
      const todoCount = page.getByTestId('todo-count');
      
      // Add todos
      await todoInput.fill('Todo 1');
      await addButton.click();
      await todoInput.fill('Todo 2');
      await addButton.click();
      
      // Check count
      await expect(todoCount).toContainText('Total todos: 2');
      await expect(todoCount).toContainText('Completed: 0');
      
      // Complete one todo
      const firstTodo = page.locator('.todo-item span').first();
      await firstTodo.click();
      
      await expect(todoCount).toContainText('Total todos: 2');
      await expect(todoCount).toContainText('Completed: 1');
    });
  });

  test.describe('Visual regression tests', () => {
    test('should match page screenshot', async ({ page }) => {
      // Add some content for consistent screenshot
      await page.getByTestId('name-input').fill('Test User');
      await page.getByTestId('todo-input').fill('Sample Todo');
      await page.getByTestId('add-todo-button').click();
      await page.getByTestId('counter-button').click();
      
      // Take screenshot
      await expect(page).toHaveScreenshot('full-page.png');
    });
  });
});