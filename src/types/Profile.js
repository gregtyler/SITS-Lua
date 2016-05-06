const manager = require('../Manager');

function Profile(args) {
  this.fields = args[0];
  this.profile = args[1];
}

Profile.prototype.compile = function(field) {
  if (typeof field === 'undefined') {
    if (typeof this.value === 'undefined') {
      throw new Error('Profile needs field to call');
    } else {
      field = this.value
    }
  }

  var profile = [];
  for (var key in this.profile.pairs) {
    var value = this.profile.pairs[key];
    if (typeof value === 'object' && value.base.resolve() === 'Profile') {
      value = manager.createVariable(value);
    }

    profile.push(key + '=<' + value.compile() + '>');
  }

  return profile.join('·;') + '&G' + field.compile() + '.' + this.fields.compile();
}

Profile.prototype.bind = function(field) {
  this.value = field;
}

module.exports = Profile;
