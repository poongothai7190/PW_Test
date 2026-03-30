// generate-summary.ts
import * as fs from "fs";
import * as path from "path";

interface AllureResult {
  status?: string;
  [key: string]: any;
}

// Path to your Allure results folder
const resultsDir = path.join(__dirname, "allure-results");

// Read all JSON files in the results folder
const files = fs
  .readdirSync(resultsDir)
  .filter((file) => file.endsWith(".json"));

let total = 0;
let passed = 0;
let failed = 0;
const failedTests: string[] = [];

files.forEach((file) => {
  const data: AllureResult = JSON.parse(
    fs.readFileSync(path.join(resultsDir, file), "utf8"),
  );

  if (data.status) {
    total += 1;
    if (data.status === "passed") passed += 1;
    if (data.status === "failed") {
      failed += 1;
      if (data.name) failedTests.push(data.name);
    }
  }
});

const summary = `Total: ${total}
Passed: ${passed}
Failed: ${failed}
${failedTests.length ? "Failed Tests: " + failedTests.join(", ") : ""}`;

// Write summary to a file
fs.writeFileSync(path.join(__dirname, "summary.txt"), summary);

console.log(summary);
