'use strict'

module.exports = function setupUser (UserModel) {
  async function createOrUpdate (user) {
    const cond = {
      where: {
        id: (typeof user.id !== 'undefined') ? user.id : ''
      }
    }

    const existingUser = await UserModel.findOne(cond)

    if (existingUser) {
      const updated = await UserModel.update(user, cond)
      return updated ? UserModel.findOne(cond) : existingUser
    }

    const result = await UserModel.create(user)
    return result.toJSON()
  }

  function findById (id) {
    return UserModel.findById(id)
  }

  function findAll () {
    return UserModel.findAll()
  }

  function findByEmail (mail) {
    return UserModel.findOne({
      attributes: ['id'],
      where: { mail },
      raw: true
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    findByEmail
  }
}