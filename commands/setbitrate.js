    exports.run = async(client, message, args) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        try{
		queue.setBitrate(args[0]);
		}catch(e){
			console.log(`${e}`)
			return
		}

        return message.channel.send(`Set the bitrate to ${args[0]}✅`);
    };
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User",
	voiceChannel: true,
};

exports.help = {
	name: "setbitrate",
	category: "Music",
	description: "sets the bitrate of the current connection(I think?)",
	usage: "!bitrate [bitrate]"
};
