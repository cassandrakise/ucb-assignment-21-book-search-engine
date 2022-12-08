const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: { // REVISIT: unsure as to whether the relationship b/n users and books is properly established
        me: async (parent, args, context) => {
          if(context.user){
            return await User.findOne({_id: context.user._id})
          }
          throw new Error('Not logged in')
        }
    },

// Define the functions that will fulfill the mutations

Mutation: { // REVISIT: unsure if the variables in mutation are correctly established
        addUser: async (parent, { username, email, password}) => {

            // Create and return the new User object
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
        login: async (parent, { email, password}) => {
          const user = await User.findOne({ email });

          if(!user) {
            throw 'there is not user';
          }
          const correctPW = await user.isCorrectPassword(password);
          if(!correctPW){
            throw 'pw error'
          }
          const token = signToken(user);
          return { token, user };

        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
        removeBook: async (parent, {bookId}, context) => {
          if (context.user) {
            const updatedBook = await User.
            findOneAndUpdate(
              { _id: context.user._id},
              { $pull: { savedBooks: {bookId} }},
              { new: true}
            );

            return updatedBook;
          }
          throw new AuthenticationError('You need to be logged in!');
        }
    },
};

module.exports = resolvers;


