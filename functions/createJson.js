const file = require('file-system');
const fs = require('fs');


    function checkandwrite(message) {
        //Check if the main server json is there.
        file.access('servers/'+message.guild.id+'/ServerInfo.json', (err) => {
            if (err) {
                console.log('Creating ServerJson for'+message.guild.id);
                var Owner = message.guild.ownerID;
                var serverID = message.guild.id;

                fs.readFile('./servers/Templates/TemplateInfo.json', function (err, data) {
                    var json = JSON.parse(data);
                    json.serverinfo["id"] = message.guild.id
                    json.serverinfo.owners.push({"id":message.guild.ownerID});

                    fs.writeFile('servers/'+message.guild.id+'/ServerInfo.json', JSON.stringify(json), function(err){
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                        message.channel.send('We have added your server to the database, the Owner for the server is <@'+message.guild.ownerID+'> please contact me on discord https://discord.gg/76fdcyp if this is wrong.');
                    });
                });
            } else {
                console.log('ServerInfo for'+message.guild.id+ 'Already Exists');
            };
        });
    };
    module.exports.checkandwrite = checkandwrite;
