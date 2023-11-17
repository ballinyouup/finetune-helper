import { expect, type Page } from '@playwright/test';

export async function testAddButton(page: Page) {
	await page.getByLabel("dialog-add").click();
	await expect(page.getByLabel("dialog-content")).toBeHidden();
}