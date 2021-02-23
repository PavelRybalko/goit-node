const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')
const handleError = require('../helpers/handleerror')
const duplicationCheck = require('../helpers/duplicationCheck')
// const db = require("./db");
// const contactsdb = require("./contacts.json");

const contactsPath = path.join(__dirname, './contacts.json')

// const asyncReadContacts = async () => {
//   try {
//     await fs.readFile(contactsPath)
//     .then((data) => JSON.parse(data.toString()));
//   } catch (err){
//     handleError(err)
//   }
// }

const asyncReadContacts = () =>
  fs.readFile(contactsPath).then((data) => JSON.parse(data.toString()))

const listContacts = async () => {
  try {
    const contacts = await asyncReadContacts()
    return contacts
    // return res.status(200).json({
    //   status: 'success',
    //   code: 200,
    //   message: {
    //     contacts,
    //   },
    // });
  } catch (err) {
    handleError(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const searchCondition = Number(contactId) || contactId
    const contacts = await asyncReadContacts()
    const result = contacts.find((contact) => contact.id === searchCondition)
    return result
  } catch (err) {
    handleError(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const searchCondition = Number(contactId) || contactId
    const contacts = await asyncReadContacts()

    if (!contacts.find((contact) => contact.id === searchCondition)) {
      return
    }

    const result = contacts.filter((contact) => contact.id !== searchCondition)
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
    return result
  } catch (err) {
    handleError(err)
  }
}

const addContact = async (contact) => {
  try {
    contact.id = shortid()
    const contacts = await asyncReadContacts()

    duplicationCheck(contacts, contact)
    contacts.push(contact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contact
  } catch (error) {
    handleError(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await asyncReadContacts()

    const contactIndex = contacts.findIndex(
      (contact) => contact.id === Number(contactId)
    )

    if (!contactIndex) {
      return
    }

    const updatedContact = {
      ...contacts[contactIndex],
      ...body,
    }

    contacts[contactIndex] = updatedContact
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return updatedContact
  } catch (err) {
    handleError(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
