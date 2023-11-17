import { expect, type Page } from '@playwright/test';

export async function testSidebar(page: Page) {
    await page.getByLabel("add-document").click();
    await page.getByLabel("Edit").click();
    await page.getByLabel("Name").fill("Untitled-1");
    await page.getByLabel("Save").click();
    await expect(page.getByLabel("Untitled-1")).toHaveText("Untitled-1");
    await page.getByLabel("delete-dialog-trigger").click();
    await expect(page.getByLabel("delete-dialog-content")).toBeVisible();
    await page.getByLabel("delete-document").click();
    expect(await page.getByLabel("Untitled-1").waitFor({ state: "detached" })).toBeUndefined();
}