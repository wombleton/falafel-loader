# falafel-loader
Loader to run falafel AST transforms.

## Installation

    npm i -D falafel-loader

## Usage

This example fixes an [IE angular bug](https://github.com/angular/angular.js/issues/8659#issuecomment-60176967).

Add it into the pipeline for a js file & add falafel config:

    modules: {
      falafel: function (node) {
        if (node.type === 'FunctionExpression' && node.id && node.id.name === 'interpolateFnWatchAction') {
          var expr = node && node.body && node.body.body && node.body.body[0];

          if (expr && expr.source() === 'node[0].nodeValue = value;') {
            expr.update('if (!node[0].nodeValue) { return; } ' + expr.source());
          }
        }
      },
      ...
      loaders: [
        ...
          {
            test: /angular\.js$/,
            loader: 'falafel-loader'
          }
        ...
      ]
      ...
    }

This will rewrite the `interpolateFnWatchAction` with the necessary null check. You can implement any falafel function that you want, however.

## TODO

* Allow multiple falafel pipelines.
