function Manager() {
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

  function getSRLText(lua) {
    return output.join('\n');
  }

  return {
    addLine: addLine,
    createVariable: createVariable,
    getSRLText: getSRLText,
    getVariable: getVariable,
    setVariable: setVariable
  };
}

// Make it a singleton
Manager.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
Manager.getInstance = function() {
  if (!this.instance) {
    this.instance = new Manager();
  }

  return this.instance;
}

module.exports = Manager.getInstance();