const file = require('file-system');
const fs = require('fs');
function switchPromotionalChannel(client,message,isowner,prefix){
  if(isowner){
    var args = message.content.substring(prefix.length).split(" ");
    var channelName = args[1];
    message.channel.send('Switching the Promotion Channel to '+channelName);
    if(message.guild.channels.find("name", channelName) == undefined){
        message.channel.send('Failed to change promotional channel, channel doesnt exist');
    }else{
      fs.readFile('servers/'+message.guild.id+'/ServerInfo.json', function (err, data) {
          var json = JSON.parse(data);
          if(json.serverinfo.promotion == undefined){
    				console.log('The server doesnt have a promotion channel creating one.');
    				json.serverinfo.promotion = channelName;
    				fs.writeFile('servers/'+message.guild.id+'/ServerInfo.json', JSON.stringify(json), function(err){
    					if(err){console.log('err')}else{
    						console.log('saved promotion channel');
    					};
    				});
    			}else{
            json.serverinfo.promotion = channelName;
            fs.writeFile('servers/'+message.guild.id+'/ServerInfo.json', JSON.stringify(json), function(err){
              if(err){console.log('err')}else{
                console.log('saved promotion channel');
              };
            });
            fs.writeFile('servers/'+message.guild.id+'/ServerInfo.json', JSON.stringify(json), function(err){
              if(err){console.log('err')}else{
                console.log('saved promotion channel');
                message.guild.channels.find('name',channelName).send('This is now the channel for sending promotions.');
              };
            });
    			};
      });
    };
  }else{
    noPerms.noPerms(message);
  };
};
module.exports.switchPromotionalChannel = switchPromotionalChannel;
