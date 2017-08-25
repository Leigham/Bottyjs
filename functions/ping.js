
const Discord = require('discord.js');
const oneLine = require('common-tags').oneLine;
const file = require('file-system');
const fs = require('fs');
const noPerms = require('./returnNoPerms.js')

async function pingFunction(message,isOwner,client) {
    if(isOwner){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
            }else{
                noPerms.noPerms(message);
            };
    console.log('test'); 
};
module.exports.pingFunction = pingFunction;