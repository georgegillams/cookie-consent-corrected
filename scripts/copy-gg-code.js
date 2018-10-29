/* eslint-disable no-console */

const fs = require('fs');
const colors = require('colors');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Bringing in new code'.white);
console.log('');

const gitStatus = execSync('git status --porcelain').toString();
if (gitStatus !== '') {
  console.log(
    'ERROR: Working tree is not clean. At risk of overwriting changes if this script is executed now.'
      .red,
  );
  console.log('');
  process.exit(1);
}

execSync(
  'cp -R ../georgegillams.co.uk/api/* ./api && cp -R ../georgegillams.co.uk/src/routes.js ./src/routes.js && cp -R ../georgegillams.co.uk/src/components/* ./src/components && cp -R ../georgegillams.co.uk/src/utils/* ./src/utils/ && cp -R ../georgegillams.co.uk/src/containers/* ./src/containers/ && cp -R ../georgegillams.co.uk/src/redux/* ./src/redux && cp -R ../georgegillams.co.uk/scripts/* ./scripts',
);

console.log('All done.  👍');
console.log('');

let changedIndexFiles = execSync('git status')
  .toString()
  .split('\n')
  .filter(line => line.includes('index.js'))
  .filter(line => line.includes('modified: '));
changedIndexFiles = changedIndexFiles.map(
  line => line.split('\tmodified:   ')[1],
);

if (changedIndexFiles.length === 0) {
  process.exit(0);
}

console.log(
  'WARNING: Be aware that some index.js files may have been broken by this process.'
    .red,
);
console.log('');

rl.question(
  'Do you wish to revert all changed index files now? (Y/n)'.rainbow,
  answer => {
    if (answer === 'Y' || answer === 'Yes' || answer === 'yes') {
      changedIndexFiles.map(indexFilePath =>
        execSync(`git checkout origin/master ${indexFilePath}`),
      );
    } else {
      console.log(
        'To revert a broken index file, use git checkout origin/master <PROJECT_FILE_PATH>'
          .red,
      );
      console.log('');
    }
    rl.close();
  },
);
