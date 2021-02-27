const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contacts')
const validate = require('./validation')

router
  .get('/', contactsController.getAll)
  .post('/', validate.addContact, contactsController.create)

router
  .get('/:id', contactsController.getOneById)
  .delete('/:id', contactsController.remove)
  .patch('/:id', validate.updateContact, contactsController.update)

module.exports = router
