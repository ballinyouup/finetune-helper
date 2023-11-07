import { expectedLlamaJSONL, expectedOpenAIJSONL, models } from "./data";
import { expect, type Page } from '@playwright/test';

export async function testCodeHighlighter(page: Page, model: typeof models.OpenAI) {
    await page.getByLabel("view-code").click();
    await page.getByLabel("format-openai").click();
    let code = page.locator("code", {
        hasText: expectedOpenAIJSONL[0].messages[0].content
    });
    expect(code).toHaveText(JSON.stringify(expectedOpenAIJSONL[0]));
    await page.getByLabel("copy").click();
    let copied = await page.evaluate(() => {
        return navigator.clipboard.readText();
    });
    expect(copied).toEqual(JSON.stringify(expectedOpenAIJSONL[0]));
    await page.getByLabel("format-llama").click();
    code = page.locator("code", {
        hasText: expectedLlamaJSONL[0].text
    });
    expect(code).toHaveText(JSON.stringify(expectedLlamaJSONL[0]));
    await page.getByLabel("copied").click();
    await page.getByLabel("copy").click();
    copied = await page.evaluate(() => {
        return navigator.clipboard.readText();
    });
    expect(copied).toEqual(JSON.stringify(expectedLlamaJSONL[0]));
    await page.getByLabel("view-table").click();
}
