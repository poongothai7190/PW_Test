const fs = require("fs");

const data = JSON.parse(fs.readFileSync("playwright-report.json", "utf-8"));

let total = 0;
let passed = 0;
let failed = 0;
let skipped = 0;

function countTests(suites) {
  suites.forEach((suite) => {
    if (suite.tests) {
      suite.tests.forEach((test) => {
        total++;
        const result = test.results[0];

        if (result.status === "passed") passed++;
        else if (result.status === "failed") failed++;
        else if (result.status === "skipped") skipped++;
      });
    }
    if (suite.suites) {
      countTests(suite.suites);
    }
  });
}

countTests(data.suites);

// Write output to file (for Jenkins email)
const summary = `
TOTAL: ${total}
PASSED: ${passed}
FAILED: ${failed}
SKIPPED: ${skipped}
`;

fs.writeFileSync("test-summary.txt", summary);

console.log(summary);
