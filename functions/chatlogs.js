const file = require('file-system');
const fs = require('fs');


function save(message) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var millisecond = today.getMilliseconds(); 
    file.access('servers/'+message.guild.id+'/chatlogs', (err) => {
        if (err) {
          file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year);  
          file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month);
          file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day); 
        }else{
            file.access('servers/'+message.guild.id+'/chatlogs/'+year, (err) => {
                if (err) {
                    file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year);  
                    file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month);
                    file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day);     
                }else{
                    file.access('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month, (err) => {
                        if (err) {
                            file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month);
                            file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day);     
                        }else{
                            file.access('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day, (err) => {
                                if (err) {
                                    file.mkdirSync('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day);     
                                }else{
                                    file.access('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day+'/ChatLog.txt', (err) => {
                                        if (err) {
                                            fs.writeFile('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day+'/ChatLog.txt', Date(year, month, day, hour, minute, second, millisecond)+message.author.username+" "+message.content+ "\n", function(err){
                                                if (err) throw err;
                                                console.log('Chat Log for Today created.');
                                            });      
                                        }else{
                                            fs.appendFile('servers/'+message.guild.id+'/chatlogs/'+year+'/'+month+'/'+day+'/ChatLog.txt', Date(year, month, day, hour, minute, second, millisecond)+message.author.username+" "+message.content+ "\n", function (err) {
                                                if (err) throw err;
                                            });
                                        };
                                    });                                    
                                };
                            });
                        };
                    });
                };
            });
        };
    });
};
module.exports.save = save;