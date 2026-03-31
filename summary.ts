import fs from "fs";
import path from "path";

// Correct path
const summaryPath = path.join(
  __dirname,
  "allure-report",
  "widgets",
  "summary.json",
);
const outputFile = path.join(__dirname, "summary.txt");

try {
  const data = JSON.parse(fs.readFileSync(summaryPath, "utf8"));

  // Updated to match Allure widgets/summary.json structure
  const total = data.total || 0;
  const passed = data.passed || 0;
  const failed = data.failed || 0;
  const skipped = data.skipped || 0;

  const summary = `
Test Execution Summary

Total   : ${total}
Passed  : ${passed}
Failed  : ${failed}
Skipped : ${skipped}
`;

  fs.writeFileSync(outputFile, summary);
  console.log("✅ summary.txt created successfully");
} catch (error) {
  console.error("❌ Error generating summary:", error);
}
