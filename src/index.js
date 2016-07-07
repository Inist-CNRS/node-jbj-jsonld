import * as assert from 'assert';
import clone from 'clone';
import debugFactory from 'debug';
const debug = debugFactory('jbj:jsonld');

module.exports = function jsonld() {
  const filters = {}  ;

  filters.context = (input, arg, next) => {
    assert.equal(typeof(arg), "object");

    const res = clone(input);
    const context = input['@context'] || {};
    debug('context1:',context);

    for (let fieldName in arg) {
      debug(` ${fieldName}`, arg[fieldName]);
      assert.ok(arg[fieldName].scheme, `${fieldName}'s context must have a scheme.`);
      context[fieldName] = {
        '@id': arg[fieldName].scheme
      }
      if (arg[fieldName].type) {
        context[fieldName]['@type'] = arg[fieldName].type;
      }
    }
    debug('context2:',context);

    res['@context'] = context;
    debug('res',res);
    return next(null, res);
  }

  return filters;
};
