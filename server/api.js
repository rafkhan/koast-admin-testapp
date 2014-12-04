/* global exports, require */

'use strict';

var koast = require('koast');
var express = require('express');

var defaults = {};
defaults.authorization = function defaultAuthorization(req, res) {
  return true;
};


var router = express.Router();
router.get('/asd', function(req, res) {
  res.send('fuk');
});


module.exports = {
  koastModule: {
    defaults: defaults,
    router: router
  }
};

