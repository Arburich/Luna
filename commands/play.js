const {
	QueryType
} = require('discord-player');

exports.run = async(client, message, args, level) => {
	if (!args[0])
		return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

	const res = await player.search(args.join(' '), {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO
		});

	if (!res || !res.tracks.length)
		return message.channel.send(`No results found ${message.author}... try again ? ❌`);
	
	const queue = await player.createQueue(message.guild, {
			ytdlOptions: {
				quality: "highest",
				filter: "audioonly",
				highWaterMark: 1 << 25,
				dlChunkSize: 0,
			},

			metadata: message.channel
		});
	try {
		//console.log(message.member.voice)
		if (!queue.connection)
			await queue.connect(message.member.voice.channel);
	} catch (error) {
		console.log(error)
		await player.deleteQueue(message.guild.id);
		return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
	}

	await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

	res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

	if (!queue.playing)
		await queue.play();

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User",
	voiceChannel: true,
};

exports.help = {
	name: "play",
	category: "Music",
	description: "Plays a song",
	usage: "!play [song name / URL]"
};
