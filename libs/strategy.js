const bcrypt = require("bcrypt");
const Basic = require('passport-http').BasicStrategy;
const Bearer = require('passport-http-bearer').Strategy;
const database = require('../models');
const jwt = require('jsonwebtoken');
const passport = require("passport");

module.exports = () => {
  passport.use(new Basic(
    async function(login, senha, done) {
      try {
        
        const usuario = await database.Users.findOne({ where: { login: login } });
        if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
          return done(null, false)
        }
        return done(null, usuario);
      } catch (e) { return done(e); }
    }
  ));

  passport.use(
    new Bearer(async function(token, done) {
      try {
        const payload = jwt.verify(token, "senha secreta");
        const user = await database.Users.findOne({ where: { id: payload.id } });
        done(null, user);
      } catch (e) { done(e); }
    }
    ));
}
