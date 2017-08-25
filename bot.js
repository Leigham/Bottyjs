//setting consts.
const Discord = require('discord.js');
const client = new Discord.Client();
const oneLine = require('common-tags').oneLine;
const file = require('file-system');
const fs = require('fs');
const prefix = ">";
const checkandcreate = require('./functions/createJson.js');
const commandSort = require('./functions/commands.js');
const saveMessage = require('./functions/chatlogs.js');
const pingFunction = require('./functions/ping.js');
const twitchConnect = require('./functions/twitch.js');



client.on('ready', () => {
  console.log('I am ready!');
  console.log(client.guilds.channels)
  twitchConnect.twitchConnect(client);

});

client.on("message", async message => {
    //console.log(message.content);
    //PM CHECK//

    if(message.author.equals(client.user))return;
    //Twitch Advertising Check

    if(!message.content.startsWith(prefix))return;
    if(message.guild == undefined){

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
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});
// Create an event listener for new guild members
client.on('guildMemberRemove', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Welp Fuck you then, ${member}!`);

  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welp Fuck you then ${member}`);
});
//Logging in.
client.login('MzQ4NTgzNDEwMzEyMTUxMDQw.DHsHCg.m7uvvX_vvp8YW1t_-43L2YIV7W4');
