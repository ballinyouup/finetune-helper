import { expectedLlamaJSONL, expectedOpenAIJSONL, models } from "./data";
import { expect, type Page } from '@playwright/test';

export async function testCodeHighlighter(page: Page, model: typeof models.Llama | typeof models.OpenAI) {
    await page.getByLabel("view-code").click();
    const code = page.locator("code", {
        hasText: model === models.OpenAI ? expectedOpenAIJSONL[0].messages[0].content : expectedLlamaJSONL[0].prompt
    });
    expect(code).toHaveText(JSON.stringify(model === models.OpenAI ? expectedOpenAIJSONL[0] : expectedLlamaJSONL[0]));
    await page.getByLabel("view-table").click();
}
