import { knex } from './config/database';

const db: any = process.env.DB_CONNECTION;

module.exports = {
  development: knex[db],
  staging: knex[db],
  production: knex[db],
};
