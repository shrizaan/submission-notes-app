import { Pool } from 'pg';

// Creates a global connection pool
const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text, params) => {
  return pool.query(text, params);
};
