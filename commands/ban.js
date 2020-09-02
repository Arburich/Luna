var moment = require("moment");
exports.run = async(client, message, args, level) => { // All arguments behind the command name with the prefix
	const user = message.mentions.users.first(); // returns the user object if an user mention exists
	var banReason = args.slice(1).join(' '); // Reason of the ban (Everything behind the mention)
	// Check if an user mention exists in this message
	if (!user) {
		try {
			// Check if a valid userID has been entered instead of a Discord user mention
			if (!message.guild.members.get(args.slice(0, 1).join(' ')))
				throw new Error('Couldn\' get a Discord user with this userID!');
			// If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
			user = message.guild.members.get(args.slice(0, 1).join(' '));
			user = user.user;
		} catch (error) {
			return message.reply('Couldn\' get a Discord user with this userID!');
		}
	}
	if (user === message.author)
		return message.channel.send('I can\'t ban yourself friend.'); // Check if the user mention or the entered userID is the message author himsmelf
	if (!banReason)
		banReason = "user was banned"
			if (!message.guild.member(user).bannable)
				return message.reply('That person is my friend!'); // Check if the user is bannable with the bot's permissions

			await message.guild.members.ban(user) // Bans the user
			message.channel.send(user.toString() + " was removed from Alchemy Den. Permanently. :knife: ")
			var output = "Discord ID: " + user.toString() + " , " + user.username + ", " + user
			 + "\nReason: " + banReason
			 + "\nTime: " + moment().format("h:mma UTC, MM/DD/YYYY")
			 + "\nAction: Permanent Ban"
			client.channels.cache.get("750387828524843068").send(output)
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "ban",
	category: "Moderator",
	description: "Bans Someone",
	usage: "ban <user> <reason> "
};
