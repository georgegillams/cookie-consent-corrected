/* eslint-disable no-console */

const fs = require('fs');
const { execSync } = require('child_process');
const TRANSPILED_POSTFIX = '_TRANSPILED';
const blacklistedIdStatements_TWO = ['var Props = exports.Props'];
const blacklistedIdStatements_THREE = [
  'if (!Props(props)) {',
  'instanceof ComponentType)) {',
  'instanceof Props)) {',
  'instanceof Node)) {',
  'instanceof window)) {',
];
const blacklistedIdStatements_RETURN_TRUE = [
  `return input != null && input.children instanceof Node && typeof input.alternate === 'boolean' && (input.className == null || typeof input.className === 'string');`,
];

const removeBlacklistedIfStatements = srcPath => {
  const data = fs.readFileSync(srcPath, 'utf8');
  let res = '';
  let lineExcludeCount = 0;
  let lineNumber = 0;

  data.split('\n').forEach(ln => {
    lineNumber += 1;
    blacklistedIdStatements_RETURN_TRUE.forEach(bt => {
      if (ln.includes(bt)) {
        lineExcludeCount = 1;
        res += `return true;\n`;
      }
    });
    blacklistedIdStatements_THREE.forEach(bt => {
      if (ln.includes(bt)) {
        lineExcludeCount = 3;
      }
    });
    if (lineExcludeCount === 0) {
      res += `${ln}\n`;
    } else {
      lineExcludeCount -= 1;
      console.log(`removing line ${lineNumber} ${ln}`);
    }
  });
  fs.writeFileSync(srcPath, res);
};

const transpileDirToSelf = dir => {
  console.log(`working on ${dir}`);
  if (!fs.existsSync(`${dir}${TRANSPILED_POSTFIX}`)) {
    console.log(`NEEDS TRANSPILING`);
    if (fs.existsSync(`./${dir}/stories.js`)) {
      execSync(`rm ./${dir}/stories.js`);
    }
    execSync(
      `npx babel-cli --plugins transform-flow-strip-types ${dir} --out-dir ${dir}${TRANSPILED_POSTFIX}`,
    );
    let transpiledSrcFiles = execSync(
      `find . -path "./${dir}${TRANSPILED_POSTFIX}/*.js"`,
    )
      .toString()
      .split('\n');
    transpiledSrcFiles = transpiledSrcFiles.filter(sf => sf !== '');
    transpiledSrcFiles.forEach(sf => {
      removeBlacklistedIfStatements(sf);
    });
    execSync(`cp -R ${dir}${TRANSPILED_POSTFIX}/* ${dir}/`);
  }
};

console.log('Transpiling Backpack dependencies in node_modules...');
console.log('');

let directoriesToTranspile = execSync('ls -d node_modules/bpk-*')
  .toString()
  .split('\n');
directoriesToTranspile.push('node_modules/react-component-academic-reference');
directoriesToTranspile = directoriesToTranspile.filter(
  dir => dir !== '' && !dir.includes(TRANSPILED_POSTFIX),
);

directoriesToTranspile.forEach(dir => {
  transpileDirToSelf(dir);
});

console.log('All done.  👍');
console.log('');
