import { test } from '@playwright/test';
import { openDialog, testDialog } from './dialog';
import { models } from './data';
import { checkTextAreas, fillTextAreas } from './text-areas';
import { checkTableData, resetTable } from './table';
import { testAddButton } from './button';

test.describe.configure({ mode: "parallel" });

test('Item Dialog - OpenAI', async ({ page }) => {
	// Visit Page/Test Dialog
	await page.goto('http://localhost:5173');
	await testDialog(page);

	// Add Item
	await openDialog(page);
	await page.getByTestId("set-openai").click();
	await checkTextAreas(page, models.OpenAI);
	await fillTextAreas(page, models.OpenAI);
	await testAddButton(page);

	// Check/Reset Table
	await checkTableData(page, models.OpenAI);
	await resetTable(page, models.OpenAI);

	// Visit Page doc 1/Test Dialog
	await page.goto('http://localhost:5173/?doc=1');

	// Add Item
	await openDialog(page);
	await page.getByTestId("set-openai").click();
	await checkTextAreas(page, models.OpenAI);
	await fillTextAreas(page, models.OpenAI);
	await testAddButton(page);

	// Check/Reset Table
	await checkTableData(page, models.OpenAI);
	await resetTable(page, models.OpenAI);
	await page.close();
});

test('Item Dialog - Llama', async ({ page }) => {
	// Visit Page/Test Dialog
	await page.goto('http://localhost:5173');
	await testDialog(page);

	// Add Item
	await openDialog(page);
	await page.getByTestId("set-llama").click();
	await checkTextAreas(page, models.Llama);
	await fillTextAreas(page, models.Llama);
	await testAddButton(page);

	// Check/Reset Table
	await checkTableData(page, models.Llama);
	await resetTable(page, models.Llama);

	// Visit Page/Test Dialog
	await page.goto('http://localhost:5173/?doc=1');
	await testDialog(page);

	// Add Item
	await openDialog(page);
	await page.getByTestId("set-llama").click();
	await checkTextAreas(page, models.Llama);
	await fillTextAreas(page, models.Llama);
	await testAddButton(page);

	// Check/Reset Table
	await checkTableData(page, models.Llama);
	await resetTable(page, models.Llama);
	await page.close();
});


