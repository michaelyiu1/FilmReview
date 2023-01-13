const { Schema } = require('mongoose');


const reviewSchema = new Schema({
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  film:
    {
      type: Schema.Types.ObjectId,
      ref: 'Film'
    },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Integer,
    required: true
  }
});

const Review = model('review', reviewSchema);

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

module.exports = Review;
