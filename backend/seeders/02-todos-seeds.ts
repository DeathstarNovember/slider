module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Todos",
      [
        {
          sortOrder: 0,
          name: "Get groceries",
          dueDate: new Date(),
          completed: false,
          category: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 1,
          name: "Wash dog",
          dueDate: new Date(),
          completed: false,
          category: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 2,
          name: "Clean house",
          dueDate: new Date(),
          completed: false,
          category: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 3,
          name: "Prospect gold",
          dueDate: new Date(),
          completed: true,
          category: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 4,
          name: "Wash Car",
          dueDate: new Date(),
          completed: true,
          category: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 5,
          name: "Do Laundry",
          dueDate: new Date(),
          completed: true,
          category: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 6,
          name: "Clean Garage",
          dueDate: new Date(),
          completed: true,
          category: "School",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          sortOrder: 7,
          name: "Shovel Poop",
          dueDate: new Date(),
          completed: true,
          category: "School",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
