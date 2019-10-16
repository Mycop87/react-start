"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');
router.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);
module.exports = router;
