'use strict';

const pRPC = require('..');
const path = require('path');
const kiritoProto = './protocol/test.kirito';
const server = new pRPC.Server();
const proto = pRPC.load(path.join(__dirname, kiritoProto));

function test(call, cb) {
  cb(null, {age: cb.param.age, name: cb.param.name});
}

server.addKiritoService(proto.testService, {ping: test});

server.listen();