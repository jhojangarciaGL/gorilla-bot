'use strict'

module.exports = function setupSite (SiteModel) {
  async function createOrUpdate (site) {
    const cond = {
      where: {
        id: (typeof site.id !== 'undefined') ? site.id : ''
      }
    }

    const existingSite = await SiteModel.findOne(cond)

    if (existingSite) {
      const updated = await SiteModel.update(site, cond)
      return updated ? SiteModel.findOne(cond) : existingSite
    }

    const result = await SiteModel.create(site)
    return result.toJSON()
  }

  function findById (id) {
    return SiteModel.findById(id)
  }

  function findByName (name) {
    return SiteModel.findOne({
      attributes: ['id'],
      where: { name },
      raw: true
    })
  }


  function findAll () {
    return SiteModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findByName,
    findAll
  }
}