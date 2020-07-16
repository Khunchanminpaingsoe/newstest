const express = require('express');
const route = require('./routes/news_route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require('./config/keys').MongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  const PORT = process.env.PORT || 8000;

app.use('/image', express.static('./uploads'));
app.use('/',route);

app.listen(PORT, () => {
    console.log('Server is running at port 8000');
})