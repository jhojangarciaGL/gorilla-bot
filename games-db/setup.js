'use strict'

const debug = require('debug')('donkeykong:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const db = require('./')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()
async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened')
    }
  }
  const config = {
    database: process.env.DB_NAME || 'donkeykong',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PWD || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: s => debug(s),
    setup: true,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  }

  await db(config).catch(handleFatalError)

  console.log('success: ')
  process.exit(0)
}

function handleFatalError (error) {
  console.log(`${chalk.red('[Fatal error]')} ${error.message}`)
  console.log(error.stack)
  process.exit(1)
}

setup()