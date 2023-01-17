const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    getAllUsers: async () => {
      const userData = await User.find({});
      return userData;
    },

    findOneFilm: async (parent, args, context) => {
      if(context.user) {
        const filmData = await Film.findOne({filmId: args});

        return filmData;
      }
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addFilm: async(parent, args, context) => {
      if(context.user){
        const newFilm = await Film.create(args);

        return newFilm;
      }
      throw new AuthenticationError('You need to be logged in to submit a review');
    },

    addReview: async (parent, args, context) => {
      if(context.user){
        const newReview = await Review.Create(args);

        return newReview;
      }  
      throw new AuthenticationError('You need to be logged in to submit a review');
    },

    editReview: async (parent, {reviewData}, context) => {
      if(context.user){
        const updatedReview = await Review.findOneAndUpdate(
          {_id: context.user._id},
          {review: reviewData.review},
          {rating: reviewData.rating},
          {new: true}
        );
        return updatedReview;
      }
    },

    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const removeReview = await Review.findOneAndDelete(
          { _id: reviewId },
        );
        return removeReview
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
