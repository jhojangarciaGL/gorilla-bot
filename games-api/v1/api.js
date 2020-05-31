'use strict'

const debug = require('debug')('games:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const dialogflow = require('dialogflow')
const db = require('games-db')

const config = require('../config')
const getGames = require('../flows/getGames')
const createTournament = require('../flows/createTournament')
const validateGame = require('../flows/validateGame')
const tournamentList = require('../flows/tournamentList')
const validateTournament = require('../flows/validateTournament')
const validateEmail = require('../flows/validateEmail')

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./donkeykong-wqodok-438f277e9cff.json"
})

const api = asyncify(express.Router())

let services, Game, Site, Tournament, User, TournamentSite, TournamentUser

api.use('*', async (req, res, next) => {
    if (!services) {
        console.log('Connecting to database')
        try {
            services = await db(config.db)
        } catch (e) {
            return next(e)
        }
        console.log('Done connecting to database')
        Game = services.Game
        Site = services.Site
        Tournament= services.Tournament
        User = services.User
        TournamentSite = services.TournamentSite
        TournamentUser = services.TournamentUser
    }
    next()
})


api.post('/donkeyKong', async (req, res, next) => {
    const action = req.body.queryResult.action
    const { body } = req
    let response
    try {
        switch (action) {
            case 'get-games':
                response = await getGames(body, Game, Site)
            break
            case 'validate-game':
                response = await validateGame(body, Game)
            break
            case 'create-tournament':
                response = await createTournament(body, Tournament, TournamentSite, Game, Site)
            break
            case 'tournament-list':
                response = await tournamentList(body, Tournament)
            break
            case 'validate-tournament':
                response = await validateTournament(body, Tournament)
            break
            case 'validate-email':
                response = await validateEmail(body, User, TournamentUser, Tournament)
            break
        }
    } catch (e) {
        console.log("Error processing webhook request--->", e)
        return next(new Error(e))
    }

    return res.status(200).json(response)
})

api.post('/sendMessage', async (req, res, next) => {
    debug('entre a /sendMessage')
    const { sessionId, msg, lang } = req.body
    const sessionPath = sessionClient.sessionPath('donkeykong-wqodok', sessionId)
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msg,
                languageCode: lang
            }
        }
    }
    let response
    try{
        response = await sessionClient.detectIntent(request)
    } catch(e) {
        console.log("Error en la peticion a dialogflow--->", e)
        return next(new Error(e.error.error))
    }
    res.status(200).send(response[0].queryResult)
})


module.exports = api