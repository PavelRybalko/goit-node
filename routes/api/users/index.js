const express = require('express')
const router = express.Router()
const usersController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')
const { createAccountLimiter } = require('../../../helpers/rate-limit')
const validation = require('./validation')

router.post(
  '/auth/register',
  createAccountLimiter,
  validation.Register,
  usersController.reg
)
router.post('/auth/login', validation.Login, usersController.login)
router.post('/auth/logout', guard, usersController.logout)
router.patch('/users', guard, validation.UpdateUser, usersController.updateUser)
router.patch(
  '/users/avatars',
  guard,
  upload.single('avatar'),
  validation.UploadAvatar,
  usersController.avatars
)
router.get(
  '/users/current',
  guard,
  // validation.UpdateUser,
  usersController.getCurrent
)
router.get('/users/verify/:verificationToken', usersController.verify)

module.exports = router
