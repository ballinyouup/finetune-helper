import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { expect, test } from '@playwright/test';
import { openDialog, testDialog } from './dialog';
import { models, expectedOpenAICSV, expectedOpenAIJSONL, expectedLlamaCSV, expectedLlamaJSONL } from './data';
import { checkTextAreas, fillTextAreas } from './text-areas';
import { checkTableData } from './table';
import { testAddButton } from './button';

test("Exports - OpenAI", async ({ page }) => {
    // Visit Page/Test Dialog
    await page.goto('http://localhost:5173/documents');
    await testDialog(page);

    /** ------- OPENAI ----------*/
    // Add Item
    await openDialog(page);
    await checkTextAreas(page, models.OpenAI);
    await fillTextAreas(page, models.OpenAI);
    await testAddButton(page);
    await checkTableData(page, models.OpenAI);
    await page.getByLabel("export", { exact: true }).click();
    await page.getByLabel("format-openai").click();
    /** ------- Test OPENAI CSV ----------*/
    const [downloadCSV] = await Promise.all([
        page.waitForEvent('download'),
        page.getByLabel("export-csv").click(),
    ]);
    const filePath = await downloadCSV.path();
    const records = parse(fs.readFileSync(filePath as string), {
        columns: true,
        skip_empty_lines: true
    });
    expect(records).toEqual(expectedOpenAICSV);
    await page.getByLabel("export", { exact: true }).click();
    /** ------- Test OPENAI JSON ----------*/
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByLabel("export-jsonl").click(),
    ]);
    const filePathJSONL = await download.path();
    const fileContent = fs.readFileSync(filePathJSONL as string, 'utf-8').trim();
    const recordsJSONL = fileContent.split('\n').map((line) => JSON.parse(line));
    expect(recordsJSONL).toEqual(expectedOpenAIJSONL);
    /** -------- Test LLama --------- */
    await page.getByLabel("export", { exact: true }).click();
    await page.getByLabel("format-llama").click();
    /** ------- Test LLAMA CSV ----------*/
    const [downloadLlamaCSV] = await Promise.all([
        page.waitForEvent('download'),
        page.getByLabel("export-csv").click(),
    ]);
    const filePathLlama = await downloadLlamaCSV.path();
    const recordsLlama = parse(fs.readFileSync(filePathLlama as string), {
        columns: true,
        skip_empty_lines: true
    });
    expect(recordsLlama).toEqual(expectedLlamaCSV);
    await page.getByLabel("export", { exact: true }).click();
    /** ------- Test LLAMA JSON ----------*/
    const [downloadLlama] = await Promise.all([
        page.waitForEvent('download'),
        page.getByLabel("export-jsonl").click(),
    ]);
    const filePathJSONLLlama = await downloadLlama.path();
    const fileContentLlama = fs.readFileSync(filePathJSONLLlama as string, 'utf-8').trim();
    const recordsJSONLLlama = fileContentLlama.split('\n').map((line) => JSON.parse(line));
    expect(recordsJSONLLlama).toEqual(expectedLlamaJSONL);
    await page.close();
});