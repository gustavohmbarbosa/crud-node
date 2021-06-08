const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = 'mongodb+srv://root:Ajd1Gp6ujuM7gqZ9@gustavohmbarbosa.qywn5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = db