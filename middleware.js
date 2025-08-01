const Listing = require('./models/listing');
const Review = require('./models/review');
const ExpressError = require('./utils/expressError.js');
const { listingSchema } = require('./schema.js');
const { reviewSchema } = require('./schema.js');
const dns = require('dns').promises;
const User = require('./models/user');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash('error', 'You must be logged in to create listing!');
    return res.redirect('/login');
  }
  next();
}

module.exports.validateSignup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    req.flash('error', 'Username already in use');
    return res.redirect('/signup');
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    req.flash('error', 'Email already in use');
    return res.redirect('/signup');
  }

  const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  if (!usernameRegex.test(username)) {
    req.flash('error', 'Username must be 3–15 characters and contain only letters or numbers');
    return res.redirect('/signup');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    req.flash('error', 'Invalid email format');
    return res.redirect('/signup');
  }

  // Check email domain's MX records
  const domain = email.split('@')[1];
  try {
    const addresses = await dns.resolveMx(domain);
    if (!addresses || addresses.length === 0) {
      req.flash('error', 'Email domain is invalid or not accepting mail');
      return res.redirect('/signup');
    }
  } catch (err) {
    req.flash('error', 'Email domain is invalid');
    return res.redirect('/signup');
  }

  if (!password || password.length < 6) {
    req.flash('error', 'Password must be at least 6 characters long');
    return res.redirect('/signup');
  }

  next();
};



module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash('error', "You don't have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(', ');
    return next(new ExpressError(400, errMsg));
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(', ');
    return next(new ExpressError(400, errMsg));
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash('error', "You are not author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}