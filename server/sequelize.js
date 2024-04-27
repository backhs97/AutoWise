const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:root@localhost:5432/car");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
