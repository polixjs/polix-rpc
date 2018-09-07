# polix-rpc
rpc plugin for polix

[![Travis](https://img.shields.io/travis/polixjs/polix-rpc.svg?style=for-the-badge)](https://travis-ci.org/polixjs/polix-rpc)

## Architecture diagram
[![polix-rpc](https://raw.githubusercontent.com/rickyes/rickyes.github.io/master/image/mqt_rpc.jpg)](https://raw.githubusercontent.com/rickyes/rickyes.github.io/master/image/mqt_rpc.jpg)

## Get Start

#### Kirito File
``` shell
# test

service testService {
  method ping (reqMsg, resMsg)
}

struct reqMsg {
  @1 age = Int16;
  @2 name = Text;
}

struct resMsg {
  @1 age = Int16;
  @2 name = Text;
}
```

#### Server
``` js
'use strict';

const pRPC = require('polix-rpc');
const path = require('path');
const kiritoProto = './protocol/test.kirito';
const server = new pRPC.Server();
const proto = pRPC.load(path.join(__dirname, kiritoProto));

function test(call, cb) {
  cb(null, {age: call.age, name: call.name});
}

server.addKiritoService(proto.testService, {ping: test});

server.listen(10003);
```

#### Client
``` js
'use strict';

const pRPC = require('polix-rpc');
const path = require('path');
const kiritoProto = './protocol/test.kirito';
const proto = pRPC.load(path.join(__dirname, kiritoProto));
const client =  new pRPC.Client({host: 'localhost', port: 10003}, proto.testService);

client.ping({age: 23, name: 'Ricky 泽阳'}, function (err, result) {
  if (err) {
    throw new Error(err.message);
  }
  console.log(result);
});
```
