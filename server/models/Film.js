const {Schema, model} = require('mongoose');
const reviewSchema = require('./Review');

// Create schema for Film.js
const filmSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},
{
    toJSON: {
      virtuals: true,
    },
});

//Create virtual for getting number of reviews
filmSchema.virtual('reviewCount').get(function () {
    return this.reviews.;
});


const Film = model('Film', filmSchema);

module.exports = Film;