const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index')

const getAll = async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    return res.json({ status: 'success', code: 200, message: contacts })
  } catch (e) {
    next(e)
  }
}

const getOneById = async (req, res, next) => {
  try {
    const contact = await getById(req.params.id)
    if (contact) {
      return res.json({ status: 'success', code: 200, message: { contact } })
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
    const contact = await addContact(req.body)
    return res
      .status(201)
      .json({ status: 'success', code: 201, message: { contact } })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id)
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
    const contact = await updateContact(req.params.id, req.body)
    if (contact) {
      return res.json({ status: 'success', code: 200, message: { contact } })
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
