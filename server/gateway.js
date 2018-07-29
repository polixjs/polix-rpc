'use strict';

const EventEmitter = require('events').EventEmitter;

class Gateway extends EventEmitter {

  constructor () {
    super();
  }


  register () {
  }



}

module.exports.create = function () {
  return new Gateway();
};