const { validateSite } =  require('../utils')
const texts = require('../utils/i18n')

module.exports = async function (body, Game, Site) {
    const site = (typeof body.queryResult.outputContexts[0].parameters.site !== 'undefined') ? body.queryResult.outputContexts[0].parameters.site : ''
    const session = body.session
    const lang = body.queryResult.languageCode
    let resp = []
    let msg = ''
    let ctx = []
    let games = ''

    if (site === '') {
        ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { site } })
        ctx.push({ name: `${session}/contexts/tournament-site`, lifespanCount: 5, parameters: { site } })
        msg = texts()[lang].getGames1
        resp.push({
            "payload": {
                "answers": [
                    texts()[lang].getGames1,
                    texts()[lang].getGames2
                ]
            }
        })
    } else {
        try {
            const isExistingSite = (site == texts()[lang].getGames7) ? true : await validateSite(site, lang, Site)
            if(isExistingSite) {
                const result = await Game.findAll() 
                if(result) {
                    result.forEach(game => games += `Name: ${ game.name } - Platform: ${ game.platform } <br/>`)
                    msg = texts()[lang].getGames3
                    resp.push({
                        "payload": {
                            "answers": [
                                texts()[lang].getGames3,
                                texts()[lang].getGames4,
                                games
                            ]
                        }
                    })
                }
            } else {
                ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { site } })
                ctx.push({ name: `${session}/contexts/tournament-site`, lifespanCount: 5, parameters: { site } })
                msg = texts()[lang].getGames5
                resp.push({ text:{ text: [ texts()[lang].getGames5 ] } })
            }
        } catch (error) {
            ctx.push({ name: `${session}/contexts/create-tournament`, lifespanCount: 5, parameters: { site: '' } })
            ctx.push({ name: `${session}/contexts/tournament-site`, lifespanCount: 5, parameters: { site: '' } })
            msg = texts()[lang].getGames6
            resp.push({ text:{ text: [ texts()[lang].getGames6 ] } })
        }  
    }

    return {
		fulfillmentText: msg,
        fulfillmentMessages: resp,
		outputContexts: ctx,
		source: ''
	}
}
