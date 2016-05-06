var output = [];
var variables = {};
var varIndex = 0;

function getVariable(id) {
  return variables[id];
}

function setVariable(id, val, attr) {
  if (typeof variables[id] === 'undefined') {
    variables[id] = {
      value: undefined,
      scope: 'local'
    };
  }

  // Set value
  variables[id].value = val;

  // Set any other values
  if (typeof attr === 'object') {
    for (var key in attr) {
      variables[id][key] = attr[key];
    }
  }

  // If it's a global variable, output it
  if (variables[id].scope === 'global') {
    addLine('<<#' + id + '=' + variables[id].value.compile() + '>>');
  }
}

function addLine(line) {
  output.push(line);
}

// To avoid nesting, create a temporary variable
function createVariable(definition) {
  var index = varIndex++;
  setVariable('VARL' + index, definition, {scope: 'global'})

  return { compile: function() { return '#VARL' + index; } };
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
