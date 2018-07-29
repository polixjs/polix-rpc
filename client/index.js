'use strict';

const MQTT = require('./protocol/mqtt');
const client = MQTT.create();

client.connect(function (err) {
  console.error(err);
});

client.send({age: 1, name: 'ricky'});