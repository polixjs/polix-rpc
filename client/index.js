'use strict';

const protocol = require('./protocol.js');
const connect = Symbol.for('connect');
const uuid = require('uuid/v1');

class Client {

  constructor(opts, service) {
    this.client = void(0);
    this[connect](opts, service);
    this.callQueues = {};
  }

  [connect] (opts, service) {
    this.client = protocol.create(opts);
    this.client.connect((err) => {
      if (err) {
        throw new Error(err);
      }
    });
    const self = this;

    this.client.on('data', function (result) {
      const fn = self.callQueues[result.msgId];
      if (result.error) {
        return fn.call(fn, result.error, null);
      }
      fn.call(fn, null, result.body);
    });
    const serviceKeys = Object.getOwnPropertyNames(service);
    serviceKeys.some(method => {
      self[method] = function () {
        const reqMsg = arguments[0];
        const fn = arguments[1];
        const paramKey = Object.getOwnPropertyNames(service[method].param);
        paramKey.some((param) => {
          if (reqMsg[param] === null) {
            throw new Error(`Parameters '${param}' are missing`);
          }
          // todo 类型判断及转换
        });
        const msgId = uuid();
        self.callQueues[msgId] = fn;
        self.client.send({method, msgId, body: reqMsg});
      };
    });
  }

}

module.exports = Client;