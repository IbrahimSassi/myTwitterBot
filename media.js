var Twit = require('twit')
var config = require('./config');
var request = require('request')
var fs = require('fs')

var bot = new Twit({
  consumer_key:        config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


function getPhoto(){
    var parameters = {
        url: 'https://api.nasa.gov/planetary/apod',
        qs: {
            api_key: config.NASA_KEY
        },
        encoding: 'binary'
    };
    request.get(parameters, function(err, response, body){
        body = JSON.parse(body);
        saveFile(body, 'nasa.jpg');
    });
}


function saveFile(body, fileName){
    var file = fs.createWriteStream(fileName);
    request(body).pipe(file).on('close', function(err){
        if (err){
            console.log(err);
        }else{
            console.log('Media saved.');
            var descriptionText = body.title;
            uploadMedia(descriptionText, fileName);
        }
    })
}


function uploadMedia(descriptionText, fileName){
    var filePath = __dirname + '/' + fileName;
    bot.postMediaChunked({file_path: filePath}, function(err, data, response){
        if (err){
            console.log(err);
        }else{
            console.log(data);
            var params = {
                status: descriptionText,
                media_ids: data.media_id_string
            };
            postStatus(params);
        }
    });
}


function postStatus(params){
    bot.post('statuses/update', params, function(err, data, response){
        if (err){
            console.log(err);
        }else{
            console.log('Status posted.');
        }
    });
}

//Post Photo 
//getPhoto();

//post existed video
//uploadMedia('Video from NASA', 'nasa_video.mp4');
