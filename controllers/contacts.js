const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/contacts')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const data = await listContacts(userId, req.query)
    return res.json({ status: 'success', code: 200, data })
  } catch (e) {
    next(e)
  }
}

const getOneById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await getById(req.params.id, userId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await addContact({ ...req.body, owner: userId })
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await removeContact(req.params.id, userId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'The contact deleted',
      })
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await updateContact(req.params.id, req.body, userId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  remove,
}
