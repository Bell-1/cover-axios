var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../package.json').version;
const template = `export const version = '${version}'`
fs.writeFileSync(path.resolve(__dirname, '../packages/cover-axios/version.ts'), template);
