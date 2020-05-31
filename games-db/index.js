'use strict'

const defaults = require('defaults')
const setupDatabase = require('./lib/db')
/** Models */
const setupGameModel = require('./models/game')
const setupSiteModel = require('./models/site')
const setupUserModel = require('./models/user')
const setupTournamentModel = require('./models/tournament')
const setupTournamentSiteModel = require('./models/tournamentSite')
const setupTournamentUserModel = require('./models/tournamentUser')
/** libs */
const setupGame = require('./lib/game')
const setupSite = require('./lib/site')
const setupUser = require('./lib/user')
const setupTournament = require('./lib/tournament')
const setupTournamentSite = require('./lib/tournamentSite')
const setupTournamentUser = require('./lib/tournamentUser')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const GameModel = setupGameModel(config)
  const SiteModel = setupSiteModel(config)
  const UserModel = setupUserModel(config)
  const TournamentModel = setupTournamentModel(config)
  const TournamentSiteModel = setupTournamentSiteModel(config)
  const TournamentUserModel = setupTournamentUserModel(config)

  // A category has many subcategories and a subcategory belongs to one category
  UserModel.hasMany(TournamentUserModel)
  TournamentUserModel.belongsTo(UserModel)

  TournamentModel.hasMany(TournamentUserModel)
  TournamentUserModel.belongsTo(TournamentModel)

  TournamentModel.hasMany(TournamentSiteModel)
  TournamentSiteModel.belongsTo(TournamentModel)

  SiteModel.hasMany(TournamentSiteModel)
  TournamentSiteModel.belongsTo(SiteModel)

  SiteModel.hasMany(UserModel)
  UserModel.belongsTo(SiteModel)

  GameModel.hasMany(TournamentModel)
  TournamentModel.belongsTo(GameModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Game = setupGame(GameModel)
  const Site = setupSite(SiteModel)
  const User = setupUser(UserModel)
  const Tournament = setupTournament(TournamentModel, SiteModel, TournamentSiteModel, sequelize)
  const TournamentSite = setupTournamentSite(TournamentSiteModel, SiteModel, TournamentModel)
  const TournamentUser = setupTournamentUser(TournamentUserModel, UserModel, TournamentModel)

  return {
    Game,
    Site,
    User,
    Tournament,
    TournamentSite,
    TournamentUser
  }
}