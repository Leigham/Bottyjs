//setting consts.
const Discord = require('discord.js');
const client = new Discord.Client();
const oneLine = require('common-tags').oneLine;
const file = require('file-system');
const fs = require('fs');
const prefix = ">";
const checkandcreate = require('./functions/createJson.js');
const commandSort = require('./functions/commands.js');
const pingFunction = require('./functions/ping.js');
const getPrefix = require('./functions/getPrefix.js');
//const twitchConnect = require('./functions/twitch.js');



client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on('message', async message => {
  if(message.author.equals(client.user))return;//tell the bot to ignore its own messages.
  testPrefix = getPrefix.getPrefix(message);
  if(!message.content.startsWith(prefix))return;//if its not a prefix. ignore it.
  if(message.guild == undefined) {
    //Its a pm
  }else{//Its a Server :)
      file.access('servers/'+message.guild.id, (err) => {
        if (err) {
          console.log('File does not exist, creating');
          //Create if not there.
          file.mkdirSync('servers/'+message.guild.id);
          message.channel.send('Your server was not found in our database, adding now');
        }else{
            console.log('infoalreadyexists');
          };
      });
      checkandcreate.checkandwrite(message);
  };
  commandSort.SortCommands(message,prefix,client);

});
//Logging in.
client.login('MzQ4NTgzNDEwMzEyMTUxMDQw.DHsHCg.m7uvvX_vvp8YW1t_-43L2YIV7W4');
