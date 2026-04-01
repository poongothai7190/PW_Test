const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "playwright-report.json");
const summaryPath = path.join(__dirname, "test-summary.txt");

const report = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

let total = 0;
let passed = 0;
let failed = 0;
let skipped = 0;

function processTests(tests) {
  if (!tests) return;
  total += tests.length;
  tests.forEach((test) => {
    test.results.forEach((result) => {
      if (result.status === "passed") passed++;
      else if (result.status === "failed") failed++;
      else if (result.status === "skipped") skipped++;
    });
  });
}

function processSpecs(specs) {
  if (!specs) return;
  specs.forEach((spec) => {
    processTests(spec.tests);
  });
}

function processSuites(suites) {
  if (!suites) return;
  suites.forEach((suite) => {
    processSpecs(suite.specs);
    if (suite.suites && suite.suites.length > 0) {
      processSuites(suite.suites);
    }
  });
}

// Start processing
processSuites(report.suites || []);

const content = `
TOTAL: ${total}
PASSED: ${passed}
FAILED: ${failed}
SKIPPED: ${skipped}
`;

fs.writeFileSync(summaryPath, content.trim());
console.log("Test summary generated at", summaryPath);
