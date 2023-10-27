import { expect, type Page } from '@playwright/test';
import type { Models } from './data';

export async function checkTableData(page: Page, model: Models) {
	for (const [_, tableHeader, content] of model.textAreas) {
		await expect(page.locator("th", {
			hasText: tableHeader
		})).toBeVisible();
		await expect(page.getByText(content)).toBeVisible();
	}
}

export async function resetTable(page: Page, model: Models) {
	await page.getByTestId(model.allChecked).click();
	await page.getByTestId("delete").click();
}
