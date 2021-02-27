const app = require('../app')
const db = require('../model/db')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server is not running. Error message: ${err.message}`)
  process.exit(1)
})
