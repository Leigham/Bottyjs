function noPerms(message) {
    message.channel.send('Sorry '+message.author+' You dont have permission to use this command');
};
module.exports.noPerms = noPerms;