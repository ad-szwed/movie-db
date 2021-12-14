const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: {
        name: [String]
    },
    director: {
        name: String,
        bio: String
    },
    imageURL: String,
    featured: Boolean
});

let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: Date,
    favouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// BCRYPT
/**
 * Function to hash a password that only encrypted passwords are stored in the database
 * @param {string} password
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

/**
 * Function to compare the hashed password in the database with the password that users enter
 * @param {string} password
 */
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;