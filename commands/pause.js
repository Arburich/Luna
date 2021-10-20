    exports.run = async(client, message) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    };
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User",
	voiceChannel: true,
};

exports.help = {
	name: "pause",
	category: "Music",
	description: "Pauses the current song",
	usage: "!pause"
};
