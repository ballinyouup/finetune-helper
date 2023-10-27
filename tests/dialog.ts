import { expect, type Page } from '@playwright/test';

export async function testDialog(page: Page) {
	await openDialog(page);
	await closeDialog(page);
}

export async function openDialog(page: Page) {
	await page.getByTestId("dialog-trigger").click();
	await expect(page.getByTestId("dialog-content")).toBeVisible();
}

export async function closeDialog(page: Page) {
	await page.getByTestId("dialog-close").click();
	await expect(page.getByTestId("dialog-content")).toBeHidden();
	await openDialog(page);
	await page.getByTestId("dialog-cancel").click();
	await expect(page.getByTestId("dialog-content")).toBeHidden();
}