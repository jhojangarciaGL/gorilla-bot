const { parseDates } = require('../utils')
const texts = require('../utils/i18n')

module.exports = async function (body, Tournament) {
    const session = body.session
    const lang = body.queryResult.languageCode
    let resp = []
    let msg = ''
    let ctx = []
    let tournamentList = ''
    
    try {
        const tournaments = await Tournament.findAllTournamentAndSites()
        if(tournaments) {
            ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: {} })
            ctx.push({ name: `${session}/contexts/tournament-select`, lifespanCount: 5, parameters: {} })
            tournaments.forEach(tour => tournamentList += `Name: ${ tour.tournaments } / Inscription finishes: ${ parseDates(tour.inscriptionEndDate) } / Start date: ${ parseDates(tour.startDate) } / Spots: ${ tour.participants } / Sites: ${ tour['tournament_sites.site.sites'] } <br/>`)
            msg = texts()[lang].tournamentList1
            resp.push({
                "payload": {
                    "answers": [
                        texts()[lang].tournamentList1,
                        tournamentList,
                        texts()[lang].tournamentList2,                        
                    ]
                }
            })
        } else {
            ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 0, parameters: {} })
            ctx.push({ name: `${session}/contexts/tournament-select`, lifespanCount: 0, parameters: {} })
            msg = texts()[lang].tournamentList3
            resp.push({ text:{ text: [ texts()[lang].tournamentList3 ] } })
        }        
    } catch (error) {
        console.log(error)
        ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: {} })
        ctx.push({ name: `${session}/contexts/tournament-select`, lifespanCount: 5, parameters: {} })
        msg = texts()[lang].tournamentList4
        resp.push({ text:{ text: [ texts()[lang].tournamentList4 ] } })
    }

    return {
		fulfillmentText: msg,
        fulfillmentMessages: resp,
		outputContexts: ctx,
		source: ''
	}
}
