const file = require('file-system');
const fs = require('fs');
const pingFunction = require('./ping.js');
const switchPromotionalChannel = require('./promotionchannelchange.js')

function SortCommands(message,prefix,client) {
    var args = message.content.substring(prefix.length).split(" ");
    var isOwner = false;

    fs.readFile('servers/'+message.guild.id+'/ServerInfo.json', 'utf8', function (err,data) {
        if(err){console.log('err')}else{
            var json = JSON.parse(data);
            for (i in json.serverinfo.owners) {
                if(json.serverinfo.owners[i].id == message.author.id){
                    var isOwner = true;
                };
            };
            if(isOwner){
                console.log('Server Owner Activating Command');
            };

            //console.log(message);
            switch (args[0]){
                case "ping":
                   pingFunction.pingFunction(message,isOwner,client);
                break;
                case "setPrmChannel":
                  switchPromotionalChannel.switchPromotionalChannel(client,message,isOwner,prefix);
                break
            };
        };
    });
};
module.exports.SortCommands = SortCommands;
