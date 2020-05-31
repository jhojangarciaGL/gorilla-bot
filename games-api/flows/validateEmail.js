const { validateMail, sendMail } = require('../utils')
const texts = require('../utils/i18n')

module.exports = async function validateEmail (body, User, TournamentUser, Tournament) {
    const email = (typeof body.queryResult.outputContexts[0].parameters.email !== 'undefined') ? body.queryResult.outputContexts[0].parameters.email : ''
    const tournament = (typeof body.queryResult.outputContexts[0].parameters.tournament !== 'undefined') ? body.queryResult.outputContexts[0].parameters.tournament : ''
    const session = body.session
    const lang = body.queryResult.languageCode
    let resp = []
    let msg = ''
    let ctx = []

    if (email !== '' && tournament !== '') {
        if (validateMail(email)) {
            try {
                const result = await User.findByEmail(email)
                const tournamentId = await Tournament.findByName(`${ tournament } tournament`)
                if(result) {
                    await TournamentUser.createOrUpdate({
                        tournamentId: tournamentId.id,
                        userId: result.id
                    })
                    await sendMail(email)
                    ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 0, parameters: {} })
                    ctx.push({ name: `${session}/contexts/tournament-email`, lifespanCount: 0, parameters: {} })
                    msg = texts({ tournament })[lang].validateEmail1
                    resp.push({ text:{ text: [ texts()[lang].validateEmail1 ] } })
                } else {
                    ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: { tournament } })
                    ctx.push({ name: `${session}/contexts/tournament-email`, lifespanCount: 5, parameters: { tournament } })
                    msg = texts()[lang].validateEmail2
                    resp.push({ text:{ text: [ texts()[lang].validateEmail2 ] } })
                }
            } catch (error) {
                ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: { tournament } })
                ctx.push({ name: `${session}/contexts/tournament-email`, lifespanCount: 5, parameters: { tournament } })
                msg = texts()[lang].validateEmail3
                resp.push({ text:{ text: [ texts()[lang].validateEmail3 ] } })
            }
        } else {
            ctx.push({ name: `${session}/contexts/tournament-register`, lifespanCount: 5, parameters: { tournament } })
            ctx.push({ name: `${session}/contexts/tournament-email`, lifespanCount: 5, parameters: { tournament } })
            msg = texts()[lang].validateEmail4
            resp.push({ text:{ text: [ texts()[lang].validateEmail4 ] } })
        }
    }

    return {
		fulfillmentText: msg,
        fulfillmentMessages: resp,
		outputContexts: ctx,
		source: ''
	}
}