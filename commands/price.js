var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {

	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		if (!args[0]) {
			argu = "Low Temperature Diamonds"
		}
		/*===============================================*/

	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	function price(ID) {
		//let systemLink = commodityPage.replace('+','%2B').replace(/ /g, '+').replace("&", "%26");

		//let uri = `https://elitebgs.app/api/ebgs/v4/commodityPages?name=${systemLink}`;
		let uri = `https://eddb.io/commodity/${ID}`;
		return httpGet(uri)
	}

	/*===============================================*/

	var averagePrice = 0
		var MaxBuy = 0
		var MinBuy = 0
		var MaxSell = 0
		var MinSell = 0
		var MaxProfit = 0
		var type = ""

		var fs = require("fs")
		//var comms = JSON.parse(fs.readFileSync("./commandStorage/commodities.json", "utf8"));
		var comms = JSON.parse(httpGet("https://eddb.io/archive/v6/commodities.json"))
	var commID = -1
		var name = ""
		for (var i = 0; i < comms.length; i++) {
			if (comms[i]["name"].toLowerCase() == argu.trim().toLowerCase()) {
				commID = comms[i]["id"]
					name = comms[i]["name"]
					averagePrice = comms[i]["average_price"]
					if (comms[i]["min_buy_price"] == null) {
						MinBuy = "Cannot Buy from Stations"
					} else {
						MinBuy = comms[i]["min_buy_price"]
					}

					if (comms[i]["max_buy_price"] == null) {
						MaxBuy = "Cannot Buy from Stations"
					} else {
						MaxBuy = comms[i]["max_buy_price"]
					}
					MinSell = comms[i]["min_sell_price"]
					MaxSell = comms[i]["max_sell_price"]
					if (MinBuy == "Cannot Buy from Stations") {
						MaxProfit = MaxSell
					} else {
						MaxProfit = MaxSell - MinBuy
					}
					type = comms[i]["category"]["name"]
			}
		}
		if (commID == -1) {
			message.channel.send("That commodity doesn't exist <:lunasweat:641711032724750350>")
		}

		/*=========================*/
		var system1 = ""
		var system1webpage = ""
		var station1 = ""
		var station1webpage = ""
		var currentPrice1 = ""
		var demand1 = ""
		var landingPad1 = ""
		var lastUpdate1 = ""

		var system2 = ""
		var system2webpage = ""
		var station2 = ""
		var station2webpage = ""
		var currentPrice2 = ""
		var demand2 = ""
		var landingPad2 = ""
		var lastUpdate2 = ""

		var system3 = ""
		var system3webpage = ""
		var station3 = ""
		var station3webpage = ""
		var currentPrice3 = ""
		var demand3 = ""
		var landingPad3 = ""
		var lastUpdate3 = ""

		/*=========================*/

		var commodityPage = price(commID)
		commodityPage = commodityPage.split("\n")
		var count = 0
		for (var i = 0; i < commodityPage.length; i++) {
			if (commodityPage[i].toLowerCase().includes("maximum selling stations")) {

				system1 = commodityPage[i + 23].split("<")
					system1 = system1[1].split(">")
					system1webpage = commodityPage[i + 23].split("\"")
					// output += "\n\nSystem :: " + system[1].replace("&#039;", "'")

					station1 = commodityPage[i + 21].split("<")
					station1 = station1[1].split(">")
					station1webpage = commodityPage[i + 21].split("\"")

					// output += "\nStation :: " + station[1].replace("&#039;", "'")

					currentPrice1 = commodityPage[i + 25].split("<")
					currentPrice1 = currentPrice1[1].split(">")
					// output += "\nCurrent Price :: " + currentPrice[1].replace("&#039;", "'")

					demand1 = commodityPage[i + 31].split("<")
					demand1 = demand1[1].split(">")
					// output += "\nDemand :: " + demand[1].replace("&#039;", "'")

					landingPad1 = commodityPage[i + 34].split("<")
					landingPad1 = landingPad1[1].split(">")
					// output += "\nLanding Pad :: " + landingPad[1].replace("&#039;", "'")

					lastUpdate1 = commodityPage[i + 38].split("<")
					lastUpdate1 = lastUpdate1[0].split(">")
					// output += "\nLast Updated :: " + lastUpdate[1].replace("&#039;", "'")

					/*====================================================================*/

					system2 = commodityPage[i + 45].split("<")
					system2 = system2[1].split(">")
					system2webpage = commodityPage[i + 45].split("\"")
					// output += "\n\nSystem :: " + system[1].replace("&#039;", "'")

					station2 = commodityPage[i + 43].split("<")
					station2 = station2[1].split(">")
					station2webpage = commodityPage[i + 43].split("\"")
					// output += "\nStation :: " + station[1].replace("&#039;", "'")

					currentPrice2 = commodityPage[i + 47].split("<")
					currentPrice2 = currentPrice2[1].split(">")
					// output += "\nCurrent Price :: " + currentPrice[1].replace("&#039;", "'")

					demand2 = commodityPage[i + 53].split("<")
					demand2 = demand2[1].split(">")
					// output += "\nDemand :: " + demand[1].replace("&#039;", "'")

					landingPad2 = commodityPage[i + 56].split("<")
					landingPad2 = landingPad2[1].split(">")
					// output += "\nLanding Pad :: " + landingPad[1].replace("&#039;", "'")

					lastUpdate2 = commodityPage[i + 60].split("<")
					lastUpdate2 = lastUpdate2[0].split(">")
					// output += "\nLast Updated :: " + lastUpdate[1].replace("&#039;", "'")
					/*====================================================================*/

					system3 = commodityPage[i + 67].split("<")
					system3 = system3[1].split(">")
					system3webpage = commodityPage[i + 67].split("\"")
					// output += "\n\nSystem :: " + system[1].replace("&#039;", "'")

					station3 = commodityPage[i + 65].split("<")
					station3 = station3[1].split(">")
					station3webpage = commodityPage[i + 65].split("\"")
					// output += "\nStation :: " + station[1].replace("&#039;", "'")

					currentPrice3 = commodityPage[i + 69].split("<")
					currentPrice3 = currentPrice3[1].split(">")
					// output += "\nCurrent Price :: " + currentPrice[1].replace("&#039;", "'")

					demand3 = commodityPage[i + 75].split("<")
					demand3 = demand3[1].split(">")
					// output += "\nDemand :: " + demand[1].replace("&#039;", "'")

					landingPad3 = commodityPage[i + 78].split("<")
					landingPad3 = landingPad3[1].split(">")
					// output += "\nLanding Pad :: " + landingPad[1].replace("&#039;", "'")

					lastUpdate3 = commodityPage[i + 82].split("<")
					lastUpdate3 = lastUpdate3[0].split(">")
					// output += "\nLast Updated :: " + lastUpdate[1].replace("&#039;", "'")

			}
		}

		const embed = {
		"title": "Click me for EDDB Page",
		"url": `https://eddb.io/commodity/${commID}`,
		"color": 7864575,
		"footer": {
			"text": "Information from EDDB, generated by Luna 💜"
		},
		"author": {
			"name": `${name}`
		},
		"fields": [{
				"name": `Information on ${name}`,
				"value": `Max Sell Price: **${MaxSell}** credits\nMin Sell Price: **${MinSell}** credits\n\nMax Buy Price: **${MaxBuy}**\nMin Buy Price: **${MinBuy}**\n\nMax Profit: **${MaxProfit}**\n\nAverage Price: **${averagePrice}** credits\n\nType of Commodity: **${type}**\n\n`
			}, {
				"name": "1",
				"value": `**[${system1[1].replace("&#039;", "'")}](https://eddb.io${system1webpage[1]})**\n[${station1[1].replace("&#039;", "'")}](https://eddb.io${station1webpage[1]})\nPrice: **${currentPrice1[1]}**\nDemand: **${demand1[1]}**\nPad: **${landingPad1[1]}**\nLast Updated: **${lastUpdate1[1]}**`,
				"inline": true
			}, {
				"name": "2",
				"value": `**[${system2[1].replace("&#039;", "'")}](https://eddb.io${system2webpage[1]})**\n[${station2[1].replace("&#039;", "'")}](https://eddb.io${station2webpage[1]})\nPrice: **${currentPrice2[1]}**\nDemand: **${demand2[1]}**\nPad: **${landingPad2[1]}**\nLast Updated: **${lastUpdate2[1]}**`,
				"inline": true
			}, {
				"name": "3",
				"value": `**[${system3[1].replace("&#039;", "'")}](https://eddb.io${system3webpage[1]})**\n[${station3[1].replace("&#039;", "'")}](https://eddb.io${station3webpage[1]})\nPrice: **${currentPrice3[1]}**\nDemand: **${demand3[1]}**\nPad: **${landingPad3[1]}**\nLast Updated: **${lastUpdate3[1]}**`,
				"inline": true
			}
		]
	};
	message.channel.send({
		embed
	});

	//message.channel.send(output,{code :"asciidoc"})


};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["prices"],
	permLevel: "User"
};

exports.help = {
	name: "price",
	category: "Custom Commands",
	description: "Latest and Greated Information and Sell prices on asked for commodity. No Argument is defaulted to LTDs.",
	usage: "price <Commodity>"
};
