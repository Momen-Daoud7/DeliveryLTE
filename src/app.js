const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session')
const MongoStore = require('connect-mongo')     
const mongoose = require('mongoose');
const csrf = require('csurf');

const connect = require('./config/database');

const app = express();

// load dotenv
dotenv.config({ path: './config/config.env'});

// connect to database
connect();

// Session managment
app.use(session({
  secret:'3d93jd093jd0jnvhsdaw022h920',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL
  })
}))

// Mout routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const ships = require('./routes/ships');


// Set static folder
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));



app.use(csrf());

app.use((req,res,next) => {
  if (!req.session.user) {
      return next();
    }
  User.findByPk(req.session.user.id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req,res,next) => { 
  app.locals.Auth = req.session.user;
  app.locals._csrf = req.csrfToken();
  next();
});

// Load routes
app.use(auth);
app.use('/users',users);
app.use('/ships',ships);

const PORT = process.env.PORT || 5000;

// Run the server
app.listen(PORT,console.log(`Server running in ${PORT}`))
	

