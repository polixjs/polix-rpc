'use strict';

const test = require('ava');
const path = require('path');
const Kirito = require('../protocol/kirito');
const kiritoProto = './protocol/test.kirito';

const k = new Kirito();

test('Kirito#parse', t => {
  k.parse(path.join(__dirname, kiritoProto));
  t.pass();
});