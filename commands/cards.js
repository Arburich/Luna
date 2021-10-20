const { codeBlock } = require("@discordjs/builders");

exports.run = async(client, message, args, level) => {
	//load cards
	var fs = require("fs")
    var cards = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/cards.json", "utf8"));
	if(!args[0]){
		//card outputs
		var output = "== OPEN TAVERN BRAWL FIGHTS ==\n"
		for([key, val] of Object.entries(cards)) {
			output += `${key} :: ${val}\n` 
		}
		message.channel.send(codeBlock("asciidoc", output));
   
	}
	else if(args[0].toLowerCase() == "open"){
		//take the rest of args, make new card addition with description. 
		//Default Description == "Eagles Only"
		if(!args[1]){
			cards[message.author.username] = "Eagles Only"
		}
		else{
			var argoo = ""
			for(var i = 1; i < args.length && i < 20; i++){
				argoo += args[i] + " "
			}
			cards[message.author.username] = argoo
		}
		message.channel.send("A new Challenger! <:lunahype:728048962367389728>")
		
		

	}
	else if(args[0].toLowerCase() == "close"){
		//remove card from the table
	    try {
			delete cards[message.author.username]
	    }
		catch(e){
		    message.channel.send("Can't remove what doesn't exist!")
		}
		message.channel.send("Your Card has been closed! See you later friend!<:lunawave:728048962744877147>")

	}
	else{
		var argoo = ""
		for(var i = 0; i < args.length && i < 20; i++){
			argoo += args[i] + " "
		}
		cards[message.author.username] = argoo
		message.channel.send("Your Description has been changed! <:lunao7:728048963000729681>")

	}
	fs.writeFileSync(__dirname + "/../commandStorage/cards.json",  JSON.stringify(cards))
	
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Alchemist"
};

exports.help = {
	name: "cards",
	category: "Custom Commands",
	description: "Fight Night Card Tables",
usage: "cards <open | close | description> ?description"
};