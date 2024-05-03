const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define("user", {
  // Attributes
  // username: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   unique: true,
  // },
  // password: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  // email: {
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // },
});

const Car = sequelize.define("car", {
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  carDealer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  distance: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Notification = sequelize.define("notification", {
  // Attributes
  newPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },

  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Notification.belongsTo(Car);

const CarUrl = sequelize.define("CarUrl", {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

CarUrl.belongsTo(Car);

module.exports = { Car, CarUrl, Notification };
