const express = require('express')
// const { query, validationResult } = require('express-validator');
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')
const validate = require('./validation')

// const validator = (req, res, next) => {
// 	const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array() });
// 	}
// 	next()
// }

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ status: 'success', code: 200, message: { contacts } })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: `The contact not found.`,
      })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await removeContact(contactId)

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: `The contact deleted`,
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `The contact not found.`,
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validate.addContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: {
        contact,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
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
})

module.exports = router
