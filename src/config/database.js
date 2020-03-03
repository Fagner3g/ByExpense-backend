module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'byexpense',
  define: {
    timestemps: true, // define que vou ter uma coluna created_at
    underscored: true,
    underscoredAll: true, // Garante que quero usar padão underscore nas tabelas e colunas.
  },
};
