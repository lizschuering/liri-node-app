// Required packages
require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var chalk = require("chalk");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

// Variable that will store the users command.
var input = process.argv.slice(2,3);
// Variable that will store a song or movie title if the user enters one
var searchInput = process.argv.slice(3).join(" ");
//console.log("What the user wants to do: ", input);
//console.log("The user's search: ", searchInput);
//console.log("The user's song length: ", searchInput.length);

// Appends the value of 'input' and 'searchInput' to the log.txt file
fs.appendFile("log.txt", input + "," + searchInput + "\n", function(err) {

  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }
});

//my-tweets Function
var getMyTweets = function () {
  var client = new Twitter(keys.twitter);
  var params = {screen_name: 'lizsch'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i=0; i < tweets.length; i++){
      console.log(chalk.red("Tweet: ") + chalk.cyan(tweets[i].text) + chalk.red(" Date Created: ") + chalk.cyan(tweets[i].created_at));
    }
  }
});
}

//spotify-this-song Function
var spotifyThisSong = function (searchInput) {
  var spotify = new Spotify(keys.spotify);

  if (searchInput.length > 0) {
    spotify.search({type: 'track', query: searchInput, limit: 5}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(chalk.green("Artist(s) Name: "), chalk.blue(data.tracks.items[0].artists[0].name)); // Artist Name
      console.log(chalk.green("Track Name: "), chalk.blue(data.tracks.items[0].name)); // Track Name
      console.log(chalk.green("Track Link: "), chalk.blue(data.tracks.items[0].external_urls.spotify)); //Track Link
      console.log(chalk.green("Album Name: "), chalk.blue(data.tracks.items[0].album.name)); // Album Name
      console.log("----------------------");
    });
  } else {
    spotify.search({type: 'track', query: "Ace of Base The Sign", limit: 5}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(chalk.green("Artist(s) Name: "), chalk.blue(data.tracks.items[0].artists[0].name)); // Artist Name
      console.log(chalk.green("Track Name: "), chalk.blue(data.tracks.items[0].name)); // Track Name
      console.log(chalk.green("Track Link: "), chalk.blue(data.tracks.items[0].external_urls.spotify)); //Track Link
      console.log(chalk.green("Album Name: "), chalk.blue(data.tracks.items[0].album.name)); // Album Name
      console.log("----------------------");
    });
  }
}

//movie-this Function
var movieThis = function (searchInput) {
  if (searchInput.length > 0) {
    request("http://www.omdbapi.com/?t="+searchInput+"&y=&plot=short&apikey=518c0761", function(error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log(chalk.magenta("Title: ") + JSON.parse(body).Title);
      console.log(chalk.magenta("Year: ") + JSON.parse(body).Year);
      console.log(chalk.magenta("IMDB Rating: ")+ JSON.parse(body).imdbRating);
      console.log(chalk.magenta("Rotten Tomatoes: ") + JSON.parse(body).Ratings[1].Value);
      console.log(chalk.magenta("Country: ") + JSON.parse(body).Country);
      console.log(chalk.magenta("Language: ") + JSON.parse(body).Language);
      console.log(chalk.magenta("Plot: ") + JSON.parse(body).Plot);
      console.log(chalk.magenta("Cast: ") + JSON.parse(body).Actors);
    }
});
} else {
  request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=518c0761", function(error, response, body){
    if (!error && response.statusCode === 200) {
      console.log(chalk.magenta("Title: ") + JSON.parse(body).Title);
      console.log(chalk.magenta("Year: ") + JSON.parse(body).Year);
      console.log(chalk.magenta("IMDB Rating: ")+ JSON.parse(body).imdbRating);
      console.log(chalk.magenta("Rotten Tomatoes: ") + JSON.parse(body).Ratings[1].Value);
      console.log(chalk.magenta("Country: ") + JSON.parse(body).Country);
      console.log(chalk.magenta("Language: ") + JSON.parse(body).Language);
      console.log(chalk.magenta("Plot: ") + JSON.parse(body).Plot);
      console.log(chalk.magenta("Cast: ") + JSON.parse(body).Actors);
    }
  });
}
}

//do-what-it-says Function
var doSomethingElse = function () {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataFromRandom = data.split(",");
  
    var input = dataFromRandom[0];
    var searchInput = dataFromRandom[1];

    if (input == "spotify-this-song") {
      spotifyThisSong(searchInput);
    }

    // Testing other commands
    // if (input == "movie-this") {
    //   movieThis(searchInput);
    // }
  });
}

//If statements that will trigger the functions based on the user input

if (input == "my-tweets") {
  getMyTweets();
}

if (input == "spotify-this-song") {
  spotifyThisSong(searchInput);
}

if (input == "movie-this") {
  movieThis(searchInput);
}

if (input == "do-what-it-says") {
  doSomethingElse();
}