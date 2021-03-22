const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6
const { Subscription } = require('../../helpers/constants')
const gravatar = require('gravatar')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      validate(value) {
        const re = /^\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
      },
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
    avatarIdCloud: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    subscription: {
      type: String,
      enum: {
        values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
        message: "This subscription isn't allowed",
      },
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  // const salt = await bcrypt.genSalt(SALT_FACTOR);
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR),
    null
  )
  next()
})

// userSchema.path('email').validate( function(value){
// 	const re = /^\S+@\S+\.\S+/
// 	return re.test(String(value).toLowerCase())
// })

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
