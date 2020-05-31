'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupTournamentSiteModel (config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('tournament_site', {
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}