function Concatenator(left, right) {
  this.left = left;
  this.right = right;
}

Concatenator.prototype.compile = function() {
  return this.left.compile() + this.right.compile();
}

module.exports = Concatenator;
