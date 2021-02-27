const Contact = require('./schemas/contact')

const listContacts = async () => {
  const result = await Contact.find({})
  return result
}

const getById = async (id) => {
  const result = await Contact.findOne({ _id: id })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  )
  return result
}

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove({ _id: id })
  return result
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
