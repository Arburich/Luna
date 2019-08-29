const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

var ms = require('../modules/minestat');
  var MCserver = "check failed"
  ms.init('minecraft.alchemyden.com', 25565, function(result)
{
  //message.channel.send("Minecraft server status of " + ms.address + " on port " + ms.port + ":");
  if(ms.online)
  {
    MCserver = "Online"
    //message.channel.send("Server is online running version " + ms.version + " with " + ms.current_players + " out of " + ms.max_players + " players.");
    //message.channel.send("Message of the day: " + ms.motd);
    //message.channel.send("Latency: " + ms.latency + "ms");
  }
  else
  {
    //message.channel.send("Server is offline!");
    MCserver = "Offline"
  }
});
var ping = require('ping');
var website = "Check Failed"
var hosts = ['google.com'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        website = isAlive ? "Online" : "Offline";
    });
});

exports.run = (client, message, args, level) => { 
  
  
  
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= Luna Status =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Minecraft  :: ${MCserver}
• Website    :: ${website}
• Github     :: https://github.com/Arburich/Luna
= Luna was created by Arburich <3. Thanks Luna! =`, {code: "asciidoc"});
};
//• Servers    :: ${client.guilds.size.toLocaleString()}
//• Channels   :: ${client.channels.size.toLocaleString()}
//• Discord.js :: v${version}
//• Node       :: ${process.version}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["stats","stat","s"],
  permLevel: "User"
};

exports.help = {
  name: "status",
  category: "Miscelaneous",
  description: "Luna's Processes and seeing if things are offline",
  usage: "stats"
};
