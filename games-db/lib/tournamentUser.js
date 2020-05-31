'use strict'

module.exports = function setupUserTournament (UserTournamentModel, UserModel, TournamentModel) {
    async function createOrUpdate (tournament) {
        const cond = {
            where: {
                id: (typeof tournament.id !== 'undefined') ? tournament.id : ''
            }
        }
    
        const existingTournament = await UserTournamentModel.findOne(cond)
    
        if (existingTournament) {
            const updated = await UserTournamentModel.update(tournament, cond)
            return updated ? UserTournamentModel.findOne(cond) : existingTournament
        }
    
        const result = await UserTournamentModel.create(tournament)
        return result.toJSON()
    }
    
    function findById (id) {
        return UserTournamentModel.findById(id)
    }
    
    function findAll () {
        return UserTournamentModel.findAll()
    }
    
    return {
        createOrUpdate,
        findById,
        findAll
    }
}