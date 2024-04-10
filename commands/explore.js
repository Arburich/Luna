var ParallelRequest = require('parallel-http-request');
exports.run = async(client, messageCreate, args, level) => {
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
var fs = require("fs")
const { codeBlock } = require("@discordjs/builders");
	var request = new ParallelRequest(config);
	async function SENDIT(request){
		const output = new Promise((resolve) =>{
		request.send(resolve)
	}).then(function(result){
		return result
	})
	return output
	}
	
	function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
	if(!args[0]) {
	messageCreate.attachments.forEach((value, key)=> {
		request.add(value.url)
	})
	var total = 0
	var journalData = await SENDIT(request)
	for(var i = 0; i < journalData.length; i++){
		var lines = journalData[i].body.split(/\n/)
		for(var j = 0; j < lines.length; j++){
			try{
				var obj = JSON.parse(lines[j])
				if(obj["event"] == "MultiSellExplorationData" || obj["event"] == "SellExplorationData"){
					total += obj["TotalEarnings"]}
				}
				catch(e){}
			
		}
		
		
	}
	total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	messageCreate.channel.send("I found a total of **" + total + "** credits worth of exploration data in those logs! <:lunao7:728048963000729681>\n\nIf you want to submit this number to the **leaderboard**, just type `!explore` again with the number I just gave you!\n__Be sure that you have the correct journals and that you submitted all these sales to <#695110902042853406>, otherwise the recount will be wrong!__")
}
	else{
		if(args[0] == "list")
		{
			var listing = "== NYND 3308 Exploration Leaderboard ==\n"
			var exploreData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/explore.json", "utf8"));
			var items = Object.keys(exploreData).map(function(key) {
				return [key, exploreData[key]];
			});

			// Sort the array based on the second element
			items.sort(function(first, second) {
				return second[1] - first[1];
			});

			// Create a new array with only the first 5 items
			//console.log(items.slice(0, 5));
			
			for(var i = 0; i < items.length; i++){
				//console.log(items[i][0].replace(/[\\<>@#&!]/g, ""))
				async function getName(){
					return messageCreate.guild.members.fetch(items[i][0].replace(/[\\<>@#&!]/g, ""))
				}
				var name = await getName()
				//console.log(name.user.username)
				listing += `${name.user.username} :: ${numberWithCommas(items[i][1])}\n`

			}
			messageCreate.channel.send(codeBlock("asciidoc", listing))
			return
		}
		let argu = ""
		
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		//messageCreate.channel.send(argu)
		var num = argu.replace(/\,/g,'')
		if(isNaN(num)){
			messageCreate.channel.send("That's not a number!")
			return
		}
		num = parseInt(num,10)
		
		var exploreData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/explore.json", "utf8"));
		if(exploreData.hasOwnProperty(messageCreate.author)){
			exploreData[messageCreate.author] += num
			messageCreate.channel.send("I've added your amount to the list! ``!explore list`` to see the rankings!")
		}
		else{
			exploreData[messageCreate.author] = num
			messageCreate.channel.send("I've added your amount to the list! ``!explore list`` to see the rankings!")
		}
		//messageCreate.channel.send(num.toString())
		fs.writeFileSync(__dirname + "/../commandStorage/explore.json", JSON.stringify(exploreData))
	}

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["x"],
	permLevel: "User"
};

exports.help = {
	name: "explore",
	category: "Custom Commands",
	description: "Add up exploration data using this command.",
	usage: "explore"
};
