const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(cors())
app.use(logger(formatsLogger))
app.use(express.json({ limit: 50000 }))

app.use('/contacts', contactsRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
