const fs = require('fs');
const path = require('path');
const hb = require('handlebars');
const U = require('../util');

const templateFile = './jest.hbs';
const templateData = fs.readFileSync(path.resolve(__dirname, templateFile)).toString();
const tmpl = hb.compile(templateData);

exports.command = 'jest <target> [options]';

exports.describe = 'Scaffold jest configuration file';

exports.builder = yargs => yargs
  .option('name', {
    alias: 'n',
    default: 'jest.config.js',
  });

exports.handler = argv => {
  const target = path.resolve(argv.context, argv.target);

  if (!U.isDir(target)) {
    throw new Error(`Target path does not exist; ${target}`);
  }

  const targetFile = path.resolve(target, argv.name);

  const fileContents = tmpl();
  fs.writeFileSync(targetFile, fileContents);
};
