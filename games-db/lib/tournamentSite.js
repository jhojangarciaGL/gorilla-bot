'use strict'

module.exports = function setupUserTournament (SiteTournamentModel, SiteModel, TournamentModel) {
    async function createOrUpdate (tournament) {
        const cond = {
            where: {
                id: (typeof tournament.id !== 'undefined') ? tournament.id : ''
            }
        }
    
        const existingTournament = await SiteTournamentModel.findOne(cond)
    
        if (existingTournament) {
            const updated = await SiteTournamentModel.update(tournament, cond)
            return updated ? SiteTournamentModel.findOne(cond) : existingTournament
        }
    
        const result = await SiteTournamentModel.create(tournament)
        return result.toJSON()
    }
    
    function findById (id) {
        return SiteTournamentModel.findById(id)
    }
    
    function findAll () {
        return SiteTournamentModel.findAll()
    }
    
    return {
        createOrUpdate,
        findById,
        findAll
    }
}