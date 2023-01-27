const UserController = require("../controllers/userController")
const strategy = require("../libs/middlewares-strategy");
module.exports = app => {

  app.get('/login', strategy.basic, UserController.login)
  app.get('/users',  UserController.findAll)
  app.get('/users/:id', strategy.bearer, UserController.findById)
  app.post('/users', UserController.create)
  app.put('/users/:id', strategy.bearer, UserController.update)
  app.delete('/users/:id', strategy.bearer, UserController.delete)
}
