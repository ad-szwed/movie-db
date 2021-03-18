//requiring modules
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser')
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    app = express(),
    Movies = Models.Movie,
    Users = Models.User,
    passport = require('passport');
require('./passport');

let auth = require('./auth')(app);



app.use(bodyParser.json());

app.use(morgan('common'));

//connecting mongoose with my db so it cand CRUD
mongoose.connect('mongodb://localhost:27017/moviedb', { useNewUrlParser: true, useUnifiedTopology: true });

// serving static documentation.html
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh no! Something is wrong!');
});


// GET requests, using Express routing syntax
app.get('/', (req, res) => {
    res.send('Movie Database by the coding szwed-shop');
});

// GET all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET specific movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ title: req.params.title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET data about a genre by title
app.get('/movies/genres/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ title: req.params.title })
        .then((movie) => {
            res.status(201).json(movie.genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET director by name
app.get('/movies/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'director.name': req.params.name })
        .then((director) => {
            res.status(201).json(director.director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET a specific user
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ username: req.params.username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// POST new users to the register
app.post('/users', (req, res) => {
    Users.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.username + ' already exists');
            } else {
                Users
                    .create({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        birthday: req.body.birthday // yyyy/mm/dd !
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// PUT update to username
app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, {
        $set:
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
        }
    },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

// POST movie to user's favourites
app.post('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, {
        $push: { favouriteMovies: req.params.movieID }
    },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

// DELETE movie from user's favourites
app.delete('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username },
        { $pull: { favouriteMovies: req.params.movieID } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

// DELETE a user from database
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.username + ' was not found');
            } else {
                res.status(200).send(req.params.username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// listen for requests
app.listen(7777, () => console.log('Your app is listening on port 7777.'));