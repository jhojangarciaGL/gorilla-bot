'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSiteModel (config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('site', {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}