const Parser = require('../src/Parser.js');
const test = require('tape');
const tapSpec = require('tap-spec');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

function parse(lua) {
  const parser = new Parser(lua);
  return parser.getSRLText();
}

test('Basic transpiling', function(t) {
  // Invalid syntax
  t.throws(parse.bind(this, 'STU.STU_NAME;'));
  // Output
  t.equal(parse('print(STU.STU_NAME);'), '<<STU_NAME.STU>>');
  // Title case
  t.equal(parse('print(W(STU.STU_NAME));'), '<<STU_NAME.STU&W>>');
  // Simple &G
  t.equal(parse('print(G("TTL", {TTL_CODE= STU.STU_TITL}, "TTL_NAME"));'), '<<TTL_CODE=<STU_TITL.STU>&GTTL_NAME.TTL>>');

  t.end();
});
