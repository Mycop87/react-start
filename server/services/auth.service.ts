export {};
const bcrypt          = require('bcrypt');
const DataBaseService = require('./data-base.service');
const Error           = require('../utils/error');
const saltRounds      = 10;

class AuthService {
  async checkToken (req: any, res: any, next: any) {
    const url = req.originalUrl;
    if (!url.includes('api/auth') && (url.includes('api/users') && req.method.toLowerCase() !=='post')) {
      if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        const error = Error.getEObject(403, 'invalid Token', 1000);
        return res.status(error.error.status).json(error);
      }
      const user = await DataBaseService.getDocument('users', { token: req.headers.authorization.substring(7)})
      if (!user) {
        const error = Error.getEObject(403, 'invalid Token', 1000);
        return res.status(error.error.status).json(error);
      }
      next();
      return;
    }
    next();
    return;
  }

  async getHash (password: string) {
    const result = await bcrypt.hash(password, saltRounds).then((hash: string) => {
      return hash;
    });
    if (!result) {
      return;
    }
    try {
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getUser (data: any) {
    const existUser = await DataBaseService.getDocument('users', { email: data.email });

    if (!existUser) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, existUser.password).then((res: boolean) => res);
    if (!isPasswordCorrect) {
      return null;
    }

    return existUser;
  }

  async setUserToken (email: string, token: string) {
    const result = await DataBaseService.updateDocument('users', { email: email }, { token: token });
    return result;
  }
}

module.exports = new AuthService();
