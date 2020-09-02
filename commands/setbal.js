const money = require(__dirname + '/../commandStorage/discord-muns.js');
exports.run = async(client, message, args) => {
	if (!args || args.length < 1 || !args[1]) {
		message.channel.send("Incorrect syntax. Use ``!helpme setbal`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
	}

	let memberID = message.mentions.members.first().id;
	let member = message.mentions.members.first();
	money.setBal(memberID, args[1]).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
		message.channel.send(`${member} had ${args[1]} Lunabits set to the total balance. \n**New Total:** ${i.totalbits} Lunabits`);
		return;
	})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["setbalance"],
	permLevel: "Moderator"
};

exports.help = {
	name: "setbal",
	category: "Shop",
	description: "Sets the balance of lunabits of a user",
	usage: "setbal <@user> <Lunabits>"
};
