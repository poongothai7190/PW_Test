const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "playwright-report.json");
console.log("Looking for file at:", filePath);

try {
  const data = fs.readFileSync(filePath, "utf-8");
  console.log("File read successfully");

  const jsonData = JSON.parse(data);
  console.log("JSON parsed successfully");

  let total = 0,
    passed = 0,
    failed = 0,
    skipped = 0;

  if (jsonData.suites) {
    for (const suite of jsonData.suites) {
      if (suite.specs) {
        for (const spec of suite.specs) {
          if (spec.tests) {
            for (const test of spec.tests) {
              total++;
              const statuses = test.results?.map((r) => r.status) || [];
              let status = "skipped";
              if (statuses.includes("passed")) status = "passed";
              else if (statuses.includes("failed")) status = "failed";

              if (status === "passed") passed++;
              else if (status === "failed") failed++;
              else skipped++;
            }
          }
        }
      }
    }
  }

  console.log("✅ Test Summary:");
  console.log(`TOTAL: ${total}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log(`SKIPPED: ${skipped}`);
} catch (err) {
  console.error("Error reading or parsing JSON file:", err);
}
