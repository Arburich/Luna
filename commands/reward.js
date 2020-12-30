const money = require(__dirname + '/../commandStorage/discord-muns.js');
const { promisify } = require('util')
const sleep = promisify(setTimeout)
exports.run = async(client, message, args) => {
	if (!args || args.length < 1 || !args[1]) {
		message.channel.send("Incorrect syntax. Use ``!helpme reward`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
	}
	if (args[1] < 0) {
		message.channel.send("Can't give someone a negative amount.");
		return;
	}
	
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	
	
	
	
	function addRole(role) {
		if (member.roles.cache.has("486585462379773961")) {
			member.roles.remove("486585462379773961").catch(console.error);
		}
		if (member.roles.cache.has("486588517158486016")) {
			member.roles.remove("486588517158486016").catch(console.error);
		}
		if (member.roles.cache.has("486592445782687765")) {
			member.roles.remove("486592445782687765").catch(console.error);
		}
		if (member.roles.cache.has("486592970217488404")) {
			member.roles.remove("486592970217488404").catch(console.error);
		}
		if (member.roles.cache.has("486593476260265994")) {
			member.roles.remove("486593476260265994").catch(console.error);
		}
		if (member.roles.cache.has("486594265242140673")) {
			member.roles.remove("486594265242140673").catch(console.error);
		}
		member.roles.add(role).catch(console.error);
	}
	

	if (args.length > 2){
		argu = argu.split("\n")
		message.channel.send("Giving bits to " + argu.length + " people. Stand By. <:lunao7:728048963000729681>")
		let usersList = message.mentions.users.array()
		for(var j = 0; j < usersList.length; j++){
		    if (argu.length != usersList.length){
				message.channel.send("Don't mention multople people in the same message or make sure every line has an @mention.\nPlease make a new Line for every Name / Amount combo. \nExample:\n @Name 10\n@Name2 10")
				return
			}
			var member = message.guild.member(usersList[j])
			var amount = argu[j].split(" ")[1]
	
			if (isNaN(parseInt(amount))){
				message.channel.send("The Amount needs to be an Integer!")
				return
			}
			
			await sleep(2000)
			await money.updateBal(member.id, amount).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
			message.channel.send(`${member.toString()} got ${amount} Lunabits.\n**New Balance:** ${i.money} Lunabits\n` + "**Lifetime Collected**: " + i.totalbits + " Lunabits\n" + `**Prestiges:** ${i.prestige}`);
			if (i.totalbits > 99 && i.totalbits < 200 && !member.roles.cache.has("486585462379773961")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 1: Follower! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486585462379773961")
			}
			if (i.totalbits > 199 && i.totalbits < 350 && !member.roles.cache.has("486588517158486016")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 2: Supporter! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486588517158486016")
			}
			if (i.totalbits > 349 && i.totalbits < 500 && !member.roles.cache.has("486592445782687765")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 3: Dignitary! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486592445782687765")
			}
			if (i.totalbits > 499 && i.totalbits < 700 && !member.roles.cache.has("486592970217488404")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 4: Ambassador! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486592970217488404")
			}
			if (i.totalbits > 699 && i.totalbits < 1000 && !member.roles.cache.has("486593476260265994")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 5: Chief! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486593476260265994")
			}
			if (i.totalbits > 999 && !member.roles.cache.has("486594265242140673")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 6: Commander! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486594265242140673")
			}
			return;
		})
		}
	}
	else{	
		var memberID = message.mentions.members.first().id;
		var member = message.mentions.members.first();
		money.updateBal(memberID, args[1]).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
			message.channel.send(`${member.toString()} got ${args[1]} Lunabits.\n**New Balance:** ${i.money} Lunabits\n` + "**Lifetime Collected**: " + i.totalbits + " Lunabits\n" + `**Prestiges:** ${i.prestige}`);
			if (i.totalbits > 99 && i.totalbits < 200 && !member.roles.cache.has("486585462379773961")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 1: Follower! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486585462379773961")
			}
			if (i.totalbits > 199 && i.totalbits < 350 && !member.roles.cache.has("486588517158486016")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 2: Supporter! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486588517158486016")
			}
			if (i.totalbits > 349 && i.totalbits < 500 && !member.roles.cache.has("486592445782687765")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 3: Dignitary! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486592445782687765")
			}
			if (i.totalbits > 499 && i.totalbits < 700 && !member.roles.cache.has("486592970217488404")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 4: Ambassador! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486592970217488404")
			}
			if (i.totalbits > 699 && i.totalbits < 1000 && !member.roles.cache.has("486593476260265994")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 5: Chief! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486593476260265994")
			}
			if (i.totalbits > 999 && !member.roles.cache.has("486594265242140673")) {
				message.channel.send(member.toString() + ", you are promoted to Rank 6: Commander! https://www.youtube.com/watch?v=sSxx12vADYk")
				addRole("486594265242140673")
			}
			return;
		})
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["r"],
	permLevel: "Moderator"
};

exports.help = {
	name: "reward",
	category: "Shop",
	description: "Rewards a user with Lunabits",
	usage: "reward <@user> <Lunabits>"
};
