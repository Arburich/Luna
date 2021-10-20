
   exports.run = async(client, message) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        queue.destroy();

        message.channel.send(`Music stopped into this server, see you next time ✅`);
    };
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User",
	voiceChannel: true,
};

exports.help = {
	name: "stop",
	category: "Music",
	description: "Stops playing music",
	usage: "!stop"
};
