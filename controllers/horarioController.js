const database = require('../models')
const jwt = require('jsonwebtoken');
class HorariosController {
  static async findAll(req, res) {
    try {
      const horarios = await database.Horarios.findAll()
      return res.status(200).json(horarios)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async create(req, res) {
    const json = req.body
    json.user_id = req.user_id;
    
    try {
      const horario = await database.Horarios.create(json)
      return res.status(200).json(horario)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findById(req, res) {
    const { id } = req.params;
    try {
      const horario = await database.Horarios.findOne({ where: { id: Number(id) } })
      return res.status(200).json(horario)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update(req, res) {
    const { id } = req.params
    const json = req.body
    try {
      await database.Horarios.update(json, {
        where: { id: Number(id) },
        individualHooks: true
      })
      const horario = await database.Horarios.findOne({ where: { id: Number(id) } })
      return res.status(200).json(horario)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async delete(req, res) {
    const { id } = req.params
    try {
      await database.Horarios.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `horario ${id} apagado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}
module.exports = HorariosController
