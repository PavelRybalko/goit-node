const { users } = require('./data.js')
const bcrypt = require('bcryptjs')

const findByField = jest.fn((field) => {
  const key = Object.keys(field)[0]
  const value = Object.values(field)[0]
  const [user] = users.filter((el) => String(el[key]) === String(value))
  return user
})

const create = jest.fn(({ email, password, subscription = 'free' }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  const newUser = {
    subscription,
    email,
    password: pass,
    _id: '604201f953b6652998dc8b9z',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password)
    },
  }
  users.push(newUser)
  return newUser
})

const updateByField = jest.fn((id, token) => {
  return {}
})

const updateAvatar = jest.fn((id, avatarURL, avatarIdCloud) => {
  return {}
})

const updateUserSubscription = jest.fn((id, subscription) => {
  let [user] = users.filter((el) => String(el._id) === String(id))
  if (user) {
    user = { ...user, ...subscription }
  }
  return user
})

module.exports = {
  findByField,
  create,
  updateByField,
  updateAvatar,
  updateUserSubscription,
}
