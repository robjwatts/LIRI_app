var key = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter(key.twitterKeys)
var liri= process.argv[2];
var media = process.argv[3];
var spotify = require('spotify');
var omdb = require('request')
var params = {screen_name: 'i love pizza'};
var fs = require('fs')
switch(liri){
  case 'movie-this':
  film();
  break;
  case 'my-tweets':
  tweets();
  break;
  case 'spotify-this-song':
  spotifymusic();
  break;

}
function film(){

 omdb('http://www.omdbapi.com/?t='+ media +'&y=&plot=short&r=json', function (error, response, body) {
   if (!error && response.statusCode == 200) {
     var json = JSON.parse(body);
   console.log("Title: " + json.Title);
   console.log("Year: " + json.Year);
   console.log("IMBD Rating: " + json.imdbRating);
   console.log("Country: " + json.Country);
   console.log("Plot: " + json.Plot);
   console.log("Actors: " + json.Actors);
   console.log("Metacore: " + json.Metascore);



   }
  
 });
}
function tweets(){
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {

      for (var i =0; i<tweets.length; i++){
        console.log(tweets[i].text);
      }

    }

  });
}
function  spotifymusic(){
  fs.appendFile('random.txt' , ", " + media );
  spotify.search({ type: 'track', query: media }, function(err, data){
   console.log(data.tracks.items[0].artists[0]);
   console.log(data.tracks.items[0].name);
   console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].preview_url);

 });
}
