const fs = require('fs');
const Parser = require('./src/Parser.js');

fs.readFile('input.lua', 'utf8', function(err, data) {
  if (err) throw err;
  const parser = new Parser(data);
  console.log(parser.getSRLText());
});