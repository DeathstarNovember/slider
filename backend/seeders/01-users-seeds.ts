const bcrypt = require("bcryptjs");
const defaultPass = bcrypt.hashSync("password");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        username: "jodo",
        passwordHash: defaultPass,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
