
'use strict'

const debug = require('debug')('donkeykong:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'donkeykong',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PWD || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: s => debug(s)
  },
  email: 'jhojan.garcia@gorillalogic.com'
}