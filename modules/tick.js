module.exports = (client) => {
	client.logger.log( 'Tick Watch Active')
	var fs = require("fs")
	var moment = require("moment");
	var ParallelRequest = require('parallel-http-request');
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
	var request = new ParallelRequest(config);

	async function SENDIT(request){
		const output = new Promise((resolve) =>{
		request.send(resolve)
	}).then(function(result){
		return result
	})
	return output
	}
	async function ticks (){
		//client.logger.log("Starting Tick Watch")
		request.add(`https://elitebgs.app/api/ebgs/v5/ticks`)
		var systemData = await SENDIT(request)
		var tickHappenedWhen = moment(systemData[0].body[0]["time"]);
		var tickdiff = moment(systemData[0].body[0]["time"])
		tickdiff.subtract(1,"days")
		//console.log(tickHappenedWhen)
		var hist = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/ticks.json", "utf8"));
		var storedTick = moment(hist["tick"])
		//console.log(storedTick)
		//console.log((storedTick.isSame(tickHappenedWhen)))
		if(storedTick.isBefore(tickHappenedWhen)){
			const Discord = require('discord.js');

			tickdiff = moment.duration(storedTick.diff(tickdiff))
			//console.log(tickdiff)
			let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
			const ticker = new Discord.MessageEmbed()
				.setColor(randomColor)
				.setTitle('Latest Tick Was at: ')
				.setDescription(tickHappenedWhen.utc().format("MMMM Do, kk:mm UTC"))
				.setAuthor('Tick Detected', 'https://i.imgur.com/Y9ijyTf.png')
				.addFields({ name: 'Tick Time Offset: ', value: `${tickdiff.asMinutes().toFixed(0)} minutes off.` })
			client.logger.log("tick detected")
			hist["tick"] = tickHappenedWhen
			
			client.channels.cache.get("468122171709849610").send(ticker)
			fs.writeFileSync(__dirname + "/../commandStorage/ticks.json", JSON.stringify(hist))
			request.clean()
		}
					
		
	}
	
	var cron = require("node-cron")
	
	cron.schedule('* * * * *', () => {ticks()});
};
