  
'use strict'

const debug = require('debug')('games:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const cors = require('cors')

const api = require('./v1/api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.json({limit: "100mb", type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
app.use('/v1/api', api)

// express error handler
app.use((err, req, res, next) => {
	debug(`Error ${err.message}`)
	if (err.message.match(/not found/)) {
		return res.status(404).send({error: err.message})
	}

	res.status(500).send({error: err.message})
})

server.listen(port, () => console.log(`${chalk.green('[donkey-kong api]')} server listening on port ${port}`))

module.exports = server
