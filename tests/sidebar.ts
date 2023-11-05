import { expect, type Page } from '@playwright/test';

export async function testSidebar(page: Page) {
    await page.getByLabel("add-document").click();
    await page.getByLabel("Edit").click();
    await page.getByLabel("Name").fill("Untitled-1");
    await page.getByLabel("Save").click();
    expect(page.getByLabel("Untitled-1")).toHaveText("Untitled-1");
    await page.getByLabel("Delete").click();
    expect(await page.getByLabel("Untitled-1").waitFor({ state: "detached" })).toBeUndefined();
}