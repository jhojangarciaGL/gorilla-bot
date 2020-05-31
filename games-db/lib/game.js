'use strict'

module.exports = function setupGame (GameModel) {
  async function createOrUpdate (game) {
    const cond = {
      where: {
        id: (typeof game.id !== 'undefined') ? game.id : ''
      }
    }

    const existingGame = await GameModel.findOne(cond)

    if (existingGame) {
      const updated = await GameModel.update(game, cond)
      return updated ? GameModel.findOne(cond) : existingGame
    }

    const result = await GameModel.create(site)
    return result.toJSON()
  }

  function findById (id) {
    return GameModel.findById(id)
  }

  function findByName (name) {
    return GameModel.findOne({
      attributes: ['id'],
      where: { name },
      raw: true
    })
  }

  function findAll () {
    return GameModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findByName,
    findAll
  }
}