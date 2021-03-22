const User = require('./schemas/user')

const findByEmail = async (email) => {
  const result = await User.findOne({ email })
  return result
}

const findById = async (id) => {
  const result = await User.findOne({ _id: id })
  return result
}

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription })
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const findByToken = async (token) => {
  return await User.findOne({ token })
}

const updateAvatar = async (id, avatarURL, avatarIdCloud) => {
  return await User.updateOne({ _id: id }, { avatarURL, avatarIdCloud })
}

const updateUserSubscription = async (id, subscription) => {
  const result = await User.findOneAndUpdate(
    id,
    { subscription },
    { new: true }
  )
  return result
}

module.exports = {
  findByEmail,
  findById,
  findByToken,
  create,
  updateToken,
  updateAvatar,
  updateUserSubscription,
}
