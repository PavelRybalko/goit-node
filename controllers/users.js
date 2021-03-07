const jwt = require('jsonwebtoken')
require('dotenv').config()
const {
  findByEmail,
  create,
  updateToken,
  updateUserSubscription,
  findByToken,
} = require('../model/users')
const { HttpCode } = require('../helpers/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      })
    }
    const newUser = await create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await findByEmail(email)
    const isPasswordValid = await user.validPassword(password)
    if (!user || !isPasswordValid) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Email or password is wrong',
      })
    }
    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (e) {
    next(e)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { subscription } = req.body
    const { id } = req.user
    const user = await updateUserSubscription(id, subscription)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (e) {
    next(e)
  }
}

const getCurrent = async (req, res, next) => {
  try {
    const [, token] = req.get('Authorization').split(' ')
    const user = await findByToken(token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
  } catch (e) {
    next(e)
  }
}

module.exports = {
  reg,
  login,
  updateUser,
  logout,
  getCurrent,
}
