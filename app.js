const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const { ErrorHandler } = require('./helpers/errorHandler')
const { apiLimit, jsonLimit } = require('./config/rate-limit.json')
const { HttpCode } = require('./helpers/constants')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(cors())
app.use(logger(formatsLogger))
app.use(express.json({ limit: jsonLimit }))

app.use(
  '/',
  rateLimit({
    windowMs: apiLimit.windowMs, // 15 minutes
    max: apiLimit.max,
    handler: (req, res, next) => {
      next(
        new ErrorHandler(HttpCode.BAD_REQUEST, 'Too many request from your IP')
      )
    },
  })
)
app.use('/', usersRouter)
app.use('/contacts', contactsRouter)
// app.use('/users', updateSubscriptionRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
