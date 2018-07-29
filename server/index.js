'use strict';

const MQTT = require('./protocol/mqtt');
const server = MQTT.create();

server.listen(10003);