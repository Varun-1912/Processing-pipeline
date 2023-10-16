// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: 'C:\Users\Varun\Downloads\challenge\challenge 4\challenge-1\out\database.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'migrations',
      user:     'root',
      password: 'mysql'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: '',
      user:     'root',
      password: 'mysql'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
