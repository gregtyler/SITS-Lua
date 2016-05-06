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
  t.equal(
    parse('print(G("TTL", {TTL_CODE= STU.STU_TITL}, "TTL_NAME"));'),
    '<<TTL_CODE=<STU_TITL.STU>&GTTL_NAME.TTL>>'
  );
  // Absorb local variables
  t.equal(
    parse('local TITLE = G("TTL", {TTL_CODE= STU.STU_TITL}, "TTL_NAME");print(TITLE);'),
    '<<TTL_CODE=<STU_TITL.STU>&GTTL_NAME.TTL>>'
  );
  // Don't absorb global variables
  t.equal(
    parse('TITLE = G("TTL", {TTL_CODE= STU.STU_TITL}, "TTL_NAME");print(TITLE);'),
    '<<#TITLE=TTL_CODE=<STU_TITL.STU>&GTTL_NAME.TTL>>\n<<#TITLE>>'
  );
  // Can't print profiles
  t.throws(parse.bind(this, 'print(PROFILE("GEN", {GEN_CODE= STU.STU_GEND}));'));
  // Handles profiles
  t.equal(
    parse('local GENDER = PROFILE("GEN", {GEN_CODE= STU.STU_GEND});print(GENDER.GEN_NAME);'),
    '<<GEN_CODE=<STU_GEND.STU>&GGEN_NAME.GEN>>'
  );
  // Profiles can be re-used
  t.equal(
    parse('local GENDER = PROFILE("GEN", {GEN_CODE= STU.STU_GEND});print(GENDER.GEN_NAME);print(GENDER.GEN_SNAM);'),
    '<<GEN_CODE=<STU_GEND.STU>&GGEN_NAME.GEN>>\n<<GEN_CODE=<STU_GEND.STU>&GGEN_SNAM.GEN>>'
  );
  // String concatenation
  t.equal(
    parse('print(STU.STU_CODE .. ": " .. STU.STU_NAME)'),
    '<<STU_CODE.STU>>: <<STU_NAME.STU>>'
  );

  t.end();
});
