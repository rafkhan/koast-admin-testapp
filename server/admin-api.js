/* global exports, require */

'use strict';

var q = require('q');
var koast = require('koast');
var express = require('express');

// Ideally these should come from a config file
var access = process.env.AWS_ACCESS;
var secret = process.env.AWS_SECRET;
var bucket = process.env.AWS_S3_BUCKET;

function setupS3() {
  //
  // Configure an S3 backup router
  //
  var collections = ['multi_a', 'multi_b'];
  var mongoUri = 'mongodb://localhost:27017/dumptestdb';
  var aws = {
    global: {
      accessKeyId: access,
      secretAccessKey: secret
    },

    s3: { bucket: bucket }
  };

  // Get the s3 router
  // TODO FIX THIS EXAMPLE
  // FIXME EXPORT getS3BackupRouter
  return koast.admin.getS3BackupRouter('/s3', collections, mongoUri, aws);
}


function configureApi(register) {

  var s3router = setupS3();
  register({
    router: s3router,
    type: 'backup',
    name: 'S3 Backup',
    mount: '/backup'
  });


  // make a promise and resolve it.
  return q.when();
}


var routerPromise = koast.admin.getRouter(configureApi);

var defaults = {};
defaults.authorization = function defaultAuthorization(req, res) {
  return true;
};


module.exports = {
  koastModule: {
    defaults: defaults,
    router: routerPromise
  }
};
