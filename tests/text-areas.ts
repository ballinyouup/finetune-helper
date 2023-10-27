import { expect, type Page } from '@playwright/test';
import type { Models } from './data';

export async function fillTextAreas(page: Page, model: Models) {
	for (const [textareaTestId, _, value] of model.textAreas) {
		await page.getByTestId(textareaTestId).fill(value);
	}
}

export async function checkTextAreas(page: Page, model: Models) {
	for (const [textareaTestId] of model.textAreas) {
		await expect(page.getByTestId(textareaTestId)).toBeVisible();
	}
}