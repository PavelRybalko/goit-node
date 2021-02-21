const express = require('express')
// const { query, validationResult } = require('express-validator');
const router = express.Router()
// const fs = require("fs").promises;
const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')
const validate = require('./validation')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    return res.json({ status: 'success', code: 200, message: contacts })
  } catch (e) {
    // res.json({ message: error })
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
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
    // res.json({ message: error })
    next(e)
  }
})

router.post('/', validate.addContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    return res
      .status(201)
      .json({ status: 'success', code: 201, message: { contact } })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
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
    // res.json({ message: error })
    next(e)
  }
})

router.patch('/:id', validate.updateContact, async (req, res, next) => {
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
    // res.json({ message: error })
    next(e)
  }
})

module.exports = router
