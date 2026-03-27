import { test } from "@playwright/test";

test("Sample test", async ({ page }) => {
  await page.goto("http://49.249.28.218:8098/");
  const title = await page.title();
  console.log(title);
});
