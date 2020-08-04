const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const route = require('./routes/news_route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { render } = require('ejs');
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Authorization');
  if(req.method === "OPTION"){
    res.header('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH');
    return res.status(200).json({});
  }
  next();
})

app.set('view engine', 'ejs');
app.use('/uploads/',express.static('uploads'));
app.use(expressLayouts);

app.use(methodOverride('_method'));

const db = require('./config/keys').MongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 8000;

app.use('/',route);

app.listen(PORT, () => {
    console.log('Server is running at port 8000');
})