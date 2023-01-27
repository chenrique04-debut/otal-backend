const database = require('../models')
const jwt = require('jsonwebtoken');
class UsersController {
  static login(req, res) {
    const token = jwt.sign(
      { id: req.user.id },
      "senha secreta"
      //,{ expiresIn: 60 }
    );
    res.set('jwt', token);
    return res.status(204).send();
  }


  static async findAll(req, res) {
    try {
      const users = await database.Users.findAll()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async create(req, res) {
    const json = req.body
    try {
      const user = await database.Users.create(json)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findById(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({ where: { id: Number(id) } })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update(req, res) {
    const { id } = req.params
    const json = req.body
    try {
      await database.Users.update(json, {
        where: { id: Number(id) },
        individualHooks: true
      })
      const user = await database.Users.findOne({ where: { id: Number(id) } })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async delete(req, res) {
    const { id } = req.params
    try {
      await database.Users.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `usuário ${id} apagado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}
module.exports = UsersController
