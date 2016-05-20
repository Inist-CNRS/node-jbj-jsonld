# JBJ JSON-LD module

[![bitHound Overall Score](https://www.bithound.io/github/Inist-CNRS/node-jbj-jsonld/badges/score.svg)](https://www.bithound.io/github/Inist-CNRS/node-jbj-jsonld)
[![Travis-CI](https://img.shields.io/travis/Inist-CNRS/node-jbj-jsonld.svg "Travis-CI")](https://travis-ci.org/Inist-CNRS/node-jbj-jsonld)
[![Code Coverage](https://img.shields.io/codecov/c/github/Inist-CNRS/node-jbj-jsonld.svg "Code Coverage")](https://codecov.io/github/Inist-CNRS/node-jbj-jsonld)

JBJ JSON-LD is a [JBJ](https://github.com/Inist-CNRS/node-jbj) module aiming to
facilitate the generation of [JSON-LD](http://json-ld.org/) from JSON.

It can also be used in combination with
[JBJ-RDFa](https://github.com/Inist-CNRS/node-jbj-rdfa).

## Contributors

  * [François Parmentier](https://github.com/parmentf)

## Installation

```bash
$ npm install jbj-jsonld
```

## Usage

This JBJ module cannot be used alone. JBJ has to be installed.

```js
var JBJ = require('jbj');
JBJ.use(require('jbj-jsonld'));
```

## Tests

Use [mocha](https://github.com/visionmedia/mocha) to run the tests.

```bash
$ npm install
$ npm test
```

## Actions

Once the module is declared as used for JBJ, you can use the following actions:

<a id="ldScheme"</a>
### ldScheme: [ field, uri ]

Associate an `URI` to the `field` given in parameter, and put it into a `@context` part of the object.

<a id="getJsonLdField"></a>
### getJsonLdField: URI | [URI, language]

Get the value of the field which URI is given in parameter, and declared in the
`@content` part of the JSON-LD.

```json
{
    "input": {
        "title": "A great title"
    },

    "stylesheet": {
        "ldScheme": [ "title", "http://purl.org/dc/terms/title" ]
    },

    "expected": {
        "@context": {
            "title": {
                "@id": "http://purl.org/dc/terms/title"
            }
        },
        "title": "A great title"
    }
}
```



## Examples

See unit tests : https://github.com/Inist-CNRS/node-jbj-jsonld/tree/master/test


## Try it

http://Inist-CNRS.github.io/jbj-playground/

(don't forget to click on JSON-LD button -- when it will exist)

## License

[MIT](https://github.com/Inist-CNRS/node-jbj-jsonld/blob/master/LICENSE)


