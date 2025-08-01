const Joi = require('joi');

// Listing validation schema
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Title is required.',
        'string.min': 'Title must be at least 3 characters.',
        'string.max': 'Title must be at most 100 characters.'
      }),
    description: Joi.string()
      .trim()
      .min(10)
      .max(2000)
      .required()
      .messages({
        'string.empty': 'Description is required.',
        'string.min': 'Description must be at least 10 characters.',
        'string.max': 'Description must be at most 2000 characters.'
      }),
    image: Joi.string()
      .uri({ allowRelative: true })
      .allow('', null)
      .messages({
        'string.uri': 'Image must be a valid URL.'
      }),
    price: Joi.number()
      .min(0)
      .max(1000000)
      .required()
      .messages({
        'number.base': 'Price must be a number.',
        'number.min': 'Price cannot be negative.',
        'number.max': 'Price is too high.'
      }),
    country: Joi.string()
      .trim()
      .min(2)
      .max(56)
      .required()
      .messages({
        'string.empty': 'Country is required.',
        'string.min': 'Country name is too short.',
        'string.max': 'Country name is too long.'
      }),
    location: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Location is required.',
        'string.min': 'Location is too short.',
        'string.max': 'Location is too long.'
      })
  }).required()
});

// Review validation schema
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number()
      .required()
      .min(1)
      .max(5)
      .messages({
        'number.base': 'Rating must be a number.',
        'number.min': 'Rating must be at least 1 star.',
        'number.max': 'Rating cannot exceed 5 stars.'
      }),
    comment: Joi.string()
      .trim()
      .min(3)
      .max(1000)
      .required()
      .messages({
        'string.empty': 'Comment is required.',
        'string.min': 'Comment must be at least 3 characters.',
        'string.max': 'Comment must be at most 1000 characters.'
      })
  }).required()
});