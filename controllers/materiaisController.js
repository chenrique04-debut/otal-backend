const database = require('../models')
const jwt = require('jsonwebtoken');
class MateriaisController {
  static async findAll(req, res) {
    try {
      const materiais = await database.Materiais.findAll()
      return res.status(200).json(materiais)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async create(req, res) {
      const json = req.body
      json.id_user = req.user.id;
      try {
        const material = await database.Materiais.create(json)
        return res.status(200).json(material)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

  static async update(req, res) {
    const { id } = req.params
    const json = req.body
    try {
      await database.Materiais.update(json, {
        where: { id: Number(id) },
        individualHooks: true
      })
      const material = await database.Materiais.findOne({ where: { id: Number(id) } })
      return res.status(200).json(material)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async delete(req, res) {
    const { id } = req.params
    try {
      await database.Materiais.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `material ${id} apagado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  
  }

module.exports = MateriaisController
