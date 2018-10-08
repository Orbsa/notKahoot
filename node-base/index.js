#!/usr/bin/env nodejs
//var express = require('express');
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3450, 'localhost');
console.log('Server running at http://orbsa.net/3450/');
