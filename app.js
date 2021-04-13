require('dotenv').config();
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('DB is OK'))
  .catch((err) => console.log(err));
  
app.use(express.json());
app.use(cors())

/*
API
*/
const confRoutes = require('./routes/conference');
app.use('/api/conferences', confRoutes);

/*
  FRONT-END
*/
app.use("/static", express.static(path.resolve(__dirname, "view", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view", "index.html"));
});

module.exports = app;