const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const db = require("./config/db")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch(error => {
    console.log("Cannot connect to the database!", error)
    process.exit()
  })

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
