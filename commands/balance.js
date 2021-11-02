const money = require(__dirname + '/../commandStorage/discord-muns.js');
exports.run = async(client, message, args, level) => {
	if (!args[0]) {
		money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
			const embed1 = {
				"color": 15866827,
				"title": "__**Balance**__",
				"description": "\n**" + i.money + "** Lunabits Available\n**" + i.totalbits + "** Lifetime Collected\n**" + i.prestige + "** Prestiges",
				"thumbnail": {
					url: picture(i.money)
				}
			};
			message.channel.send({
				embeds:[embed1]
			});

		})
	} else {
		let member = message.mentions.members.first().id;
		money.fetchBal(member).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
			const embed1 = {
				"color": 15866827,
				"title": "__**Balance of User Mentioned**__",
				"description": "\n**" + i.money + "** Lunabits Available\n**" + i.totalbits + "** Lifetime Collected\n**" + i.prestige + "** Prestiges",
				"thumbnail": {
					url: picture(i.money)
				}
			};
			message.channel.send({
				embeds:[embed1]
			});
		})
	}
}

function picture(j) {

	if (j == 0) {
		return "https://i.imgur.com/67zRfy7.gif";
	} else {
		return "https://i.imgur.com/67zRfy7.gif";
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "balance",
	category: "Shop",
	description: "Shows your balance of Lunabits",
	usage: "balance"
};
