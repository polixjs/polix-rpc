'use strict';

const mqtt = require('./protocol/mqtt');

module.exports.create = function (opts = {}) {
  return mqtt.create(opts);
};