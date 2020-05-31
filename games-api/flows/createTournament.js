const { sendMail, validateSite } = require('../utils')
const texts = require('../utils/i18n')

module.exports = async function (body, Tournament, TournamentSite, Game, Site) {
    const site = (typeof body.queryResult.outputContexts[0].parameters.site !== 'undefined') ? body.queryResult.outputContexts[0].parameters.site : ''
    const game = (typeof body.queryResult.outputContexts[0].parameters.game !== 'undefined') ? body.queryResult.outputContexts[0].parameters.game : ''
    const inscriptionDate = (typeof body.queryResult.outputContexts[0].parameters.inscriptionDate !== 'undefined') ? body.queryResult.outputContexts[0].parameters.inscriptionDate : ''
    const startDate = (typeof body.queryResult.outputContexts[0].parameters.startDate !== 'undefined') ? body.queryResult.outputContexts[0].parameters.startDate : ''
    const endDate = (typeof body.queryResult.outputContexts[0].parameters.endDate !== 'undefined') ? body.queryResult.outputContexts[0].parameters.endDate : ''
    const places = (typeof body.queryResult.outputContexts[0].parameters.places !== 'undefined') ? body.queryResult.outputContexts[0].parameters.places : ''
    const session = body.session
    const lang = body.queryResult.languageCode
    let resp = []
    let msg = ''
    let ctx = []

    if (site !== '' && game !== '' && inscriptionDate !== '' && places !== '' && startDate !== '' && endDate !== '') {
        try {
            const gameId = await Game.findByName(game)
            let createdTournament
            if(gameId) {
                createdTournament = await Tournament.createOrUpdate({
                    name: `${ game } tournament`,
                    participants: places,
                    inscriptionEndDate: inscriptionDate,
                    startDate,
                    endDate,
                    gameId: gameId.id
                }) 
            }
            if(createdTournament) {
                const siteId = await validateSite(site, lang, Site)
                if (siteId) {
                    console.log(Array.isArray(siteId))
                    if (Array.isArray(siteId)) {
                        siteId.forEach(async s => {
                            await TournamentSite.createOrUpdate({
                                tournamentId: createdTournament.id,
                                siteId: s.id
                            })
                        })
                    } else {
                        await TournamentSite.createOrUpdate({
                            tournamentId: createdTournament.id,
                            siteId: siteId.id
                        })
                    }
                }                
                await sendMail('jhojan.garcia@gorillalogic.com')
                ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 0, parameters: {} })
                ctx.push({ name: `${session}/contexts/tournament-places`, lifespanCount: 0, parameters: {} })
                msg = texts()[lang].createTournament1
                resp.push({
                    "payload": {
                        "answers": [
                            texts()[lang].createTournament1,
                            texts()[lang].createTournament2
                        ]
                    }
                })
            }
        } catch (error) {
            ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { site: '' } })
            ctx.push({ name: `${session}/contexts/tournament-site`, lifespanCount: 5, parameters: { site: '' } })
            msg = texts()[lang].createTournament3
            resp.push({ text:{ text: [ texts()[lang].createTournament3 ] } })
        }
    }

    return {
		fulfillmentText: msg,
        fulfillmentMessages: resp,
		outputContexts: ctx,
		source: ''
	}
}
