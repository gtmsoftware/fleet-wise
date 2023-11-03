const Pool = require('pg').Pool;


/**
 * Start Database Connection Pool
 */

const dbConnectionPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'oum',
  password: 'gtmSoftware',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Refrence : https://node-postgres.com/apis/pool

module.exports = dbConnectionPool;

