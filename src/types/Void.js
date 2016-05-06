function Void(val) { this.val = val; }

Void.prototype.compile = function() {
  return this.val;
}

module.exports = Void;
