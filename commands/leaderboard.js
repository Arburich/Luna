exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	var fs = require("fs")
	var leaderboard = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/leaderboard.json", "utf8"));
	
	// Create items array
	var items = Object.keys(leaderboard).map(function(key) {
	  return [key, leaderboard[key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
	  return second[1] - first[1];
	});
	if(!args[0]){
		items = items.slice(0, 10)
	}
	else if(args[0].toLowerCase() == "all"){
		
	}
	var output = "== Top Ten WAR GAMES Earners ==\n"
	console.log(items)
	for(var i = 0; i < items.length; i++){
			output += items[i][0] + ":: " + items[i][1] + "\n"
		
	}
	message.channel.send(output, {code: "asciidoc"})

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["l"],
	permLevel: "User"
};

exports.help = {
	name: "leaderboard",
	category: "Background Simulation",
	description: "Check the Leaderboard for War Games!",
	usage: "leaderboard"
};
