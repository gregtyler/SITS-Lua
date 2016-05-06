const luaparse = require('luaparse');
const Concatenator = require('./types/Concatenator');
const Identifier = require('./types/Identifier');
const Member = require('./types/Member');
const Passthru = require('./types/Passthru');
const Profile = require('./types/Profile');
const Table = require('./types/Table');
const Void = require('./types/Void');
const manager = require('./Manager');

function Parser(lua) {
  'use strict';

  manager.reset();

  function handleStatement(statement) {
    if (statement.type === 'CallStatement') {
      if (statement.expression.base.name === 'print') {
        var arg = statement.expression.arguments[0];
        var statement = handleStatement(arg);

        manager.addLine('<<' + statement.compile() + '>>');
      }
    } else if (statement.type === 'MemberExpression') {
      return new Member(handleStatement(statement.base), statement.identifier);
    } else if (statement.type === 'LocalStatement') {
      var name = statement.variables[0].name;
      manager.setVariable(name, handleStatement(statement.init[0]));
    } else if (statement.type === 'AssignmentStatement') {
      var name = statement.variables[0].name;
      manager.setVariable(name, handleStatement(statement.init[0]), {scope: 'global'});
    } else if (statement.type === 'BinaryExpression') {
      if (statement.operator === '..') {
        return new Concatenator(handleStatement(statement.left), handleStatement(statement.right));
      }
    } else if (statement.type === 'CallExpression') {
      if (statement.base.name === 'W' || statement.base.name === 'V' || statement.base.name === 'U') {
        return new Passthru(statement.base.name, handleStatement(statement.arguments[0]));
      } else if (statement.base.name === 'PROFILE') {
        var args = statement.arguments.map(handleStatement);
        return new Profile(args);
      } else if (statement.base.name === 'G') {
        var args = statement.arguments.map(handleStatement);
        var field = args.pop();
        var profile = new Profile(args);
        profile.bind(field);
        return profile;
      }
    } else if (statement.type === 'Identifier') {
      return new Identifier(statement.name);
    } else if (statement.type === 'StringLiteral') {
      return new Void(statement.value);
    } else if (statement.type === 'TableConstructorExpression') {
      return new Table(statement.fields, handleStatement);
    } else {
      throw new Error('I don\'t know what to do with a ' + statement.type);
    }
  }

  const ast = luaparse.parse(lua);
  for (var i = 0, l = ast.body.length; i < l; i++) {
    handleStatement(ast.body[i]);
  }

  return {
    getSRLText: manager.getSRLText
  };
}

module.exports = Parser;
