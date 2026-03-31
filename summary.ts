import fs from "fs";
import path from "path";

// Updated path to your summary.json
const summaryPath = path.join(
  __dirname,
  "allure-report",
  "widgets",
  "summary.json",
);
const outputFile = path.join(__dirname, "summary.txt");

try {
  const data = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
  const { total, passed, failed, skipped } = data.statistic;

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
