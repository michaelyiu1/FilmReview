const { Schema, model } = require('mongoose');
// const User = require('./User');
// const Film = require('./Film');


const reviewSchema = new Schema({
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  filmId:
    {
      type: Number,
      required: true
    },
  filmTitle:
    {
      type: STRING
    }
  review: {
    type: STRING,
    required: true,
  },
  rating: {
    type: Number,
  }
});

const Review = model('Review', reviewSchema);

// Aggregate to get the average rating for each film
Review.aggregate([
  {
      $group: {
          _id: '$film',
          ratingAvg: {$avg: '$rating'}
      }
  }
  ], function(err, results){
      if(err){
          console.log(err);
      }else{
          console.log(results);
      }
  }
  );

module.exports = {Review, reviewSchema};
