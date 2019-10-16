export {}
const express        = require('express');
const router         = express.Router();
const UserController = require('../controllers/user.controller');

router.route('/')
      .get(UserController.getUsers)
      .post(UserController.createUser)
      .put(UserController.updateUser)
      .delete(UserController.deleteUser);

module.exports = router;
