export {};
const crypto      = require('crypto');
const AuthService = require('../services/auth.service');
const tokenKey    = '1a2b-3c4d-5e6f-7g8h';

const loginError = {
  error: {
    status:  403,
    message: 'Invalid username or password',
  },
};

const somethingWrong = {
  error: {
    status:  400,
    message: 'Something wrong',
  },
};

class AuthController {
  async getToken (req: any, res: any) {
    const user = await AuthService.getUser(req.body);
    if (!user) {
      return res.status(loginError.error.status).json(loginError);
    }
    const userData = {
      password: user.password,
      email:    user.email,
    };
    let head       = Buffer.from(JSON.stringify({
      alg: 'HS256',
      typ: 'jwt',
    })).toString('base64');

    let body             = Buffer.from(JSON.stringify(userData)).toString('base64');
    let signature        = crypto.createHmac('SHA256', tokenKey).update(`${head}.${body}`).digest('base64');
    const token          = `${head}.${body}.${signature}`;
    const tokenIsUpDated = await AuthService.setUserToken(user.email, token);
    if (!tokenIsUpDated) {
      return res.status(somethingWrong.error.status).json(somethingWrong);
    }
    return res.status(200).json({
      token: token,
    });
  }
}

module.exports = new AuthController();
