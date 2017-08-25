const https = require('https');
const fs = require('fs');
const discord = require('discord.js');

function twitchConnect(client){
	console.log('Launching twitch Api');
	var guilds = client.guilds;
	//console.log(guilds)
	//console.log(guilds.array());
	for(var id in guilds.array()){
		//console.log(guilds.array()[id].id);
		var ThisGuild = client.guilds.find("id", guilds.array()[id].id);
		console.log(client.guilds.find("id", guilds.array()[id].id).name);
		fs.readFile('servers/'+guilds.array()[id].id+'/ServerInfo.json', function (err, data) {
			if(err) {
				console.log('err');
			}else{
				const json = JSON.parse(data);
				if(json.serverinfo.promotion == undefined){
					console.log('The server doesnt have a promotion channel creating one.');
					json.serverinfo.promotion = "";
					fs.writeFile('servers/'+guilds.array()[id].id+'/ServerInfo.json', JSON.stringify(json), function(err){
						if(err){console.log('err')}else{
							console.log('saved promotion channel');
						};
					});
				}else{
					var channelArray = client.guilds.find("id", guilds.array()[id].id).channels.array();
					for(var name in ThisGuild.channels.array()){
						console.log(ThisGuild.channels.array()[name].name);
						if(ThisGuild.channels.array()[name].name == json.serverinfo.promotion){
							//ThisGuild.channels.array()[name].send('Bot Started, this channel will be used for twitch promotions.');
							console.log('should send message');
						};
					};
				};
			};
		});
		var StreamChecker = setInterval(function(){


			var its_leighamOnline = false;
			var its_leighamOnlineTimer = 0;
			https.get('https://api.twitch.tv/kraken/streams/its_leigham?client_id=oo9zeembbj69guf7ie1lhsf8dbtf2h', (res)=>{
				var body = "";
				res.on("data", (chunk) => {
					body += chunk;
				});
				res.on("end", ()=>{
					var json = JSON.parse(body);
					if(json.stream == null){
						if(!its_leighamOnline){

						}else{
							its_leighamOnline = false;
							console.log('stream is offline');
						};
					}else{
						if(its_leighamOnline){
								console.log('stream is online');
								its_leighamOnlineTimer = its_leighamOnlineTimer + 2;
								if(its_leighamOnlineTimer >= 60){
									its_leighamOnlineTimer = 0;
									//Let them know hes still active.
								};
						}else{
								its_leighamOnline = true;
						};
					};
				});
			});




		},2*60*1000);














	};
};


module.exports.twitchConnect = twitchConnect;
