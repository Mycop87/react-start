export {}
const express        = require('express');
const router         = express.Router();
const AuthController = require('../controllers/auth.controller');


router.route('/login')
      .post(AuthController.getToken)

module.exports = router;
