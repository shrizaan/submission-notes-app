import { Pool } from 'pg';

// Creates a global connection pool
const pool = new Pool();

export const query = (text, params) => {
  return pool.query(text, params);
};
