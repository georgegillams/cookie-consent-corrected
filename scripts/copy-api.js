/* eslint-disable no-console */

const fs = require('fs');
const colors = require('colors');
const readline = require('readline');
const { execSync } = require('child_process');

const GET_CLASS_NAME_REGEX = /(.*)getClassName\([`'"](.*)[`'"]\)(.*)/g;
const COMMENT_REGEX = /[\s]*\/\/.*/g;
const DEFAULT_IMPORT_REGEX = /import .* from [`'"](.*)[`'"];/g;
const HELPERS_IMPORT = /(.*) from [`'"](.*)src\/helpers(.*)[`'"];/g;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Bringing in new code'.white);
console.log('');

const cleanOnly = !process.argv.includes('--working-tree-unclean');
const gitStatus = execSync('git status --porcelain').toString();
if (gitStatus !== '' && cleanOnly) {
  console.log(
    'ERROR: Working tree is not clean. At risk of overwriting changes if this script is executed now.'
      .red,
  );
  console.log('');
  process.exit(1);
}

execSync('cp -R ../georgegillams.co.uk/api/ ./server/api');
execSync('cp ../georgegillams.co.uk/src/config.js ./config/app-config.js');

const getApiFiles = () => {
  let apiFiles = execSync('(cd server/api && find . -name "*.js*")')
    .toString()
    .split('\n');
  apiFiles = apiFiles.filter(file => file !== '');
  apiFiles = apiFiles.map(file => `./server/api${file.substr(1)}`);
  return apiFiles;
};

const fixApiFunction = () => {
  let removeRest = false;
  const data = fs.readFileSync('./server/api/api.js', 'utf8');
  const res = data.split('\n').map(ln => {
    if (ln.includes("import config from '../src/config';")) {
      ln = '';
    }
    if (ln.includes('app.use((req, res) => {')) {
      ln = 'const appFunc = (req, res) => {';
    }
    if (ln === '});') {
      ln = '};';
    }
    if (ln.includes('const bufferSize = 100;')) {
      ln = `const hookUp = (app) => {
 app.use('/api', appFunc);
}

export default hookUp;
`;
      removeRest = true;
    } else if (removeRest) {
      ln = '';
    }
    return ln;
  });
  fs.writeFileSync('./server/api/api.js', res.join('\n'));
};

const fixImports = file => {
  const data = fs.readFileSync(file, 'utf8');
  const res = data.split('\n').map(ln => {
    const regexResult = HELPERS_IMPORT.exec(ln);
    if (regexResult) {
      ln = `${regexResult[1]} from 'helpers${regexResult[3]}';`;
    }
    return ln;
  });
  fs.writeFileSync(file, res.join('\n'));
};

fixApiFunction();

getApiFiles().map(file => fixImports(file));

console.log('Copying done.  👍');
console.log('');
process.exit(0);
