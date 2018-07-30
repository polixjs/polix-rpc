'use strict';

const {test} = require('ava');
const path = require('path');
const pRPC = require('..');
const kiritoProto = '../example/protocol/test.kirito';
const server = new pRPC.Server();

function ping(call, cb) {
  cb(null, {age: cb.param.age, name: cb.param.name});
}

test('rpc#server', (t) => {
  const proto = pRPC.load(path.join(__dirname, kiritoProto));
  server.addKiritoService(proto.testService, {ping});
  server.listen();
  t.pass();
});