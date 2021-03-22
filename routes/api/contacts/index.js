const express = require('express')
const router = express.Router()
const contactsController = require('../../../controllers/contacts')
const validate = require('./validation')
const guard = require('../../../helpers/guard')

router
  .get('/', guard, contactsController.getAll)
  .post('/', guard, validate.addContact, contactsController.create)

router
  .get('/:id', guard, contactsController.getContactById)
  .delete('/:id', guard, contactsController.remove)
  .patch('/:id', guard, validate.updateContact, contactsController.update)

module.exports = router
