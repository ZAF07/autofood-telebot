

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('restaurants', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        url: Sequelize.STRING,
        location: Sequelize.STRING,
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
  },

  down: async (queryInterface) => {
      await queryInterface.dropTable('restaurants');
  }
};
