require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");



var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var firstArgument = process.argv[2];

var secondArgument = process.argv[3];

var nodeArgs = process.argv;
var completeName="";
if(nodeArgs.length>3){
    for(var j = 3;j<nodeArgs.length;j++){
        completeName += process.argv[j] + " ";
    }
    completeName = completeName.trim();
    secondArgument = secondArgument.toLowerCase();
}

firstArgument = firstArgument.toLowerCase();


function getConcert(nameOfConcert){
    axios.get("https://rest.bandsintown.com/artists/" + nameOfConcert + "/events?app_id=codingbootcamp").then(
        function(response) {
            for(var i=0;i<response.data.length;i++){
              console.log("The name of the venue is: " + response.data[i].venue.name +
              "\nThe location of the venue is: "+ response.data[i].venue.city + ", "+ response.data[i].venue.region +
              "\nThe date of the event is: "+ moment(response.data[i].datetime).format("MM/DD/YYYY")+ "\n");  
            }
        })
}


function getSongs(nameOfSong){
    spotify.search({ type: 'track', query: nameOfSong }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
        else{
            for(var i=0;i<data.tracks.items.length;i++){
                var allArtists = "";
                for(var k = 0; k<data.tracks.items[i].artists.length;k++){
                    allArtists += data.tracks.items[i].artists[k].name + ",";
                }
                allArtists = allArtists.slice(0, -1);
                console.log("The artist is: " + allArtists +
                "\nThe name of the song is: "+data.tracks.items[i].name +
                "\nThe spotify link to the song is: "+ data.tracks.items[i].external_urls.spotify+
                "\nThe Album this song is from is: "+ data.tracks.items[i].album.name+"\n");
            }
        }
    });
}

function getMovie(movie){
    axios.get("http://www.omdbapi.com/?t="+movie+"&apikey=trilogy").then(
        function(response) {
            console.log("Title: "+ response.data.Title+
            "\nYear of Release: "+ response.data.Year+
            "\nIMDB rating: "+ response.data.imdbRating+
            "\nRottenTomatoes rating: "+ response.data.Metascore+
            "\nCountry of Production: "+ response.data.Country+
            "\nLanguage: "+ response.data.Language+
            "\nPlot: "+ response.data.Plot+
            "\nActors: "+ response.data.Actors+"\n");
        })
}





if(firstArgument === "concert-this"){
    getConcert(secondArgument);
}

if(firstArgument === "spotify-this-song"){
    if(completeName === ""){
        getSongs("The Sign");
    }
    else{
        getSongs(completeName);
    }
}

if(firstArgument === "movie-this"){
    if(completeName === ""){
        getMovie("Mr. Nobody");
    }
    else{
        getMovie(completeName);
    }
}

if(firstArgument === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");

        switch(dataArr[0]){
            case "concert-this":
                getConcert(dataArr[1])
                break;
            
            case "spotify-this-song":
                getSongs(dataArr[1])
                break;

            case "movie-this":
                getMovie(dataArr[1])
                break;

        }
      
      });
}
