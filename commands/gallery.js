var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs')
	exports.run = async(client, message, args, level) => {
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else if (args[i] === ",")
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		let cmd = argu.split(",")
		if (!cmd[0] || !cmd[1]) {
			message.channel.send("Incorrect Syntax. Use ``!helpme gallery`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
			return;
		}
		var elm;
	function validURL(str) {
		var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	}

	if (validURL(cmd[0]) == false) {
		message.channel.send("Must give a valid URL.")
		return;
	}

	//let filePath = "/wamp64/www/nynd.html";
	//let newFile = fs.readFileSync(filePath);
	var data = fs.readFileSync('/wamp64/www/nynd.html').toString().split("\n");
	//message.channel.send(data[0])
	var output = ""

		for (var l = 0; l < data.length; l++) {
			if (data[l].toString() == "<!--GALLERYISHERE-->") {
				//message.channel.send("hello")
				output += "<img class=\"lozad\" data-src=\"" + cmd[0] + " \"><p>" + cmd[1] + ", by " + message.author.username + "</p>" + "\n"
				message.channel.send("Successfully added the image to the gallery on the website! :purple_heart:")
			}
			output += data[l].toString() + "\n"
		}
		//message.channel.send(output)
		fs.writeFileSync('/wamp64/www/nynd.html', output);

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "gallery",
	category: "Custom Commands",
	description: "Add a screenshot to the gallery on the Alchemy Den, NYND 2 Website Page. Please, only use Imgur direct links, or discord direct links.",
	usage: "gallery <image src>, <description>"
};
