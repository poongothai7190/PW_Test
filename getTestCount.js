const fs = require("fs");
const path = require("path");

// Point to your JSON file
const reportPath = path.join(__dirname, "playwright-report.json");

if (!fs.existsSync(reportPath)) {
  console.error("JSON report not found:", reportPath);
  process.exit(1);
}

// Read JSON
const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

// Playwright JSON has this structure: stats.expected, stats.unexpected, stats.skipped
const total =
  report.stats?.expected + report.stats?.unexpected + report.stats?.skipped;
const passed = report.stats?.expected || 0;
const failed = report.stats?.unexpected || 0;
const skipped = report.stats?.skipped || 0;

console.log(`TOTAL: ${total}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log(`SKIPPED: ${skipped}`);
