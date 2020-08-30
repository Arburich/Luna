exports.run = async(client, message, args, level) => {
	var fs = require("fs")
		if (!args[0]) {
			out = ""
				var ccData = JSON.parse(fs.readFileSync("./cc.json", "utf8"));
			commands = Object.keys(ccData)
				for (var i = 0; i < commands.length; i++) {
					out += commands[i] + "\n"
				}
				message.channel.send("== Custom Commands for Alchemy Den ==\n" + out, {
					code: "asciidoc"
				})
				return
		}
		if (args[0] == "create") {
			if (message.member.roles.find(r => r.name === "Moderator")) {}
			else {
				message.channel.send("You need to be a moderator to create or delete commands.")
				return
			}
			if (!args[1] || !args[2]) {
				message.channel.send("I need a command and a response!")
				return
			}
			cc = args[1].toLowerCase()
				let response = ""
				for (var i = 2; i < args.length; i++) {
					if (i == args.length - 1)
						response += args[i];
					else
						response += args[i] + " ";
				}

				var ccData = JSON.parse(fs.readFileSync("./cc.json", "utf8"));
			commands = Object.keys(ccData)
				for (var i = 0; i < commands.length; i++) {
					if (cc == commands[i]) {
						message.channel.send("That command was already made.")
					}
				}
				ccData[cc] = response
				fs.writeFileSync("./cc.json", JSON.stringify(ccData))
				message.channel.send("The CC " + cc + " was created with the response: " + response)
		} // End of Create

		if (args[0] == "list") {
			out = ""
				var ccData = JSON.parse(fs.readFileSync("./cc.json", "utf8"));
			commands = Object.keys(ccData)
				for (var i = 0; i < commands.length; i++) {
					out += commands[i] + "\n"
				}
				message.channel.send("== Custom Commands for Alchemy Den ==\n" + out, {
					code: "asciidoc"
				})
				return
		}

		if (args[0] == "delete") {
			if (message.member.roles.find(r => r.name === "Moderator")) {}
			else {
				message.channel.send("You need to be a moderator to create or delete commands.")
				return
			}
			if (!args[1]) {
				message.channel.send("I need a command to delete!")
				return
			}
			var ccData = JSON.parse(fs.readFileSync("./cc.json", "utf8"));
			commands = Object.keys(ccData)
				if (commands.includes(args[1])) {
					delete ccData[args[1]]
				} else {
					message.channel.send("That cc does not exist. Try ``!cc`` to list current custom commands.")
					return
				}
				fs.writeFileSync("./cc.json", JSON.stringify(ccData))
				message.channel.send("The CC " + args[1] + " was deleted.")
		}

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["custom"],
	permLevel: "User"
};

exports.help = {
	name: "cc",
	category: "Custom Commands",
	description: "List, Create, or Delete a custom Command",
	usage: "cc <list | create | delete> < | name | name> < | response | >"
};
