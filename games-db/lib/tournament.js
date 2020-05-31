'use strict'

module.exports = function setupTournament (TournamentModel, SiteModel, TournamentSiteModel, sequelize) {
  async function createOrUpdate (tournament) {
    const cond = {
      where: {
        id: (typeof tournament.id !== 'undefined') ? tournament.id : ''
      }
    }

    const existingTournament = await TournamentModel.findOne(cond)

    if (existingTournament) {
      const updated = await TournamentModel.update(tournament, cond)
      return updated ? TournamentModel.findOne(cond) : existingTournament
    }

    const result = await TournamentModel.create(tournament)
    return result.toJSON()
  }

  function findById (id) {
    return TournamentModel.findById(id)
  }

  function findAll () {
    return TournamentModel.findAll()
  }

  function findByName (name) {
    return TournamentModel.findOne({
      attributes: ['id', 'participants'],
      where: { name },
      raw: true
    })
  }

  function findAllTournamentAndSites () {
    return TournamentModel.findAll({
      attributes: [ [ 'name', 'tournaments' ], 'inscriptionEndDate', 'startDate', 'participants' ],
      group: [sequelize.col('tournament.id')],
      include: [{
        model: TournamentSiteModel,
        attributes: [],
        required: true,
        include: [{
          attributes: [ [ sequelize.fn('GROUP_CONCAT', sequelize.literal("`tournament_sites->site`.name SEPARATOR ', '")), 'sites' ] ],
          model: SiteModel,
          required: true
        }],
      }],
      raw: true
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    findAllTournamentAndSites,
    findByName
  }
}