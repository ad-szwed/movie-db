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

app.get('/movies', (req, res) => {
    res.json(movieList);
});

// listen for requests
app.listen(7777, () => console.log('Your app is listening on port 7777.'));