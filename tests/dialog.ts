import { expect, type Page } from '@playwright/test';

export async function testDialog(page: Page) {
	await openDialog(page);
	await closeDialog(page);
}

export async function openDialog(page: Page) {
	await page.getByLabel("Add", {
		exact: true
	}).click();
	await expect(page.getByLabel("dialog-content")).toBeVisible();
}

export async function closeDialog(page: Page) {
	await page.getByLabel("close").click();
	await expect(page.getByLabel("dialog-content")).toBeHidden();
	await openDialog(page);
	await page.getByLabel("dialog-cancel").click();
	await expect(page.getByLabel("dialog-content")).toBeHidden();
}