import * as assert from 'assert';
import clone from 'clone';

module.exports = function jsonld(exec, execmap) {
  const filters = {}  ;

  filters.context = (input, arg, next) => {
    assert.equal(typeof(arg), "object");

    const res = clone(input);
    const context = input['@context'] || {};
    console.log('context1:',context);

    for (let fieldName in arg) {
      console.log(` ${fieldName}`, arg[fieldName]);
      assert.ok(arg[fieldName].scheme, `${fieldName}'s context must have a scheme.`);
      context[fieldName] = {
        '@id': arg[fieldName].scheme
      }
      if (arg[fieldName].type) {
        context[fieldName]['@type'] = arg[fieldName].type;
      }
    }
    console.log('context2:',context);

    res['@context'] = context;
    console.log(res);
    return next(null, res);
  }

  return filters;
};
