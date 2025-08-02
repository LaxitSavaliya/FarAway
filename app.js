// Core modules and dependencies
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const ExpressError = require('./utils/expressError.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

// Route modules
const listingsRouter = require('./routes/listing');
const reviewsRouter = require('./routes/review');
const userRouter = require('./routes/user.js');

// App initialization
const app = express();

// View engine and middleware setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection and session store setup
const dbUrl = process.env.DB_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 60 * 60,
});

store.on('error', function(e) {
  console.log('Session store error', e);
});

// Session and flash configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: true, // Changed to true for debugging
  saveUninitialized: true, // Changed to true for debugging
  cookie: {
    secure: false, // Simplified for resume project
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// CSRF protection removed - using other security measures

// Flash message middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  console.log('Current user in middleware:', req.user ? req.user.username : 'Not logged in');
  // CSRF token removed - using other security measures
  next();
});

// Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.redirect('/listings');
});

// Debug route to check user authentication
app.get('/debug-user', (req, res) => {
  res.json({
    user: req.user ? { username: req.user.username, id: req.user._id } : null,
    session: req.session,
    isAuthenticated: req.isAuthenticated()
  });
});

app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/', userRouter);

// 404 handler
app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page NOT Found.'));
});

// Centralized error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err); // Prevents double response
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong';
  res.status(err.statusCode).render('listings/error.ejs', { err });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});