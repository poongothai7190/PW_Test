console.log("Reading JSON from:", jsonPath);
console.log("File exists?", fs.existsSync(jsonPath));

const fs = require("fs");
const path = require("path");

// Path to your playwright JSON report
const jsonPath = path.join(__dirname, "playwright-report.json");
// Path to summary file
const summaryPath = path.join(__dirname, "test-summary.txt");

// Read JSON
const report = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

let total = 0;
let passed = 0;
let failed = 0;
let skipped = 0;

// Helper: process tests array
function processTests(tests) {
  if (!tests) return;
  tests.forEach((test) => {
    if (!test.results) return;
    total += test.results.length;
    test.results.forEach((result) => {
      switch (result.status) {
        case "passed":
          passed++;
          break;
        case "failed":
          failed++;
          break;
        case "skipped":
          skipped++;
          break;
      }
    });
  });
}

// Helper: process specs array
function processSpecs(specs) {
  if (!specs) return;
  specs.forEach((spec) => {
    processTests(spec.tests);
  });
}

// Helper: process suites recursively
function processSuites(suites) {
  if (!suites) return;
  suites.forEach((suite) => {
    processSpecs(suite.specs);
    if (suite.suites && suite.suites.length > 0) {
      processSuites(suite.suites);
    }
  });
}

// Start processing from top-level suites
processSuites(report.suites || []);

// Write summary
const content = `
TOTAL: ${total}
PASSED: ${passed}
FAILED: ${failed}
SKIPPED: ${skipped}
`.trim();

fs.writeFileSync(summaryPath, content);
console.log("Test summary generated at", summaryPath);
console.log(content);
