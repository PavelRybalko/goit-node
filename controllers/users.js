const jwt = require('jsonwebtoken')
const fs = require('fs').promises
const { promisify } = require('util')
const cloudinary = require('cloudinary').v2
// const path = require('path')
// const Jimp = require('jimp')
// const createFolderIsNotExist = require('../helpers/create-dir')
require('dotenv').config()
const {
  findByEmail,
  create,
  updateToken,
  updateAvatar,
  updateUserSubscription,
  findByToken,
} = require('../model/users')
const { HttpCode } = require('../helpers/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const uploadCloud = promisify(cloudinary.uploader.upload)

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
        avatar: newUser.avatar,
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
    const isPasswordValid = await user?.validPassword(password)
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
          avatarURL: user.avatarURL,
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
    const token = req.get('Authorization')?.split(' ')[1]
    const user = await findByToken(token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    })
  } catch (e) {
    next(e)
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    // const avatarUrl = await saveAvatarToStatic(req)
    // await updateAvatar(id, avatarUrl)
    const {
      public_id: avatarIdCloud,
      secure_url: avatarUrl,
    } = await saveAvatarToCloud(req)
    await updateAvatar(id, avatarUrl, avatarIdCloud)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        avatarUrl,
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

// const saveAvatarToStatic = async (req) => {
//   const id = req.user.id
//   const IMG_DIR = path.join(
//     process.env.PUBLIC_DIR_NAME,
//     process.env.IMG_DIR_NAME
//   )
//   const pathFile = req.file.path
//   const newNameAvatar = `${Date.now()}-${req.file.originalname}`
//   const img = await Jimp.read(pathFile)
//   await img
//     .autocrop()
//     .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
//     .writeAsync(pathFile)
//   await createFolderIsNotExist(path.join(IMG_DIR, id))
//   await fs.rename(pathFile, path.join(IMG_DIR, id, newNameAvatar))
//   const avatarUrl = path.normalize(path.join(id, newNameAvatar))
//   try {
//     await fs.unlink(req.user.avatarURL)
//   } catch (e) {
//     console.log(e.message)
//   }
//   return path.join('http:\\localhost:3000', process.env.IMG_DIR_NAME, avatarUrl)
// }

const saveAvatarToCloud = async (req) => {
  const pathFile = req.file.path
  const result = await uploadCloud(pathFile, {
    folder: 'Photo',
    transformation: { width: 250, height: 250, crop: 'fill' },
  })
  cloudinary.uploader.destroy(req.user.avatarIdCloud, (err, result) => {
    console.log(err, result)
  })
  try {
    await fs.unlink(pathFile)
  } catch (e) {
    console.log(e.message)
  }
  return result
}

module.exports = {
  reg,
  login,
  updateUser,
  logout,
  getCurrent,
  avatars,
}
