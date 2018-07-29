TESTS     = $(shell find test -type f -name "*.test.js")
BIN_AVA   = ./node_modules/.bin/ava

install:
	@npm i --registry https://registry.npm.taobao.org
	
test:
	NODE_ENV=test $(BIN_AVA) --verbose $(TESTS);

server:
	DEBUG=polix-rpc:mqtt node ./server/index.js

client:
	DEBUG=polix-rpc:mqtt node ./client/index.js

.PHONY: install test server client