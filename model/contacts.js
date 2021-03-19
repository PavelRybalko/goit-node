// const { populate } = require('./schemas/contact')
const Contact = require('./schemas/contact')

const listContacts = async (
  userId,
  { sub, sortBy, sortByDesc, filter, limit = '5', offset = '0' }
) => {
  const result = await Contact.paginate(
    { owner: userId, ...(sub ? { subscription: sub } : {}) },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // name: 1 --- if sortBy = name
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // name: -1
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        // select: "email -_id", (Exclude '_id' field)
        select: 'email',
      },
    }
  )
  const { docs: contacts, totalDocs: total } = result
  return { total: total.toString(), limit, offset, contacts }
}

const getById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email',
  })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    { ...body },
    { new: true }
  )
  return result
}

const removeContact = async (id, userId) => {
  const result = await Contact.findOneAndRemove({ _id: id, owner: userId })
  return result
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
