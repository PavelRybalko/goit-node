const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./model/contacts.json')
const db = low(adapter)
const contactsjson = require('./contacts.json')

db.defaults({ contacts: contactsjson }).write()

module.exports = db
