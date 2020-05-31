const texts = require('../utils/i18n')

module.exports = async function validateGame (body, Game) {
    const game = (typeof body.queryResult.outputContexts[0].parameters.game !== 'undefined') ? body.queryResult.outputContexts[0].parameters.game : ''
    const site = (typeof body.queryResult.outputContexts[0].parameters.site !== 'undefined') ? body.queryResult.outputContexts[0].parameters.site : ''
    const session = body.session
    const lang = body.queryResult.languageCode
    let resp = []
    let msg = ''
    let ctx = []

    if (game !== '') {
        try {
            const result = await Game.findByName(game)
            if(result) {
                ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { game, site } })
                ctx.push({ name: `${session}/contexts/tournament-inscription-date `, lifespanCount: 5, parameters: { game, site } })
                msg = texts()[lang].validateGame1
                resp.push({ text:{ text: [ texts()[lang].validateGame1 ] } })
            } else {
                ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { game: '', site } })
                ctx.push({ name: `${session}/contexts/tournament-game`, lifespanCount: 5, parameters: { game: '', site } })
                msg = texts()[lang].validateGame2
                resp.push({ text:{ text: [ texts()[lang].validateGame2 ] } })
            }
        } catch (error) {
            ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { site: '' } })
            ctx.push({ name: `${session}/contexts/tournament-site`, lifespanCount: 5, parameters: { site: '' } })
            msg = texts()[lang].validateGame3
            resp.push({ text:{ text: [ texts()[lang].validateGame3 ] } })
        }
    }

    return {
		fulfillmentText: msg,
        fulfillmentMessages: resp,
		outputContexts: ctx,
		source: ''
	}
}