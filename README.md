# falafel-loader
Loader to run [falafel](https://www.npmjs.com/package/falafel) AST transforms.

## Installation

    npm i -D falafel-loader

## Usage

This example fixes an [IE angular bug](https://github.com/angular/angular.js/issues/8659#issuecomment-60176967).

Add it into webpack2 rules:

```JavaScript
  ...
  module: {
    rules: [
      ...
        {
          test: /angular\.js$/,
          loader: 'falafel-loader',
          options: {
            fn: function (node) {
              if (node.type === 'FunctionExpression' && node.id && node.id.name === 'interpolateFnWatchAction') {
                var expr = node && node.body && node.body.body && node.body.body[0];

                if (expr && expr.source() === 'node[0].nodeValue = value;') {
                  expr.update('if (!node[0].nodeValue) { return; } ' + expr.source());
                }
              }
            },
            // All of the opts will be passed directly to acorn by falafel.
            opts: {
              allowImportExportEverywhere: true
            }
          }
        }
      ...
    ]
  }
  ...
```

This will rewrite the `interpolateFnWatchAction` with the necessary null check. You can implement any falafel function that you want, however.

## Webpack 1

This loader works with webpack 2, for webpack 1, please use v0.0.3

## TODO

* Allow multiple falafel pipelines.
