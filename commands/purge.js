var moment = require("moment");
exports.run = async(client, message, args, level) => {

	const toDel = args[0]
		if (!args[0]) {
			message.channel.send("Need a number!")
			return
		}
     await message.channel.messages.fetch({ limit: toDel }).then(messages => { // Fetches the messages
    message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
)});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "purge",
	category: "Moderator",
	description: "Purges Stuff",
	usage: "purge <#>"
};
