function Passthru(operator, variable) {
  this.operator = operator;
  this.variable = variable;
}

Passthru.prototype.compile = function() {
  return this.variable.compile() + '&' + this.operator;
}

module.exports = Passthru;
