const fs = require('fs');

const results = JSON.parse(
  fs.readFileSync('test-results.json', 'utf8')
);

let total = 0;
let passed = 0;
let failed = 0;
let flaky = 0;

results.suites.forEach(suite => {
  suite.specs.forEach(spec => {
    spec.tests.forEach(test => {
      total++;
      if (test.status === 'passed') passed++;
      if (test.status === 'failed') failed++;
      if (test.status === 'flaky') flaky++;
    });
  });
});

console.log(`TOTAL=${total}`);
console.log(`PASSED=${passed}`);
console.log(`FAILED=${failed}`);
console.log(`FLAKY=${flaky}`);

fs.writeFileSync(
  'summary.txt',
  `Total Tests: ${total}
Passed: ${passed}
Failed: ${failed}
Flaky: ${flaky}`
);