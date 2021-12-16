# movieDB API v1.0

Backend of movieDB MERN stack app, a RESTful API that provides information about movies, directors, and genres from Mongo db

Find the React client repo [here](https://github.com/ad-szwed/moviedb-client)

Find the Angular client repo [here](https://github.com/ad-szwed/movie-db-angular)

## Features

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL) about a single movie by title to the user
- Return data about a genre by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

## Core Back-End Technologies

- MongoDB
- Express.js
- Node.js
- Mongoose
- Heroku
- NPM

## Authentication

The app uses JWT (token-based) authentication with the help of passport.js.
