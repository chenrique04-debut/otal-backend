'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    perfil: DataTypes.ENUM('tutor', 'aluno'),
    active: DataTypes.BOOLEAN,
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    contato: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.beforeCreate(async (user, options) => {
    const hash = await bcrypt.hash(user.senha, 12);
    user.senha = hash;
  });

  Users.beforeUpdate(async (user, options) => {
    if (user.changed("senha")) {
      const hash = await bcrypt.hash(user.senha, 12);
      user.senha = hash;
    }
  });

  return Users;
};