const {
	version
} = require("discord.js");
const moment = require("moment");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require("moment-duration-format");

exports.run = (client, message, args, level) => {

	const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
	message.channel.send(`= Luna Status =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Github     :: https://github.com/Arburich/Luna
= Luna was created by Arburich <3. Thanks Luna! =`, {
		code: "asciidoc"
	});
};
// • Minecraft  :: ${MCserver}
// • Website    :: ${website}

//• Servers    :: ${client.guilds.size.toLocaleString()}
//• Channels   :: ${client.channels.size.toLocaleString()}
//• Discord.js :: v${version}
//• Node       :: ${process.version}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["stats", "stat", "s"],
	permLevel: "User"
};

exports.help = {
	name: "status",
	category: "Miscelaneous",
	description: "Luna's Processes and seeing if things are offline",
	usage: "stats"
};
