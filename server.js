// var http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');



// passport config
require('./config/passport')(passport);

const app = express();

// DB
const db = require('./config/keys').MongoURI;

// Connect Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoBD Connected...'))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// STATICFILES
app.use(express.static(path.join(__dirname, 'assets')))

// BodyParser
app.use(express.urlencoded({ extended: false }));

// EXPRESS SESSION
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})




// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/game', require('./routes/game'));
app.use('/admin', require('./routes/admin'));

// multer 


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server Started on port ${PORT}`)); 
// function onRequest(request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.write('Hello World');
//     response.end();
// }

// http.createServer(onRequest).listen(8000);
