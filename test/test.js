'use strict';
var assert = require('assert');
var JBJ = require('jbj');
var examples = require('./examples.json');

JBJ.use(require('../src/'));

describe('JSON-LD', function () {
  Object.keys(examples).forEach(function (example) {
    if (example.slice(0,4) === 'skip') { return; }
    it(example, function (done) {
      var input      = examples[example].input;
      var stylesheet = examples[example].stylesheet;
      var expected   = examples[example].expected;
      JBJ.render(stylesheet, input, function (err, output) {
        if (err) {
          console.error(err);
          done(err);
        }
        assert.deepEqual(output, expected);
        done(err);
      });
    });
  });
});
