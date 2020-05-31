'use strict'

const debug = require('debug')('games:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('games-db')

const config = require('../config')

const api = asyncify(express.Router())

module.exports = api