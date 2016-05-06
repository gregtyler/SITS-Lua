function Member(base, identifier) {
  this.identifier = identifier;
  this.base = base;
}

Member.prototype.compile = function() {
  var base = this.base;

  if (base.resolve() === 'Profile') {
    return base.compile(this.identifier.name);
  } else {
    return this.identifier.name + '.' + base.compile();
  }
}

module.exports = Member;
