'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupGameModel (config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('game', {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        platform: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}