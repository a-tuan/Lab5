
const Pool = require('pg').Pool;

const pg_conn = new Pool({
  user: 'yykmomgwfncafi',
  host: 'ec2-3-211-6-217.compute-1.amazonaws.com',
  database: 'dbpfe8mie8or74',
  password: 'd2b8022349c9a4fc0b0634c16845a600f5a4d296b1640c7a612f211e7b04a64c',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  },
})

module.exports = pg_conn;