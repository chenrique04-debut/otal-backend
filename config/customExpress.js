const express = require('express')
const consign = require('consign')
const cors = require('cors')

module.exports = () => {
  const app = express()
  app.use(express.json())
  app.use(cors())
  consign()
    .include('routers')
    .then('libs/strategy.js')
    .into(app)
  return app
}
