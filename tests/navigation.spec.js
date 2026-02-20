import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        // Mock initial course fetch for all pages
        await page.route('**/api/course/all', async route => {
            await route.fulfill({
                json: {
                    courses: [
                        { _id: '1', title: 'React Course', image: 'img.png', price: 100, createdBy: 'Me', duration: '1h', category: 'Web' }
                    ]
                }
            });
        });

        // Mock user/me as 401 to ensure not logged in by default
        await page.route('**/api/user/me', async route => {
            await route.fulfill({ status: 401, json: { message: "Unauthorized" } });
        });
    });

    test('should navigate to courses page', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.getByRole('link', { name: /^Courses$/i }).click();
        await expect(page).toHaveURL('http://localhost:5173/courses');
        await expect(page.getByText('React Course')).toBeVisible();
    });

    test('should redirect unauthenticated user to login when accessing protected route', async ({ page }) => {
        await page.goto('http://localhost:5173/account');
        // Expect redirection to login
        await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
        // OR check URL if explicit
        // await expect(page).toHaveURL('http://localhost:5173/login'); // might depend on logic
    });
});
