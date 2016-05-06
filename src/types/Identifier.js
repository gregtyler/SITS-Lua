const manager = require('../Manager');

function Identifier(identifier) {
  this.identifier = identifier;
}

Identifier.prototype.resolve = function() {
  if (typeof manager.getVariable(this.identifier) !== 'undefined') {
    return manager.getVariable(this.identifier).value.constructor.name;
  } else {
    return this.identifier;
  }
}

Identifier.prototype.compile = function(args) {
  if (typeof manager.getVariable(this.identifier) !== 'undefined') {
    var variable = manager.getVariable(this.identifier);
    if (variable.scope === 'global') {
      return '#' + this.identifier;
    } else {
      return variable.value.compile(args);
    }
  } else {
    return this.identifier;
  }
}

module.exports = Identifier;
