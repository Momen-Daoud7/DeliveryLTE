const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const mysqlStore = require('connect-session-sequelize')(session.Store);
const csrf = require('csurf');

const database = require('./config/database');


// load dotenv
dotenv.config({ path: './config/config.env'});

// Mout routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const ships = require('./routes/ships');

const app = express();

// Set static folder
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// session mangament
let mysession = new mysqlStore({db: database});
mysession.sync();

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: mysession
  })
);

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
// app.use('/',async (req,res,next) => {
//   const ship = await Ship.findAll()
//   res.render('index')
// });

const PORT = process.env.PORT || 5000;

// Run the server
database.sync()
	.then(result => {
		app.listen(PORT,console.log(`Server running in ${PORT}`))
	})
	.catch(err => console.log(err));

