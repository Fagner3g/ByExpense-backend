module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // Qual tabela quero adicionar uma coluna.
      'avatar_id', // Qual o nome da coluna.
      {
        type: Sequelize.INTEGER,
        references: { model: 'avatars', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
