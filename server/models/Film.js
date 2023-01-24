const {Schema, model} = require('mongoose');
const {reviewSchema} = require('./Review');

// Create schema for Film.js
const filmSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    reviews: [reviewSchema]
},
{
    toJSON: {
      virtuals: true,
    },
});

//Create virtual for getting number of reviews
filmSchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
});


const Film = model('Film', filmSchema);

module.exports = Film;