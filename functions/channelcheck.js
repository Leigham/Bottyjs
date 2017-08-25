const file = require('file-system');
const fs = require('fs');
const https = require('https');

function OnlinetChannels(message){
  /*fs.readFile('globalsettings/twitchChannel.json', function (err, data) {
      if(err){
        console.log('err')
      }else{
        var json = JSON.parse(data);
        var channels = json.channels;
        url = 'https://api.twitch.tv/kraken/streams/'++'?client_id=oo9zeembbj69guf7ie1lhsf8dbtf2h';
      };
  });*/
};
module.exports.OnlinetChannels = OnlinetChannels;
