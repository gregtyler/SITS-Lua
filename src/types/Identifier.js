const manager = require('../Manager');

function Identifier(identifier) {
  this.identifier = identifier;
}

Identifier.prototype.resolve = function() {
  if (typeof manager.getVariable(this.identifier) !== 'undefined') {
    return manager.getVariable(this.identifier).constructor.name;
  } else {
    return this.identifier;
  }
}

Identifier.prototype.compile = function(args) {
  if (typeof manager.getVariable(this.identifier) !== 'undefined') {
    return manager.getVariable(this.identifier).compile(args);
  } else {
    return this.identifier;
  }
}

module.exports = Identifier;
