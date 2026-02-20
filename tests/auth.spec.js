import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('should allow a user to login', async ({ page }) => {
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

        // Mock the login API call
        await page.route('**/api/user/login', async route => {
            const json = {
                message: 'Welcome back',
                token: 'mock-token',
                user: { name: 'Test User' },
            };
            await route.fulfill({ json });
        });

        // Mock user profile call which happens after login - 401 initially so we see login page
        await page.route('**/api/user/me', async route => {
            await route.fulfill({ status: 401, json: { message: "Unauthorized" } });
        });

        // Mock initial course fetch
        await page.route('**/api/course/all', async route => {
            await route.fulfill({ json: { courses: [] } });
        });

        await page.route('**/api/mycourse', async route => {
            await route.fulfill({ json: { courses: [] } });
        });


        await page.goto('http://localhost:5173/login');

        await page.getByLabel(/Email Address/i).fill('test@example.com');
        await page.getByLabel(/Password/i).fill('password123');
        await page.getByRole('button', { name: /Sign In/i }).click();

        // Expect to be redirected to home or show success message
        // Adjust selector based on actual UI behavior (e.g., success toast or URL change)
        await expect(page.getByText('Welcome back')).toBeVisible();
        await expect(page).toHaveURL('http://localhost:5173/');
    });

    test('should show error on invalid credentials', async ({ page }) => {
        await page.route('**/api/user/login', async route => {
            await route.fulfill({
                status: 400,
                json: { message: 'Invalid credentials' }
            });
        });

        await page.goto('http://localhost:5173/login');

        await page.getByLabel(/Email Address/i).fill('wrong@example.com');
        await page.getByLabel(/Password/i).fill('wrongpass');
        await page.getByRole('button', { name: /Sign In/i }).click();

        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });
});
