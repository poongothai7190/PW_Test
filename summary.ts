import fs from "fs";
import path from "path";

console.log("🚀 summary.ts started");

// Absolute path (important for Jenkins)
const summaryPath = path.join(
  process.cwd(),
  "allure-report",
  "widgets",
  "summary.json",
);
const outputFile = path.join(process.cwd(), "summary.txt");

console.log("Looking for:", summaryPath);

try {
  if (!fs.existsSync(summaryPath)) {
    console.error("❌ summary.json NOT FOUND!");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(summaryPath, "utf8"));

  // ✅ Correct structure
  const total = data.statistic.total;
  const passed = data.statistic.passed;
  const failed = data.statistic.failed;
  const skipped = data.statistic.skipped;

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
