const express = require('express');
const app = express();
const port = 3000

const cors = require('cors');
const corsOptions = {
  origin: `http://localhost:${port}`
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/Model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log("Cannot connect to the database!", error)
    process.exit()
  })

require("./routes")(app);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
})
