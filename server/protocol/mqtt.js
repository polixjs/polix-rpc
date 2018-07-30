'use strict';

const net = require('net');
const debug = require('debug')('polix-rpc:mqtt');
const EventEmitter = require('events').EventEmitter;
const mqttCon = require('mqtt-connection');

class MQTT extends EventEmitter {

  constructor () {
    super();
    this.inited = false;
    this.events = {};
  }

  listen (port, cb) {
    if (this.inited) {
      cb && cb(new Error('already inited.', null));
      return;
    }
    const self = this;
    this.inited = true;
    this.server = new net.Server();
    this.port = port || 10003;
    this.server.listen(this.port);
    debug('MQTT Server is started for port: %d', this.port);

    this.server.on('error', (err) => {
      debug('rpc server is error: %j', err.stack);
      self.emit('error', err);
    });

    this.server.on('connection', (stream) => {
      const socket = mqttCon(stream);
      debug('=========== new connection ===========');

      socket.on('connect', () => {
        debug('connected');
        socket.connack({ returnCode: 0 });
      });

      socket.on('error', (err) => {
        debug('error : %j', err);
        socket.destroy();
      });

      socket.on('close', () => {
        debug('===========     close     ============');
        socket.destroy();
      });


      socket.on('disconnect', () => {
        debug('===========   disconnect   ============');
        socket.destroy();
      });

      socket.on('publish', (pkg) => {
        // socket.puback({ messageId: pkg.messageId });
        let content = pkg.payload.toString();
        debug(content);
        content = JSON.parse(content);
        socket.publish({
          topic: 'rpc',
          qos: 1,
          messageId: pkg.messageId,
          payload: JSON.stringify({msgId: content.msgId, body: {age: content.body.age + 1, name: 'hello ' + content.body.name}})
        });
      });
    });
  }

  addEvent (events) {
    const eventKeys = Object.getOwnPropertyNames(events);
    eventKeys.some(event => {
      this.events[event] = {
        cb: events[event].cb,
        param: events[event].param
      };
    });
  }

}

module.exports.create = function () {
  return new MQTT();
};