'use strict';

const {test} = require('ava');
const path = require('path');
const pRPC = require('..');
const kiritoProto = '../example/protocol/test.kirito';
const server = new pRPC.Server();

function ping(call, cb) {
  cb(null, {age: call.age, name: call.name});
}

test('rpc # client request -> server response', (t) => {
  const proto = pRPC.load(path.join(__dirname, kiritoProto));
  server.addKiritoService(proto.testService, {ping});
  server.listen(10003);

  const client =  new pRPC.Client({host: 'localhost', port: 10003}, proto.testService);
  return new Promise((resolve, reject) => {
    client.ping({age: 23, name: 'ricky 泽阳'}, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  }).then(result => {
    t.is(23, result.age, 'age is not equal');
    t.is('ricky 泽阳', result.name, 'name is not equal');
  }).catch(err => {
    t.fail(err.message);
  });
});