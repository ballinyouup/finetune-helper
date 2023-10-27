import { expect, type Page } from '@playwright/test';

export async function testAddButton(page: Page) {
	await page.getByTestId("dialog-add").click();
	await expect(page.getByTestId("dialog-content")).toBeHidden();
}