module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Fagner Gomes',
          email: 'fagner.gomes@tonocurso.com.br',
          password_hash:
            '$2a$08$sANE7re2irkOl.lWgUhSG.TEPMAg2XpM71KI.V5NRm8m0XRAJj22q',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'John Doe',
          email: 'johndoe@tonocurso.com.br',
          password_hash:
            '$2a$08$sANE7re2irkOl.lWgUhSG.TEPMAg2XpM71KI.V5NRm8m0XRAJj22q',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
