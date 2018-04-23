# liri-node-app

LIRI is a command line Node app that takes in parameters and gives you back data.

## What Does the App Do?

LIRI takes in four different commands:

* `my-tweets` - Displays the last 20 tweets in your account

* `spotify-this-song <song name>` - Displays the song name, artist, album and a link to the song in Spotify

* `movie-this <movie name>` - Displays the movie title, year it came out, IMDB rating, Rotten Tomatoes rating, the country where the movie was produced, language, plot and cast

* `do-what-it-says` - This will run `spotify-this-song` on the song title in random.txt which is currently set to "I Want It That Way"

## How Did You Make the App?

The app was made using with Node.js and the following NPM packages:

* [Twitter](https://www.npmjs.com/package/twitter) - To access the Twitter API
   
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) - To access Spotify API

* [Chalk](https://www.npmjs.com/package/chalk) - To style the results in the terminal with different colors.
   
* [Request](https://www.npmjs.com/package/request) - For making HTTP calls

* [DotEnv](https://www.npmjs.com/package/dotenv) - To load environment variables

In order to run the program on your local machine, you will also need to obtain your own [Twitter](https://apps.twitter.com/) and [Spotify](https://beta.developer.spotify.com/) API keys.

## What Challenges Did You Encounter?

The most challenging aspect of creating the application was pulling that data I needed out the Spotify JSON object as each song object was quite long and complex.

## What's Next

I'd like to reformat the Tweet created dates into something a little more human readable using [Moment](https://www.npmjs.com/package/moment) but I'll need to read up on the UTC date format first so I don't get the deprecation warning message every time that I run the `my-tweets` command.

I'd also like to add in some other commands to access other APIs for the weather or getting the scores for your favorite sports teams.