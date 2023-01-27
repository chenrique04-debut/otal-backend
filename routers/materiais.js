const MateriaisController = require("../controllers/materiaisController")
const strategy = require("../libs/middlewares-strategy");

module.exports = app => {
  app.get('/materiais',strategy.bearer,  MateriaisController.findAll)
  app.post('/materiais', strategy.bearer,strategy.tutor,  MateriaisController.create)
  app.put('/materiais/:id', strategy.bearer,strategy.tutor, MateriaisController.update)
  app.delete('/materiais/:id', strategy.bearer, MateriaisController.delete)
}
