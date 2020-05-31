'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserTournamentModel (config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('tournament_user', {
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}