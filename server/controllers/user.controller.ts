export {};
const UserService = require('../services/user.service');
const Error = require('../utils/error');
const ObjectID = require('mongodb').ObjectID;

class UsersController {
  async getUsers (req:any, res:any) {
    let result;
    if (req.query.id) {
        const user = await  UserService.getUserById(req.query.id);
        if(user){
          return  res.status(200).send(user);
        }else{
          return res.status(404).send({ message: 'User not found.' });
        }
    }
    result = await UserService.getUsers();
    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(500)
                .send({ message: 'Unable create user.' });
    }
  }

  async createUser (req:any, res:any) {
    if (req.body) {
      const result = await UserService.createUser(req.body);
      if (!result.error){
        return res.status(200).send(result);
      } else {
        return res.status(result.error.status).send({ message: result.error.message });
      }
    }
  }

  async updateUser (req:any, res:any) {
    const searchCriteria = {_id: ObjectID(req.body.id)}
    const existUser =  await UserService.getUser(searchCriteria);
    if(!existUser){
      const error =  Error.getEObject(400, 'user does not exist')
      return res.status(error.error.status).send(error);
    }
    const userData = {...req.body}
    delete userData.id;
    const result = await UserService.updateUser(searchCriteria, userData);
    if (!result.error){
      return res.status(200).send({message: 'user was updated'});
    } else {
      const error =  Error.getEObject(400, 'can not update user')
      return res.status(error.error.status).send(error);
    }
  }

  async deleteUser (req:any, res:any) {
    if (req.query.id) {
      const data = {_id: ObjectID(req.query.id)}
      const user = await UserService.getUser(data);
      if(!user){
        const error =  Error.getEObject(400, 'user does not exist')
        return res.status(error.error.status).send(error);
      }
      if(user.isDefault){
        const error =  Error.getEObject(400, 'you can not delete default user')
        return res.status(error.error.status).send(error);
      }

      const result = await UserService.deleteUser(data);
      if (result) {
        return res.status(200).send(result);
      } else {
        const error =  Error.getEObject(400, 'can not delete user')
        return res.status(error.error.status).send(error);
      }
    }
    const error =  Error.getEObject(400, 'user does not exist')
    return res.status(error.error.status).send(error);
  }
}

module.exports = new UsersController();
