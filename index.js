//requiring express and morgan
const express = require('express'),
    morgan = require('morgan');

const app = express();

app.use(morgan('common'));

// serving static documentation.html
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh no! Something is wrong!');
});

// JSON movies list
let movieList = [
    {
        title: 'BoJack Horseman',
        creator: 'Raphael Bob-Waksberg',
        genre: 'Drama, Comedy, Animated'
    },
    {
        title: 'The Grand Budapest Hotel',
        creator: 'Wes Anderson',
        genre: ' Adventure, Comedy, Crime'
    },
    {
        title: "It's Always Sunny in Philadelphia",
        creator: 'Glenn Howerton, Rob McElhenney',
        genre: 'Comedy'
    },
    {
        title: 'The Cruise',
        creator: 'Marek Piwowski',
        genre: 'Comedy'
    },
    {
        title: 'Teddy Bear',
        creator: 'Stanislaw Bareja',
        genre: 'Comedy'
    },
    {
        title: 'Isle of Dogs',
        creator: 'Wes Anderson',
        genre: 'Animation, Adventure, Comedy'
    },
    {
        title: 'Futurama',
        creator: 'David X. Cohen, Matt Groening',
        genre: 'Animation, Comedy, Sci-Fi'
    },
    {
        title: 'Rick and Morty',
        creator: 'Dan Harmon, Justin Roiland',
        genre: 'Animation, Adventure, Comedy'
    },
    {
        title: 'South Park ',
        creator: 'Trey Parker, Matt Stone',
        genre: 'Comedy, Satire'
    },
    {
        title: 'Better Call Saul',
        creator: 'Vince Gilligan, Peter Gould',
        genre: ' Crime, Drama'
    }
];

// GET requests, using Express routing syntax
app.get('/', (req, res) => {
    res.send('<h1>Movie Database by the coding szwed-shop </h1>');
});
// GET data about all movies
app.get('/movies', (req, res) => {
    res.json(movieList.title);
});

// GET data about a single movie by title to the user
app.get('/movies/title', (req, res) => {
    res.send('Return a list of ALL movies to the user');
});

// GET data about a genre by type
app.get('/movies/genres/type', (req, res) => {
    res.send('Return data about a genre (description) by name/title (e.g., “Thriller”)');
});

// GET data about a director by name
app.get('/movies/directors/name', (req, res) => {
    res.send('Return data about a director (bio, birth year, death year) by name');
});

// POST new users to the register
app.post('/users', (req, res) => {
    res.send('Allow new users to register');
});

// PUT update to username
app.put('/users/username', (req, res) => {
    res.send('Allow users to update their user info (username)');
});

// POST movie to user's favorites
app.post('/users/username/movies/title', (req, res) => {
    res.send('Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)');
});

// DELETE movie from user's favorites
app.delete('/users/username/movies/title', (req, res) => {
    res.send('Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)');
});

// DELETE a user from registration database
app.delete('/users/username', (req, res) => {
    res.send('Allow existing users to deregister (showing only a text that a user email has been removed)');
});

// listen for requests
app.listen(7777, () => console.log('Your app is listening on port 7777.'));