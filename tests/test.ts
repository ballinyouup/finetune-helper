import { expect, test, type Page } from '@playwright/test';

const models = {
	GPT: {
		textAreas: [
			["textarea-system", "System", "Entering GPT system data"],
			["textarea-user", "User", "Entering GPT user data"],
			["textarea-assistant", "Assistant", "Entering GPT assistant data"]
		],
		allChecked: "checked-all-gpt"
	}, Llama: {
		textAreas: [
			["textarea-prompt", "Prompt", "Entering Llama Prompt data"],
			["textarea-completion", "Completion", "Entering Llama Completion data"],
		],
		allChecked: "checked-all-llama"
	},
};

type Models = typeof models.GPT;

async function testDialog(page: Page) {
	await openDialog(page);
	await closeDialog(page);
}

async function openDialog(page: Page) {
	await page.getByTestId("dialog-trigger").click();
	await expect(page.getByTestId("dialog-content")).toBeVisible();
}

async function closeDialog(page: Page) {
	await page.getByTestId("dialog-close").click();
	await expect(page.getByTestId("dialog-content")).toBeHidden();
	await openDialog(page);
	await page.getByTestId("dialog-cancel").click();
	await expect(page.getByTestId("dialog-content")).toBeHidden();
}

async function testAddButton(page: Page) {
	await page.getByTestId("dialog-add").click();
	await expect(page.getByTestId("dialog-content")).toBeHidden();
}

async function fillTextAreas(page: Page, model: Models) {
	for (const [textareaTestId, _, value] of model.textAreas) {
		await page.getByTestId(textareaTestId).fill(value);
	}
}

async function checkTextAreas(page: Page, model: Models) {
	for (const [textareaTestId] of model.textAreas) {
		await expect(page.getByTestId(textareaTestId)).toBeVisible();
	}
}

async function checkTableData(page: Page, model: Models) {
	for (const [_, tableHeader, content] of model.textAreas) {
		await expect(page.locator("th", {
			hasText: tableHeader
		})).toBeVisible();
		await expect(page.getByText(content)).toBeVisible();
	}
}

async function resetTable(page: Page, model: Models) {
	await page.getByTestId(model.allChecked).click();
	await page.getByTestId("delete").click();
}

test('Add Item Dialog', async ({ page }) => {
	await page.goto('http://localhost:5173');
	await testDialog(page);
	// Test GPT
	await openDialog(page);
	await page.getByTestId("set-gpt").click();
	await checkTextAreas(page, models.GPT);
	await fillTextAreas(page, models.GPT);
	await testAddButton(page);
	await checkTableData(page, models.GPT);
	await resetTable(page, models.GPT);
	// Test Llama
	await openDialog(page);
	await page.getByTestId("set-llama").click();
	await checkTextAreas(page, models.Llama);
	await fillTextAreas(page, models.Llama);
	await testAddButton(page);
	await checkTableData(page, models.Llama);
	await resetTable(page, models.Llama);
	await page.close();
});

// test('Mobile - Add Item Dialog', async ({ page }) => {
// 	await page.goto('http://localhost:5173');
// 	await page.setViewportSize({ width: 390, height: 844 });
// 	await page.getByTestId("mobile-dialog-trigger").click();
// 	expect(page.getByTestId("mobile-dialog-content")).toBeVisible();
// 	await page.close();
// });