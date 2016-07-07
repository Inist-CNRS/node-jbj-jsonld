import 'babel-polyfill';
import * as assert from 'assert';
import clone from 'clone';
import debugFactory from 'debug';
const debug = debugFactory('jbj:jsonld');

module.exports = function jsonld() {
  const filters = {}  ;

  /**
   * context action: add in '@context' key the scheme and type, using '@id' and '@type'
   *
   * @param  {Any}   input any JSON
   * @param  {Object}   arg   { 'scheme', 'type' }, where scheme is an URI
   * @param  {Function} next  next JBJ action
   */
  filters.context = (input, arg, next) => {
    assert.equal(typeof(arg), 'object');

    const res = clone(input);
    const context = input['@context'] || {};
    debug('context1:',context);

    for (let fieldName in arg) {
      debug(` ${fieldName}`, arg[fieldName]);
      assert.ok(arg[fieldName].scheme, `${fieldName}'s context must have a scheme.`);
      context[fieldName] = {
        '@id': arg[fieldName].scheme
      };
      if (arg[fieldName].type) {
        context[fieldName]['@type'] = arg[fieldName].type;
      }
    }
    debug('context2:',context);

    res['@context'] = context;
    debug('resContext',res);
    return next(null, res);
  };

  filters.jsonld = (input, arg, next) => {
    assert.equal(typeof(input), 'object');
    assert.ok(input['@context'], 'The input of "context" action should contain a @context');

    const res = clone(input);

    const allowedFields = [...Object.keys(input['@context']), '@context'];
    debug('allowedFields', allowedFields);
    debug('isArray allowedFields', Array.isArray(allowedFields));
    debug('allowedFields.includes', allowedFields.includes);
    for (let fieldName in input) {
      if (!allowedFields.includes(fieldName)) {
        Reflect.deleteProperty(res, fieldName);
      }
    }

    debug('resJsonld', res);
    return next(null, res);
  };

  return filters;
};
