var Twit = require('twit')
var config = require('./config');
var bot = new Twit({
  consumer_key:        config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


bot.post('statuses/update',{status:'Hello World'},function(err,data,response){
    if(err)
    console.log(err);
    else
    console.log(data.text +' was tweeted');
})

