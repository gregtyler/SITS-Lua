var output = [];
var variables = {};
var varIndex = 0;

function getVariable(id) {
  return variables[id];
}

function setVariable(id, val) {
  variables[id] = val;
}

function addLine(line) {
  output.push(line);
}

// To avoid nesting, create a temporary variable
function createVariable(definition) {
  var index = varIndex++;
  addLine('<<#VAR' + index + '=' + definition.compile() + '>>');
  return { compile: function() { return '#VAR' + index; } };
}

function getSRLText() {
  return output.join('\n');
}

function reset() {
  output = [];
  variables = {};
  varIndex = 0;
}

module.exports = {
  addLine: addLine,
  createVariable: createVariable,
  getSRLText: getSRLText,
  getVariable: getVariable,
  setVariable: setVariable,
  reset: reset
};
