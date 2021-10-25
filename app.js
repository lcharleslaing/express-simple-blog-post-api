const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

// import routes
const postRoutes = require("./routes/posts");

app.use(bodyParser.json());
app.use("/posts", postRoutes);

const db_url = process.env.DATABASE_CONNECTION;
const db_name = process.env.DATABASE_NAME;
const db_connect = db_url + db_name;

// connect to db
mongoose.connect(
  db_connect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

// listen
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
