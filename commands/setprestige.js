const money = require(__dirname + '/../commandStorage/discord-muns.js');
exports.run = async(client, message, args) => {
	if (!args || args.length < 1 || !args[1]) {
		message.channel.send("Incorrect syntax. Use ``!helpme setbal`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
	}

	let memberID = message.mentions.members.first().id;
	let member = message.mentions.members.first();
	money.setPres(memberID, args[1]).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
		message.channel.send(`${member} had ${args[1]} set as their Prestige. \n**New Prestige:** ${i.prestige}`);
		return;
	})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["setpres"],
	permLevel: "User"
};

exports.help = {
	name: "setprestige",
	category: "Shop",
	description: "Sets the prestige number of a user",
	usage: "prestige <@user> <prestige>"
};
