const texts = require('../utils/i18n')

module.exports = async function validateTournament (body, Tournament) {
    const tournament = (typeof body.queryResult.outputContexts[0].parameters.tournament !== 'undefined') ? body.queryResult.outputContexts[0].parameters.tournament : ''
    const session = body.session
    const lang = body.queryResult.languageCode
    let resp = []
    let msg = ''
    let ctx = []

    if (tournament !== '') {
        try {
            const result = await Tournament.findByName(`${ tournament } tournament`)
            if(result) {
                if (result.participants > 0) {
                    ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: { tournament } })
                    ctx.push({ name: `${session}/contexts/tournament-email`, lifespanCount: 5, parameters: { tournament } })
                    msg = texts()[lang].validateTournament1
                    resp.push({ text:{ text: [ texts()[lang].validateTournament1 ] } })
                } else {
                    ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: {} })
                    ctx.push({ name: `${session}/contexts/tournament-select`, lifespanCount: 5, parameters: {} })
                    msg = texts()[lang].validateTournament2
                    resp.push({ text:{ text: [ texts()[lang].validateTournament2 ] } })
                }
            } else {
                ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { tournament: '' } })
                ctx.push({ name: `${session}/contexts/tournament-game`, lifespanCount: 5, parameters: { tournament: '' } })
                msg = texts()[lang].validateTournament3
                resp.push({ text:{ text: [ texts()[lang].validateTournament3 ] } })
            }
        } catch (error) {
            console.log(error)
            ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: {} })
            ctx.push({ name: `${session}/contexts/tournament-select`, lifespanCount: 5, parameters: {} })
            msg = texts()[lang].validateTournament4
            resp.push({ text:{ text: [ texts()[lang].validateTournament4 ] } })
        }
    }

    return {
		fulfillmentText: msg,
        fulfillmentMessages: resp,
		outputContexts: ctx,
		source: ''
	}
}