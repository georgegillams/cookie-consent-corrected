/* eslint-disable no-console */

const fs = require('fs');
const colors = require('colors');
const readline = require('readline');
const { execSync } = require('child_process');

const GET_CLASS_NAME_REGEX = /(.*)getClassName\([`'"](.*)[`'"]\)(.*)/g;
const COMMENT_REGEX = /[\s]*\/\/.*/g;
const DEFAULT_IMPORT_REGEX = /import .* from [`'"](.*)[`'"];/g;
const HELPERS_IMPORT = /import .* from [`'"]((\.\.\/)+)src\/helpers(.*)[`'"];/g;
const IMPORT_PROP_TYPES = /import(.*)PropTypes(.*)from 'react';/g;

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

execSync('cp -R ../georgegillams.co.uk/src/components ./app/');
execSync('cp -R ../georgegillams.co.uk/src/helpers ./app/');
// execSync( 'cp -R ../georgegillams.co.uk/src/utils ./app/',);

console.log('Copying done.  👍');

const getComponentFiles = () => {
  let componentFiles = execSync('(cd app/components && find . -name "*.js*")')
    .toString()
    .split('\n');
  componentFiles = componentFiles.filter(file => file !== '');
  componentFiles = componentFiles.map(
    file => `./app/components${file.substr(1)}`,
  );
  return componentFiles;
};

getComponentFiles().map(file => {
  if (file.includes('.jsx')) {
    const newFile = `${file.split('.jsx')[0]}.js`;
    fs.renameSync(file, newFile, err => {
      if (err) throw err;
      console.log('renamed complete');
    });
  }
});

const removeScssHandling = file => {
  const data = fs.readFileSync(file, 'utf8');
  const res = data.split('\n').map(ln => {
    const helpersRegexResult = HELPERS_IMPORT.exec(ln);
    const classNameRegex = GET_CLASS_NAME_REGEX.exec(ln);
    const propTypesRegex = IMPORT_PROP_TYPES.exec(ln);
    if (ln.match(COMMENT_REGEX)) {
      // Do nothing
    } else if (ln.includes('pages.scss')) {
      ln = '';
    } else if (ln.includes('import STYLES from')) {
      const scssFile = ln.split("'")[1];
      ln = `import '${scssFile}';`;
    } else if (ln.includes("import { cssModules } from 'bpk-react-utils';")) {
      ln = '';
    } else if (ln.includes('const getClassName = cssModules(STYLES);')) {
      ln = '';
    } else if (ln.includes('const getClassName = className')) {
      ln = '';
    } else if (classNameRegex) {
      ln = `${classNameRegex[1]}"${classNameRegex[2]}"${classNameRegex[3]}`;
    } else if (propTypesRegex) {
      ln = `import ${propTypesRegex[1]}${
        propTypesRegex[2]
      }from 'react';\nimport PropTypes from 'prop-types'`;
    } else if (ln.includes('getClassName')) {
      ln = ln.split('getClassName').join('');
    } else if (helpersRegexResult) {
      console.log('line', ln);
      ln = `${helpersRegexResult[1]}helpers${helpersRegexResult[3]}`;
      console.log('line', ln);
      console.log('');
    } else if (ln.includes("from 'react-router';")) {
      ln = `${ln.split('from')[0]}from 'react-router-dom';`;
    }
    return ln;
  });
  fs.writeFileSync(file, res.join('\n'));
};

const updateIndexFile = file => {
  const data = fs.readFileSync(file, 'utf8');
  const res = data.split('\n').map(ln => {
    if (ln.match(DEFAULT_IMPORT_REGEX)) {
      const regexResult = DEFAULT_IMPORT_REGEX.exec(ln);
      if (regexResult) {
        ln = `export { default } from '${regexResult[1]}'`;
      }
    } else if (ln.includes('export default ')) {
      ln = '';
    }
    return ln;
  });
  fs.writeFileSync(file, res.join('\n'));
};

getComponentFiles().map(file => removeScssHandling(file));

console.log('SCSS Handling removed.  👍');

const indexFiles = getComponentFiles().filter(file =>
  file.includes('index.js'),
);

indexFiles.map(file => updateIndexFile(file));

console.log('index file default export updated.  👍');

console.log('');
process.exit(0);
