'use strict';

var falafel = require('falafel');

module.exports = function (source) {
  this.cacheable(false);
  var options = this.loaders[this.loaderIndex].options;
  var fn = options && options.fn || function () {};
  var opts = options && options.opts || {};
  var output = falafel(source, opts, fn);

  return output.toString();
};
