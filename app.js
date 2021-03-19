const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const rateLimit = require('express-rate-limit')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const { ErrorHandler } = require('./helpers/errorHandler')
const { apiLimit, jsonLimit } = require('./config/rate-limit.json')
const { HttpCode } = require('./helpers/constants')
require('dotenv').config()

const app = express()

const PUBLIC_DIR = process.env.PUBLIC_DIR_NAME
app.use(express.static(path.join(__dirname, PUBLIC_DIR)))
// app.use('/static', express.static(__dirname + PUBLIC_DIR))

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.get('env') !== 'test' && app.use(logger(formatsLogger))
app.use(cors())
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

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
