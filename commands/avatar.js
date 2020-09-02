exports.run = async(client, message, args, level) => {
	if (!args || args.length < 1)
		return message.channel.send(message.author.avatarURL());
	let member = message.mentions.members.first();
	message.channel.send(member.user.avatarURL());
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "avatar",
	category: "Custom Commands",
	description: "Shows the Avatar of a User that is mentioned",
	usage: "avatar <@name> "
};
