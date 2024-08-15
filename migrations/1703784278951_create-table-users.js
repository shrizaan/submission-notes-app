exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: { type: 'VARCHAR(50)', notNull: true },
    password: { type: 'VARCHAR(255)', notNull: true },
  });

  pgm.sql(`
    INSERT INTO users (id, username, password) VALUES
    ('1', 'admin', 'admin'),
    ('2', 'user', 'user');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
