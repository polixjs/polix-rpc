'use strict';

const test = require('ava');
const path = require('path');
const Kirito = require('../parse/kirito');
const kiritoProto = '../example/protocol/test.kirito';

const k = new Kirito();

test('kirito # parse', t => {
  k.load(path.join(__dirname, kiritoProto));
  t.pass();
});