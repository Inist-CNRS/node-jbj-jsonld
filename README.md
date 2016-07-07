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

<a id="context"</a>
### context: { field: {scheme, type} }

Add a context in the result.

> **Warning:** the context is required to use the [jsonld](#jsonld) action.

Example 1: generate a valid JSON-LD `@context`.
```json
{
    "input": {
    },
    "stylesheet": {
        "context": {
            "title": {
                "scheme": "http://purl.org/dc/terms/title",
                "type": "https://www.w3.org/TR/xmlschema-2/#string"
            }
        }
    },
    "expected": {
        "@context": {
            "title": {
                "@id": "http://purl.org/dc/terms/title",
                "@type": "https://www.w3.org/TR/xmlschema-2/#string"
            }
        }
    }
}
```

Example 2: Generate a compacted JSON-LD from input
```json
{
    "input": {
        "title": "An example of string value"
    },
    "stylesheet": {
        "context": {
            "title": {
                "scheme": "http://purl.org/dc/terms/title",
                "type": "https://www.w3.org/TR/xmlschema-2/#string"
            }
        },
        "jsonld": "compacted"
    },
    "expected": {
        "@context": {
            "title": {
                "@id": "http://purl.org/dc/terms/title",
                "@type": "https://www.w3.org/TR/xmlschema-2/#string"
            }
        },
        "title": "An example of string value"
    }
}
```

<a id="jsonld"></a>
### jsonld: mode

Generate a JSON-LD from an input containing a JSON-LD context (see
[context](#context)), in various modes:

- [compacted](http://json-ld.org/spec/latest/json-ld/#compacted-document-form) (default)
- [flattened](http://json-ld.org/spec/latest/json-ld/#flattened-document-form)
- [expanded](http://json-ld.org/spec/latest/json-ld/#expanded-document-form )

Example 1: Remove non-terminal properties from JSON-LD (here, the `field` part)
```json
{
    "input": {
        "field": "value"
    },
    "stylesheet": {
        "$title": {
            "get": "field",
            "capitalize": true
        },
        "context": {
            "title": {
                "scheme": "http://purl.org/dc/terms/title",
                "type": "https://www.w3.org/TR/xmlschema-2/#string"
            }
        },
        "jsonld": "compacted"
    },
    "expected": {
        "@context": {
            "title": {
                "@id": "http://purl.org/dc/terms/title",
                "@type": "https://www.w3.org/TR/xmlschema-2/#string"
            }
        },
        "title": "Value"
    }
}
```

Example 2: expanded JSON-LD
```json
{
    "input": {
        "@context": {
            "access": {
              "@id": "https://schema.org/isAccessibleForFree",
              "@type": "https://www.w3.org/TR/xmlschema-2/#boolean"
            }
        },
        "access": true
    },
    "stylesheet": {
        "jsonld": "expanded"
    },
    "expected": [
        {
            "https://schema.org/isAccessibleForFree": [
                {
                "@type": "https://www.w3.org/TR/xmlschema-2/#boolean",
                "@value": true
                }
            ]
        }
    ]
}
```

Example 3: flattened JSON-LD
```json
{
        "input": {
            "@context": {
                "access": {
                  "@id": "https://schema.org/isAccessibleForFree",
                  "@type": "https://www.w3.org/TR/xmlschema-2/#boolean"
                }
            },
            "access": true
        },
        "stylesheet": {
            "jsonld": "flattened"
        },
        "expected": [{
            "@id": "_:b0",
            "https://schema.org/isAccessibleForFree": [{
                "@type": "https://www.w3.org/TR/xmlschema-2/#boolean",
                "@value": true
            }]
        }]
    }
```

## Examples

See unit tests : https://github.com/Inist-CNRS/node-jbj-jsonld/tree/master/test


## Try it

http://Inist-CNRS.github.io/jbj-playground/

(don't forget to click on JSON-LD button -- when it will exist)

## License

[MIT](https://github.com/Inist-CNRS/node-jbj-jsonld/blob/master/LICENSE)

