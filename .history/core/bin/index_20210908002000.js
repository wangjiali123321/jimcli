#! /usr/bin/env node

require('../lib/core')();
const importLocal = require('import-local');

if (importLocal(__filename)) {
  require('npmlog').info('cli', '正在使用 imooc-cli 本地版本');
} else {
  require('../lib/core')(process.argv.slice(2));
}
