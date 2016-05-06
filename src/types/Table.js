function Table(pairs, handleStatement) {
  this.pairs = {};
  for (var i = 0, l = pairs.length; i < l; i++) {
    this.pairs[pairs[i].key.name] = handleStatement(pairs[i].value);
  }
}

module.exports = Table;