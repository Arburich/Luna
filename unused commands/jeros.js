exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	var fs = require("fs")
		var moment = require("moment");
	var jerosData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/jerosd.json", "utf8"));
	var authorID = args[0]
		if (authorID == "467528248532664330") {
			message.reply("Wow. Rude.")
			.then(msg => {
				setTimeout(() => msg.delete(), 5000)
			})
			.catch();
			message.delete();
			return
		}
		if (authorID == message.author.id) {
			message.reply("Play fair boss. ")
			.then(msg => {
				setTimeout(() => msg.delete(), 5000)
			})
			.catch();
			message.delete();
			return
		}
		if (args[0] == "search") {
			authorID = args[1]
				let member = message.guild.members.cache.get(authorID)
				message.channel.send(`The best time for <@${member.id}> is ${moment.duration(jerosData[member.id]["besttime"]).format()}.\n The worst time is ${moment.duration(jerosData[member.id]["worsttime"]).format()}`)
				return
		}
		//Find role
		var role = message.guild.roles.cache.find(role => role.name === "Jeros'd");
	//Find member
	if (message.mentions.members.first() != undefined) {
		message.reply("**WHAT ARE YOU DOING? ARE YOU A NARC?** <a:ahh:517901412852563968>. Ur gunna get us BOTH caught! Right Click for their ID, don't @!")
		.then(msg => {
			setTimeout(() => msg.delete(), 5000)
		})
		message.delete()
		return
	}
	let member = message.guild.members.cache.get(authorID);
	if (member == undefined) {
		message.reply("Couldn't find that ID boss. Sorry. Musta skipped town.")
		.then(msg => {
			setTimeout(() => msg.delete(), 5000)
		})
		.catch();
		message.delete();
	}
	//console.log(member.roles.cache.find(role => role.name === "Jeros'd"))
	if (member.roles.cache.find(role => role.name === "Jeros'd")) {
		message.reply("User has already been Jeros'd. Please wait till they complete it!")
		.then(msg => {
			setTimeout(() => msg.delete(), 5000)
		})
		message.delete()
	} else {
		member.roles.add(role);
		message.reply('Got it Boss.')
		.then(msg => {
			setTimeout(() => msg.delete(), 5000)
		})
		.catch();
		message.delete();
		client.channels.cache.get("466269266002444318").send(`<@${args[0]}> was jeros'd by <@${message.author.id}>`)
		client.channels.cache.get("899396269359894569").send(`huehuehuehuehuehuehue`).then(msg=>msg.delete({timeout:"200"/*Time until delete in milliseconds*/}))
		if (authorID in jerosData) {
			jerosData[authorID]["timeentered"] = moment()
			jerosData[authorID]["jerosdby"] = message.author.id
				console.log(true)
		} else {
			console.log(false)
			jerosData[authorID] = {
				"timeentered": moment(),
				"timeleft": "6",
				"besttime": 0,
				"worsttime": 0,
				"jerosdby": message.author.id
			}
		}
	}
	//give ID role
	//write moment date to timeentered
	fs.writeFileSync(__dirname + "/../commandStorage/jerosd.json", JSON.stringify(jerosData))
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["jerosd"],
	permLevel: "User"
};
exports.help = {
	name: "jeros",
	category: "Custom Commands",
	description: "Get Jeros'd!",
	usage: "jeros <userID(not @) | search>"
};