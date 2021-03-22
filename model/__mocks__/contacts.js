const { contacts } = require('./data.js')

const listContacts = jest.fn(
  (userId, { sub, sortBy, sortByDesc, filter, limit = '5', offset = '0' }) => {
    return { contacts, total: contacts.length, limit, offset }
  }
)

const getById = jest.fn((id, userId) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id))
  return contact
})

const addContact = jest.fn((body) => {
  const newContact = { ...body }
  contacts.push(newContact)
  return newContact
})

const updateContact = jest.fn((id, body, userId) => {
  let [contact] = contacts.filter((el) => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

const removeContact = jest.fn((id, userId) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id))
  if (index === -1) {
    return null
  }
  const [contact] = contacts.splice(index, 1)
  return contact
})

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
