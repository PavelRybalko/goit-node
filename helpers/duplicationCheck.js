const duplicationСheck = (contacts, contact) => {
  const duplicatedId = 0
  let duplicatedName = 0
  let duplicatedEmail = 0
  let duplicatedPhone = 0

  const messageLogging = (name, fieldName, fieldCount) =>
    console.log(
      `Contact with ${name}: ${fieldName} is already exist and duplicates ${fieldCount} times`
    )

  contacts.forEach((item) => {
    if (item.id === contact.id) {
      console.log('This id is already exist')
    }
    if (item.name === contact.name) {
      duplicatedName += 1
    }
    if (item.email === contact.email) {
      duplicatedEmail += 1
    }
    if (item.phone === contact.phone) {
      duplicatedPhone += 1
    }
  })

  if (duplicatedName) {
    messageLogging('name', contact.name, duplicatedName)
  }
  if (duplicatedEmail) {
    messageLogging('email', contact.email, duplicatedEmail)
  }
  if (duplicatedPhone) {
    messageLogging('phone', contact.phone, duplicatedPhone)
  }
  if (duplicatedId) {
    messageLogging('id', contact.id, duplicatedId)
  }
}

module.exports = duplicationСheck
