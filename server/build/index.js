"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');
var AuthService = require('./services/auth.service');
var host = '127.0.0.1';
var port = 3000;
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(AuthService.checkToken);
app.use('/api', routes);
app.listen(port, host, function () { return console.log("Example app listening  http://" + host + ":" + port); });
