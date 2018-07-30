'use strict';

const pRPC = require('..');
const path = require('path');
const kiritoProto = './protocol/test.kirito';
const proto = pRPC.load(path.join(__dirname, kiritoProto));
const client =  new pRPC.Client({host: 'localhost', port: 10003}, proto.testService);

client.ping({age: 1, name: 'zhoumq'}, function (err, result) {
  if (err) {
    return console.error(err.message);
  }
  console.log(result);
});

client.ping({age: 23, name: 'ricky 泽阳'}, function (err, result) {
  if (err) {
    throw new Error(err.message);
  }
  console.log(result);
});