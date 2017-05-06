var Twit = require('twit');
var Tabletop = require('tabletop');
var config = require('./config');
var bot = new Twit({
  consumer_key:        config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
    timeout_ms: 60 * 1000
});

var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1jiG2gtEbYcltAkR84nYGMZbuC09Aysef4nJyJfjR7VU/pubhtml';

Tabletop.init({
    key: spreadsheetUrl,
    callback: function(data, tabletop){
        console.log(data);
        data.forEach(function(d){
            var status = d.URL + ' is a great API to use for Twitter bots!';
            bot.post('statuses/update', {status: status}, function(err, response, data){
                if (err){
                    console.log(err);
                }else{
                    console.log('Posted!');
                }
            });
        });
    },
    simpleSheet: true
});















