'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserModel (config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: true
        },
        position: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}