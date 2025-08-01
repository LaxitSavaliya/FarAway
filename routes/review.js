const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const reviewController = require('../controllers/reviews.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');

// Middleware for validating review input


// Create a new review
router.post(
  '/',
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete a review
router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;