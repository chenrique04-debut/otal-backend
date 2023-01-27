const HorarioController = require("../controllers/horarioController")
const strategy = require("../libs/middlewares-strategy");
module.exports = app => {
  app.get('/horarios', HorarioController.findAll)
  app.get('/horarios/:id', strategy.bearer, HorarioController.findById)
  app.post('/horarios', strategy.bearer, HorarioController.create)
  app.put('/horarios/:id', strategy.bearer, HorarioController.update)
  app.delete('/horarios/:id', strategy.bearer,  HorarioController.delete)
}
