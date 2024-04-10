exports.run = async(client, message, args, level) => {
	var fs = require("fs")
	const path = require("path");
	const getMostRecentFile = (dir) => {
		const files = orderReccentFiles(dir);
		return files.length ? files[0] : undefined;
	}
	const orderReccentFiles = (dir) => {
		return fs.readdirSync(dir)
			.filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
			.filter((file) => path.extname(file) === '.log')
			.map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
			.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
	}
	var arboo = fs.readFileSync("A:\\" + getMostRecentFile('A:\\')["file"], "utf8").split("\n");
	var Explur = {}
	var whereis = {}
	var pos = []
	for (const line in arboo){
		try{
			arboo[line] = JSON.parse(arboo[line])
		}catch(error){
			continue
		}
		
		if (arboo[line]["event"] == "Statistics"){
			Explur = arboo[line]["Exploration"]
			}
		if (arboo[line]["event"] == "Location"){
			whereis = arboo[line]
			pos = arboo[line]["StarPos"]
		}
	}
	const Discord = require('discord.js');
	const ArbooEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Arboo's Andromeda Or Bust")
		.setDescription(`Arb is attempting to take a sidewinder to 2.5 million LY. And other places around the galaxy.`)
		.addFields(
			{name: "Where is Arb?", value: `Location: ${whereis["StarSystem"]}\n\n__Distances From:__\nHome: ${Math.pow((Math.pow(pos[0] - 10.9375, 2) + Math.pow(pos[1] - 54.09375, 2) + Math.pow(pos[2] - 15.25, 2) * 1.0), 0.5).toFixed(2)}ly\nBeagle point: ${Math.pow((Math.pow(pos[0] + 1111.5625, 2) + Math.pow(pos[1] + 134.21875, 2) + Math.pow(pos[2] - 65269.75, 2) * 1.0), 0.5).toFixed(2)}ly\nSag A*: ${Math.pow((Math.pow(pos[0] - 25.21875, 2) + Math.pow(pos[1] + 20.90625, 2) + Math.pow(pos[2] - 25899.96875, 2) * 1.0), 0.5).toFixed(2)}ly\nColonia: ${Math.pow((Math.pow(pos[0] + 9530.5, 2) + Math.pow(pos[1] + 910.28125, 2) + Math.pow(pos[2] - 19808.125, 2) * 1.0), 0.5).toFixed(2)}ly`, inline : true},
			{name: "How Far Along?", value: `${((Explur["Total_Hyperspace_Distance"]-365264)/2500000)*100}% completed\n${Explur["Total_Hyperspace_Distance"]-365264}ly finished\n${2865264 - Explur["Total_Hyperspace_Distance"]}ly to go.\n\n__Totals since Start:__\nSystems Visited: ${Explur["Systems_Visited"] - 4115}\nJumps: ${Explur["Total_Hyperspace_Jumps"] - 7220}\nTotal Objects Scanned: ${Explur["Planets_Scanned_To_Level_2"] - 13793}`, inline: true})
		.setThumbnail("https://cdn.discordapp.com/emojis/598580994466906122.gif?v=1")
	message.channel.send({
				embeds:[ArbooEmbed]
			});
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "andromeda",
	category: "Custom Commands",
	description: "Where is Arb in the Great Beyond",
	usage: "andromeda"
};