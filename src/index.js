import 'babel-polyfill';
import * as assert from 'assert';
import clone from 'clone';
import debugFactory from 'debug';
import jsonld from 'jsonld';
const debug = debugFactory('jbj:jsonld');

module.exports = function jbjJsonld() {
  const filters = {}  ;

  /**
   * context action: add in '@context' key the scheme and type, using '@id' and '@type'
   *
   * @param  {Any}   input any JSON
   * @param  {Object}   arg   { 'scheme', 'type' }, where scheme is an URI
   * @param  {Function} next  next JBJ action
   */
  filters.context = (input, arg, next) => {
    assert.ok(arg, 'argument should not be null');
    assert.equal(typeof(arg), 'object', 'argument should be an object');

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

  /**
   * Generate a JSON-LD from an input containing a JSON-LD context, in various
   * modes.
   *
   * @param  {Object}   input a JSON object containing a valid context
   * @param  {String}   mode  'compacted', 'flattened', or 'expanded'
   * @param  {Function} next  next JBJ action
   */
  filters.jsonld = (input, mode, next) => {
    assert.ok(input, 'The input of "jsonld" should not be null');
    assert.equal(typeof(input), 'object', 'The input of "jsonld" should be an object');
    assert.ok(input['@context'], 'The input of "jsonld" action should contain a @context');

    const res = clone(input);

    // Remove non-terminal properties from JSON-LD
    const allowedFields = [...Object.keys(input['@context']), '@context'];
    for (let fieldName in input) {
      if (!allowedFields.includes(fieldName)) {
        Reflect.deleteProperty(res, fieldName);
      }
    }

    // Generate the JSON-LD according to the mode
    switch (mode) {
      case 'expanded':
        jsonld.expand(res, (err, expanded) => {
          if (err) {
            return next(err);
          }
          return next(null, expanded);
        });
        break;
      case 'compacted': {
        const context = res['@context'];
        jsonld.compact(res, context, (err, compacted) => {
          if (err) {
            return next(err);
          }
          return next(null, compacted);
        });
        break;
      }
      case 'flattened': {
        jsonld.flatten(res, (err, flattened) => {
          if (err) {
            return next(err);
          }
          return next(null, flattened);
        });
        break;
      }
      default:
        debug('default resJsonld', res);
        return next(null, res);
    }
  };

  return filters;
};
