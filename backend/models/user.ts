import { Sequelize, DataTypes } from "sequelize";
import Tally from "./todo";
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL(DataTypes.STRING),
      set: (value) => {
        this.setDataValue("passwordHash", value);
      },
      get: () => {
        return this.getDataValue("passwordHash");
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [{ fields: ["username"], unique: true }],
  }
);

User.hasMany(Tally);

export default User;
