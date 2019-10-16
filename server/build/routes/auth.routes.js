"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/auth.controller');
router.route('/login')
    .post(AuthController.getToken);
module.exports = router;
