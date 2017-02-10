// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var keys = require("./keys.js");


var fs = require("fs");

//pulling request 

var request = require("request");

var Twitter = require('twitter');

// Load the NPM Package inquirer
var inquirer = require("inquirer");

var Spotify = require('spotify');

// var command = process.argv[2];

// var request = process.argv[3];



console.log("hello");

// Function that looks for and executes liri's command and search 
function liri(command, request) {
    switch (command) {
        case 'my-tweets':
            twitter(request);
            break;
        case 'spotify-this-song':
            spotify(request);
            break;
        case 'movie-this':
            omdB(request);
            break;
        case 'do-what-it-says':
            doWhatISay();
            break;
        default:
            console.log("\nINSTRUCTIONS:\n Enter one of the following commands: \n\n SHOW A USERS MOST RECENT TWEETS: node liri.js my-tweets 'twitter handle'\n SONG INFORMATION: node liri.js spotify-this-song 'song name'\n LEARN MORE ABOUT A MOVIE: node liri.js movie-this 'movie name'\n RUN A COMMAND FROM A TEXT FILE: node liri.js do-what-it-says\n");
    }
}


// twitter API linkage




function twitter() {
	var twitterKeys = keys.twitterKeys;
   
	 var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret

    });

	var twitterID = "dril";
var twitterURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterID + "&count=20";

   
    client.get(twitterURL, function(error, tweets, response) {
    	
    // }


    // 	'statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
           console.log("Your Last 20 Tweets:");
            for(let i = 0; i < tweets.length; i++) {
                console.log("===============================================================");
                console.log([i] + " Tweet: " + tweets[i].text + " " + tweets[i].created_at);
            }
        };
    });
}



//spotify link
function spotify(song) {

    if (!song) {
        song = "bad and boujee";
    }

    var spotify = require('spotify');

   spotify.search({type: 'track', query: song}, function(err, data) {
        if (!err) {
            for (var i = 0; i < 10; i++) {
                if (data.tracks.items[i] != undefined) {

                    log("\n---------------------\n");
                    log('Artist: ' + data.tracks.items[i].artists[0].name); //Artist name
                    log('Song: ' + data.tracks.items[i].name); //song name
                    log('Preview Url: ' + data.tracks.items[i].preview_url) //Preview URL
                    // log('Album: ' + data.tracks.items[0].album.name); //album name

                    log("\n---------------------\n");

                };

            };

        } else {
            log("error occured" + err);
        }

    });

}

//OMDB API movie function

function omdB(movie) {



    if (!movie) {
        movie = "Taxi Driver"
        request('https://api.themoviedb.org/3/search/movie?api_key=cba1b4cbb2e31573ed2bee4f2bac51c8&language=en-US&query=' + movie + '&page=1', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body)

                log("\n---------------------\n");
                log("Title: " + info.results[0].title);
                // log("Starring: " + info.Actors + "/n");
                log("Release Date: " + info.results[0].release_date);
                // log("IMDB Rating: " + info.imdbRating);
                log("Language: " + info.results[0].original_language + "/n");
                log("Plot: " + info.results[0].overview + "/n");
                // log("RT Score: " + info.tomatoUserMeter);
                // log("RT URL: " + info.tomatoURL + "/n");
                log("\n---------------------\n");
            } else {
                console.log("Error occured" + error);
            }


        });

    }
}

function doWhatISay() {
    fs.readFile("random.txt", "utf8", function(error, data) {
          console.log(data);

  var data_array = data.split(",");
  console.log(data_array);
  var songName = data_array[1];
    })
}

// Function to console.log results in Terminal and Append to Log.txt
function log(data) {
    console.log(data);
    fs.appendFile('log.txt', data, 'utf8', function(error) {
        if (error) {
            log('Error occurred' + error);
        }
    })
};



liri(process.argv[2], process.argv[3]);