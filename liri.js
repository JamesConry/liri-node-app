require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require('moment');


var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var firstArgument = process.argv[2];

var secondArgument = process.argv[3];

var nodeArgs = process.argv;
var completeName="";
for(var j = 3;j<nodeArgs.length;j++){
    completeName += process.argv[j];
}

firstArgument = firstArgument.toLowerCase();
secondArgument = secondArgument.toLowerCase();
//moment().format("MM/DD/YYYY");

//"" 

if(firstArgument === "concert-this"){
    axios.get("https://rest.bandsintown.com/artists/" + secondArgument + "/events?app_id=codingbootcamp").then(
        function(response) {
            for(var i=0;i<response.data.length;i++){
              console.log("The name of the venue is: " + response.data[i].venue.name +
              "\nThe location of the venue is: "+ response.data[i].venue.city + ", "+ response.data[i].venue.region +
              "\nThe date of the event is: "+ moment(response.data[i].datetime).format("MM/DD/YYYY")+ "\n");  
            }
            
        })
}






if(firstArgument === "spotify-this-song"){
    spotify.search({ type: 'track', query: completeName }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    
    console.log(data); 
    });
}




