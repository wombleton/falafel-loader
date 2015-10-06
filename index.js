'use strict';

var falafel = require('falafel');

module.exports = function (source) {
  var fn = this.options && this.options.falafel || function () {};
  var output = falafel(source, fn);

  return output.toString();
};
