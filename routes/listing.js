const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });
const listingController = require('../controllers/listings.js');

// List all listings & create new listing
router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

// Render new listing form
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Show, update, or delete a single listing
router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Render edit form for a listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// 405 Method Not Allowed for unsupported methods
router.all('/', (req, res) => res.sendStatus(405));
router.all('/new', (req, res) => res.sendStatus(405));
router.all('/:id', (req, res) => res.sendStatus(405));
router.all('/:id/edit', (req, res) => res.sendStatus(405));

module.exports = router;