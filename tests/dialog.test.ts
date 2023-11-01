import { test } from '@playwright/test';
import { openDialog, testDialog } from './dialog';
import { models } from './data';
import { checkTextAreas, fillTextAreas } from './text-areas';
import { checkTableData, resetTable } from './table';
import { testAddButton } from './button';
import { testSidebar } from './sidebar';
import { testCodeHighlighter } from './code-highlighter';

test('Item Dialogs', async ({ page }) => {
	// Visit Page/Test Dialog
	await page.goto('http://localhost:5173');
	await testDialog(page);
	await testSidebar(page);

	// <------- OpenAI -------->
	await openDialog(page);
	await page.getByTestId("set-openai").click();
	await checkTextAreas(page, models.OpenAI);
	await fillTextAreas(page, models.OpenAI);
	await testAddButton(page);

	// Check/Reset Table
	await checkTableData(page, models.OpenAI);
	await testCodeHighlighter(page, models.OpenAI);
	await resetTable(page, models.OpenAI);

	// <------- Llama -------->
	await openDialog(page);
	await page.getByTestId("set-llama").click();
	await checkTextAreas(page, models.Llama);
	await fillTextAreas(page, models.Llama);
	await testAddButton(page);

	// Check/Reset Table
	await checkTableData(page, models.Llama);
	await testCodeHighlighter(page, models.Llama);
	await resetTable(page, models.Llama);

	await page.close();
});


