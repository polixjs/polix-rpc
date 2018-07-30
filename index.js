'use strict';

const kirito = require('./parse/kirito');
const Server = require('./server');
const Client = require('./client');

exports = module.exports = {
  Server,
  Client
};

exports.load = function (path) {
  const k = new kirito();
  return k.load(path);
};