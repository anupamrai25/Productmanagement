const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isRecommended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBestseller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Available",
  },
});

sequelize.sync();

module.exports = Product;
