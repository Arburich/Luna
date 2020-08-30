const money = require('./discord-muns.js');
exports.run = async(client, message, args) => {
	if (!args) {
		message.channel.send("Incorrect syntax. Use !helpme shop for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
	}
	if (args[0] === "list") {
		message.channel.send(`= Shop Items! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ =

• 1.) Server Emoji Slot :: 50 Lunabits 
    > The buyer can buy an emoji slot. Needs to fit 500x500px. 

• 2.) Custom Command    :: 50 Lunabits
    > Buys one !{command} that can use a basic chat reply. You can add links, picture links, or \"something fancy\".

• 3.) Animated Emoji    :: 50 Lunabits
    > Buys you a single Animated Emoji Slot. Nitro only!
	
• 4.) Prestige Yourself    :: 1000 Lifetime Lunabits
    > Your ENTIRE lifetime total will be reset to 0, and your ranks will be removed, to gain a single point of Prestige for every 1000 bits you have! 
	> Choose this VERY wisely, as it cannot be undone. This does NOT affect your balance. Only Lifetime total.  

=  Note: All items can be rejected at Moderator discretion.  =
= If you have suggestions for more items, let Arburich know! =`, {
			code: "asciidoc"
		});
		return;
	} else if ((args[0] === "buy") && (args[1])) {
		switch (args[1]) {
		case "1":
			money.fetchBal(message.author.id).then((j) => {
				if ((j.money - 50) < 0) {
					message.channel.send("You need 50 Lunabits for that.");
					return;
				}
				money.updateBal(message.author.id, -50).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
					message.channel.send(`${message.author} had 50 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
					message.channel.send("Screenshot this and let an @Admin know you purchased an emoji.")
					return;
				})
			})
			break;
		case "2":
			money.fetchBal(message.author.id).then((j) => {
				if ((j.money - 30) < 0) {
					message.channel.send("You need 50 Lunabits for that.");
					return;
				}
				money.updateBal(message.author.id, -30).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
					message.channel.send(`${message.author} had 30 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
					message.channel.send("Screenshot this and let an @Admin know you purchased a custom command.")
					return;
				})
			})
			break;
		case "3":
			money.fetchBal(message.author.id).then((j) => {
				if ((j.money - 50) < 0) {
					message.channel.send("You need 50 Lunabits for that.");
					return;
				}
				money.updateBal(message.author.id, -50).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
					message.channel.send(`${message.author} had 50 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
					message.channel.send("Screenshot this and let an @Admin know you purchased an Animated Emoji.")
					return;
				})
			})
			break;
		case "4":
			money.fetchBal(message.author.id).then((j) => {
				if (j.totalbits < 1000) {
					message.channel.send("You need 1000 lifetime Lunabits for that.");
					return;
				}

				money.updatePres(message.author.id, (j.totalbits / 1000)).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
					message.channel.send(`Congrats ${message.author}! You've recieved ${parseInt(j.totalbits / 1000)} Prestige Rank! You get to start the ranks all over!<:lunao7:641711032359714857>`);
					message.member.removeRole("486594265242140673").catch(console.error);
				})
				money.setTotal(message.author.id, 0).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
					message.channel.send(`${message.author} had their lifetime bits reset`);
				})
			})
			break;
		default:
			message.channel.send("No such item number found. Use ``!helpme shop`` for proper syntax");
			break;
		}
	} else {
		message.channel.send("Incorrect syntax. Use ``!helpme shop`` for correct usage.")
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "shop",
	category: "Shop",
	description: "List shop items or buy items from the shop",
	usage: "shop <list|buy> [list number]"
};
