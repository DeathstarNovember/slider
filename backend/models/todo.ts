import { Sequelize, DataTypes } from "sequelize";
import User from "./user";
const sequelize = new Sequelize("sqlite::memory:");

const Todo = sequelize.define(
  "Todo",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
  }
);

User.belongsTo(User);
export default Todo;
