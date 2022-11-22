const { getContext } = require('lighthouse/lighthouse-core/lib/sentry');
const { User, Book } = require('../models');

const resolvers = {
    Query: { // REVISIT: unsure as to whether the relationship b/n users and books is properly established
        me: async (parent, args, context) => {
            return await User.findOne({_id: context.user._id})
        }
        // users: async () => {
        //     return await User.find({}).populate('books').populate({
        //         path: 'books',
        //     });
        // },
        // books: async () => {
        //     return await Book.find({}).populate('users');
        // },
        // book: async (parent, args) => {
        //     return await User.findbyId(args.id).populate('users');
        // },
    },

// Define the functions that will fulfill the mutations

Mutation: { // REVISIT: unsure if the variables in mutation are correctly established
        addUser: async (parent, { username, email, password}) => {

            // Create and return the new User object
            return await User.create({ username, email, password });
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
    },
};

module.exports = resolvers;


