'use strict';

const {test} = require('ava');
const path = require('path');
const prpc = require('..');
const kiritoProto = '../example/protocol/test.kirito';
const server = prpc.server;
let service = void (0);

const ping = function (call, callback) {
  callback(null, {age: call.data.age, name: call.data.name});
};

test('rpc#server', (t) => {
  service = prpc.load(path.join(__dirname, kiritoProto));
  server.addKiritoService(service.testService, {ping});
  server.listen();
  t.pass();
});