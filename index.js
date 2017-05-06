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

/*
bot.post('statuses/update',{status:'Hello World'},function(err,data,response){
    if(err)
    console.log(err);
    else
    console.log(data.text +' was tweeted');
})
*/

/*
bot.get('friends/list',
 { screen_name: 'IbrahimSassi12' },  function (err, data, response) {
      if(err)
    console.log(err);

data.users.forEach(function(element) {
    console.log(element.screen_name)
}, this);
})
*/

//lookup for relation
/*
bot.get('friendships/lookup',
 { screen_name: 'MedFirasOuert' },  function (err, data, response) {
      if(err)
    console.log(err);
    console.log(data);
})
*/

//send message
/*
bot.post('direct_messages/new',{
    screen_name:'MlikiHakim',text:'Hello Yo From Api'},  function (err, data, response) {
      if(err)
    console.log(err);
    console.log(data);
})
*/

//stream timeline
function getBotTimeline()
{
    bot.get('statuses/home_timeline',{count:5},  function (err, data, response) {
        if(err)
        console.log(err);

        data.forEach(function(element) {
                console.log(element.text);
                console.log(element.user.screen_name);

                }, this);

    })
}

//getBotTimeline();

/*
like smthg
bot.post('favorites/create',{id:'******'},function(err,data,response){
            if(err)
        console.log(err);
})
*/

//random stream
/*
var stream = bot.stream('statuses/sample');

stream.on('tweet',function(tweet){
    console.log(tweet.text)
})
*/

//stream with filter
/*
var stream = bot.stream('statuses/filter',{
    track :'Angular'
});

stream.on('tweet',function(tweet){
    console.log(tweet.text)
})
*/

