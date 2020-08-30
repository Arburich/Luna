exports.run = async(client, message, args, level) => {

	if (!args[0]) {
		message.channel.send("What year? 3305 or 3306?")
		return
	}
	if (args[0] == 3305) {
		const embed = {
			"title": "== New Year, New Discoveries 3305 ==",
			"color": 5968035,
			"image": {
				"url": "https://i.imgur.com/r0CQM6M.png"
			},
			"fields": [{
					"name": "Stats",
					"value": "**16,602** Recorded Jumps\n**742,431** Recorded Total ly\n**75,503** Tons of Fuel Used\n**68,665** Celestial Bodies Scanned\n[Visualization of the Route](https://i.imgur.com/lG0RAYl.png)\n[EDSM Page](https://www.edsm.net/en/expeditions/summary/id/63/name/New+Year%2C+New+Discoveries)"
				}, {
					"name": "The Alchemists that Made It",
					"value": "**Arburich** - Federal Corvette - *Linguistic Alchemy*\n**TheGilmster** - Asp Explorer - *The Saltbath*\n**BlueMoon413** - Krait Phantom - *The Fernweh*\n**Flamenkosh** - Asp Explorer - *Whispers of Darkness*\n**Ferretpaint** - Imperial Courier - *Starbridge-E*\n**Jeros Calmera** - KraitmkII - *Venture*\n**Narm0** - Anaconda - *Ninquenian*\n**AnubisNor** - Anaconda - *Presten*\n**Jnroc** - Anaconda - *FNS Ferguson*\n**SirJumpnick** - Anaconda - *The Halberd*\n**VolcanicSly40** - Asp Explorer - *Vesuvius II*\n"
				}
			]
		};
		message.channel.send({
			embed
		});
	}

	if (args[0] == 3306) {
		const embed = {
			"title": "== New Year, New Discoveries 3306 ==",
			"color": 5968035,
			"image": {
				"url": "https://i.imgur.com/r0CQM6M.png"
			},
			"fields": [{
					"name": "Stats",
					"value": "**39,796** Recorded Jumps\n**1,983,009** Recorded Total ly\n**202,125** Tons of Fuel Used\n**217,363** Celestial Bodies Scanned\n[Visualization of the Route](https://i.imgur.com/9Rjlknr.png)\n[EDSM Page](https://www.edsm.net/en/expeditions/summary/id/88/name/New+Year%2C+New+Discoveries+3306)"
				}, {
					"name": "The Alchemists that Made It",
					"value": "Arburich, DarkAngel2096, Malcolm A. Clypse, Miya, Aethicyn,  0rphan,  StormySan,  Jack Borson,  Saarinen,  Incendiary Moose,  TheGilmster, Nindjako, CorvineBand2710,  Jack McDonnell,  SecondDecayed,  Lofted,  Gideon Sharon,  JVMMs,  DARUT CEREDAR,  Wulfweird,  Newmanski,  carlitoslade,  Jeros Calmera,  Ren Solsen,  Simcoe,  Rigel Kent,  DaOnliMazter,  Wayfareous,  srduck,  Oleg Pugachev,  Jade Eagle,  gregtelo,  Kerrick Long,  Bun Zinator,  Upper Manglement,  Helios Eusebio,  Emulus,  marco2001zecc,  giant hamster,  Wallaby,  Drokeep,  NeonTool,  Hugh Bourbaki,  felixfj007,  smHatter,  Ragnar Lothbrok,  Ferretpaint"
				}
			]
		};
		message.channel.send({
			embed
		});
	}

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["newyearsnewdiscovery", "newyearnewdiscoveries"],
	permLevel: "User"
};

exports.help = {
	name: "nynd",
	category: "Custom Commands",
	description: "Info about New Year, New Discoveries",
	usage: "nynd <3305 or 3306>"
};
