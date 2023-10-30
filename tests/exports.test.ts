import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { expect, test } from '@playwright/test';
import { openDialog, testDialog } from './dialog';
import { models } from './data';
import { checkTextAreas, fillTextAreas } from './text-areas';
import { checkTableData } from './table';
import { testAddButton } from './button';

const expectedCSV = [{
    system: "Entering OpenAI system data",
    user: "Entering OpenAI user data",
    assistant: "Entering OpenAI assistant data",
}];

const expectedJSONL = [{
    messages: [
        {
            role: "system",
            content: "Entering OpenAI system data",
        },
        {
            role: "user",
            content: "Entering OpenAI user data",
        },
        {
            role: "assistant",
            content: "Entering OpenAI assistant data",
        },
    ],
}];

test("Exports", async ({ page }) => {
    // Visit Page/Test Dialog
    await page.goto('http://localhost:5173');
    await testDialog(page);
    // Add Item
    await openDialog(page);
    await page.getByTestId("set-openai").click();
    await checkTextAreas(page, models.OpenAI);
    await fillTextAreas(page, models.OpenAI);
    await testAddButton(page);
    await checkTableData(page, models.OpenAI);

    /** ------- Test CSV ----------*/
    const [downloadCSV] = await Promise.all([
        page.waitForEvent('download'),
        page.getByTestId("export-csv").click(),
    ]);
    const filePath = await downloadCSV.path();
    const records = parse(fs.readFileSync(filePath as string), {
        columns: true,
        skip_empty_lines: true
    });
    expect(records).toEqual(expectedCSV);

    /** ------- Test JSON ----------*/
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByTestId("export-jsonl").click(),
    ]);
    const filePathJSONL = await download.path();
    const fileContent = fs.readFileSync(filePathJSONL as string, 'utf-8').trim();
    const recordsJSONL = fileContent.split('\n').map((line) => JSON.parse(line));
    expect(recordsJSONL).toEqual(expectedJSONL);
    await page.close();
});