"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var usersRoutes = require('./users.routes');
var authRoutes = require('./auth.routes');
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
module.exports = router;
