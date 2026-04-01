const fs = require("fs");
const path = require("path");

// Path to the JSON report
const jsonPath = path.join(__dirname, "playwright-report.json");
const summaryPath = path.join(__dirname, "test-summary.txt");

// Read JSON
const report = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

// Recursive function to count tests
function countTests(suites) {
  let total = 0,
    passed = 0,
    failed = 0,
    skipped = 0;

  for (const suite of suites) {
    if (suite.tests) {
      total += suite.tests.length;
      for (const test of suite.tests) {
        // Each test may have multiple results (e.g., retries)
        for (const result of test.results) {
          if (result.status === "passed") passed++;
          else if (result.status === "failed") failed++;
          else if (result.status === "skipped") skipped++;
        }
      }
    }
    // Count recursively for nested suites
    if (suite.suites && suite.suites.length > 0) {
      const nested = countTests(suite.suites);
      total += nested.total;
      passed += nested.passed;
      failed += nested.failed;
      skipped += nested.skipped;
    }
  }

  return { total, passed, failed, skipped };
}

// Compute counts
const counts = countTests(report.suites || []);

// Write summary to file
const content = `
TOTAL: ${counts.total}
PASSED: ${counts.passed}
FAILED: ${counts.failed}
SKIPPED: ${counts.skipped}
`;

fs.writeFileSync(summaryPath, content.trim());
console.log("Test summary generated at", summaryPath);
