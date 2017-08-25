function getPrefix(message){
    var server = message.guild;
    fs.readFile('./servers/Templates/TemplateInfo.json', function (err, data) {
      if(err){
        var prefix = "!";
      }else{
        var json = JSON.parse(data);
        prefix = json.serverinfo.prefix;
        if(prefix == undefined)then{
          prefix = "!";
          json.serverinfo["prefix"] = prefix;
          fs.writeFile('servers/'+message.guild.id+'/ServerInfo.json', JSON.stringify(json), function(err){
            if(err){
              console.log('There was an issue resolving the prefix.');
            }else{
              console.log('got prefix');
            };
          });
        };
      };
    });
    console.log(prefix);
    return callback(prefix);
};
module.exports.getPrefix = getPrefix;
