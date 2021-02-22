const { uuid } = require('uuidv4')
// const shortid = require("shortid");
const db = require('./db')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getById = async (contactId) => {
  return db
    .get('contacts')
    .find({ id: Number(contactId) || contactId })
    .value()
}

const removeContact = async (contactId) => {
  const [record] = db
    .get('contacts')
    .remove({ id: Number(contactId) || contactId })
    .write()
  return record
}

const addContact = async (body) => {
  const record = {
    id: uuid(),
    ...body,
  }
  db.get('contacts').push(record).write()
  return record
}

const updateContact = async (contactId, body) => {
  const record = db
    .get('contacts')
    .find({ id: Number(contactId) || contactId })
    .assign(body)
    .value()
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
