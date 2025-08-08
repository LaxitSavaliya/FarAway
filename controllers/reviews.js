const ExpressError = require('../utils/expressError.js');
const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.createReview = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return next(new ExpressError(404, 'Listing not found'));
        const newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash('success', 'New review Created');
        res.redirect(`/listings/${listing._id}`);
    } catch (e) {
        next(e);
    }
};

module.exports.destroyReview = async (req, res, next) => {
    try {
        const { id, reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash('error', 'Review not found');
            return res.redirect(`/listings/${id}`);
        }
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash('success', 'Review Deleted');
        res.redirect(`/listings/${id}`);
    } catch (e) {
        next(e);
    }
};