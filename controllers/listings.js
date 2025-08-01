const Listing = require('../models/listing');

// List all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings });
};

// Render new listing form
module.exports.renderNewForm = (req, res) => {
    res.render('listings/new');
};

// Show a single listing
module.exports.showListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('owner');
    if (!listing) {
        req.flash('error', 'Listing you requested for does not exist!');
        return res.redirect('/listings');
    }
    res.render('listings/show', { listing });
};

// Create a new listing
module.exports.createListing = async (req, res, next) => {
    try {
        if (!req.file) {
            req.flash('error', 'Image upload failed or missing.');
            return res.redirect('/listings/new');
        }
        const url = req.file.path;
        const filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        await newListing.save();
        req.flash('success', 'New listing Created');
        res.redirect('/listings');
    } catch (e) {
        next(e);
    }
};

// Render edit form
module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing you requested for does not exist!');
        return res.redirect('/listings');
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace('/upload', '/upload/h_300,w_350');
    res.render('listings/edit', { listing, originalUrl });
};

// Update a listing
module.exports.updateListing = async (req, res, next) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }
    if (!updatedListing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    req.flash('success', 'Listing Updated');
    res.redirect(`/listings/${id}`);
};

// Delete a listing
module.exports.destroyListing = async (req, res, next) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    req.flash('success', 'Listing Deleted');
    res.redirect('/listings');
};