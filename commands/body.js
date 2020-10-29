var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const { MessageAttachment } = require('discord.js');
exports.run = async(client, message, args, level) => {
	if (!args[0]) {
		message.channel.send("Incorrect syntax, use ``!helpme body`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
		return;
	}
	var listFlag = 0
	if (args[0].toLowerCase() == "list" ){
		listFlag = 1
		args.splice(0,1)
	}
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		
	argu = argu.split(",")
	
	/*==============================================================================*/
	
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	function BGS(faction) {
		let systemLink = faction.replace('+', '%2B').replace(/ /g, '+').replace("&", "%26");

		let uri = `https://www.edsm.net/api-system-v1/bodies?systemName=${systemLink}`;
		return JSON.parse(httpGet(uri));
	}
	
	/*==============================================================================*/
	
	const types = {
		"Metal-rich body" : 1,
		"High metal content world" : 2,
		"Rocky body" : 11,
		"Rocky Ice world" : 12,
		"Icy body" : 21,
		"Earth-like world" : 31,
		"Water World" : 41,
		"Water giant" : 42,
		"Water giant with life" : 42,
		'Ammonia world' : 51,
        'Gas giant with water-based life' : 61,
        'Gas giant with ammonia-based life' : 62,
        'Class I gas giant' : 71,
        'Class II gas giant': 72,
        'Class III gas giant': 73,
        'Class IV gas giant' : 74,
        'Class V gas giant' : 75,
        'Helium-rich gas giant': 81,
        'Helium gas giant' : 81,
		
		'O (Blue-White) Star': 1,

        'B (Blue-White) Star': 2,
        'B (Blue-White super giant) Star': 2,

        'A (Blue-White) Star': 3,
        'A (Blue-White super giant) Star': 3,

        'F (White) Star': 4,
        'F (White super giant) Star': 4,
	
        'G (White-Yellow) Star': 5,
        'G (White-Yellow super giant) Star': 5,
        'K (Yellow-Orange) Star': 6,
        'K (Yellow-Orange giant) Star': 6,
        'M (Red dwarf) Star': 7,
        'M (Red giant) Star': 7,
        'M (Red super giant) Star': 7,
        'L (Brown dwarf) Star': 8,
        'T (Brown dwarf) Star': 9,
        'Y (Brown dwarf) Star': 10,
        // Proto stars
        'T Tauri Star': 11,
        'Herbig Ae/Be Star': 12,
        // Wolf-Rayet
        'Wolf-Rayet Star': 21,
        'Wolf-Rayet N Star': 22,
        'Wolf-Rayet NC Star': 23,
        'Wolf-Rayet C Star' : 24,
        'Wolf-Rayet O Star' : 25,
        // Carbon stars
        'CS Star': 32, // Check in game
        'C Star' : 32,
        'CN Star': 32,
        'CJ Star': 32, // Check in game
        'CH Star' : 32, // Check in game
        'CHd Star': 32, // Check in game
        'MS-type Star': 41, // Check in game
        'S-type Star': 42, // Check in game
        // White dwarfs
        'White Dwarf (D) Star': 51,
        'White Dwarf (DA) Star': 51,
        'White Dwarf (DAB) Star': 51,
        'White Dwarf (DAO) Star': 51,
        'White Dwarf (DAZ) Star': 51,
        'White Dwarf (DAV) Star': 51,
        'White Dwarf (DB) Star': 51,
        'White Dwarf (DBZ) Star': 51,
        'White Dwarf (DBV) Star': 51,
        'White Dwarf (DO) Star': 51,
        'White Dwarf (DOV) Star': 51,
        'White Dwarf (DQ) Star': 51,
        'White Dwarf (DC) Star': 51,
        'White Dwarf (DCV) Star': 51,
        'White Dwarf (DX) Star': 51,
        'Neutron Star': 91,
        'Black Hole': 92, // Check in game
        'Supermassive Black Hole' : 92, // Check in game
        'X': 94, // Exotic?? // Check in game
        'RoguePlanet': 111, // Check in game
        'Nebula': 112, // Check in game
        'StellarRemnantNebula': 113 // Check in game
	}
	
	function AtmosCompositionGenerator(body){
		var out = ""
		if(body["atmosphereComposition"] == null){
			return "None"
		}
		else {
			for (var i = 0; i < Object.keys(body["atmosphereComposition"]).length; i++){
				out += Object.keys(body["atmosphereComposition"])[i] + ": " + body["atmosphereComposition"][Object.keys(body["atmosphereComposition"])[i]] + "%\n"
			}
			return out
		}
	}
	
	function SolidCompositionGenerator(body){
		var out = ""
		if(body["solidComposition"] == null){
			return "None"
		}
		else {
			for (var i = 0; i < Object.keys(body["solidComposition"]).length; i++){
				out += Object.keys(body["solidComposition"])[i] + ": " + body["solidComposition"][Object.keys(body["solidComposition"])[i]] + "%\n"
			}
			return out
		}
	}
	
	function materials(body){
		var out = ""
		if(body["materials"] == null){
			return "None"
		}
		else {
			for (var i = 0; i < Object.keys(body["materials"]).length; i++){
				out += Object.keys(body["materials"])[i] + ": " + body["materials"][Object.keys(body["materials"])[i]] + "%\n"
			}
			return out
		}
	}
	
	function rings(body) {
		var out = ""
		if (body["rings"] == null){
			return "None"
		}
		else {
			for (var i = 0; i < body["rings"].length; i++){
				out += `${body["rings"][i]["name"]}\nType: ${body["rings"][i]["type"]}\nMass: ${body["rings"][i]["mass"]} Mt\nInner / Outer Radius: ${body["rings"][i]["innerRadius"]} km/ ${body["rings"][i]["outerRadius"]} km\n\n`
			}
			return out
		}
	}
	
	var output = ""
	const bodies = BGS(argu[0])
	if (listFlag == 1){
		for (var i = 0; i < bodies["bodies"].length; i++){
			output += `${bodies["bodies"][i]["name"]} :: ${bodies["bodies"][i]["subType"]}\n`
		}
		output = output.split("\n")
		var limitBreak = ""
		for (var j = 0; j < output.length; j++){
			limitBreak += output[j] + "\n"
			if ((j % 20) == 0 && (j > 1)){
				message.channel.send(limitBreak,{code: "asciidoc"})
				limitBreak = ""
			}
		}
		message.channel.send(limitBreak,{code: "asciidoc"})
		return
	}
	if (Object.keys(bodies).length ===0) {
			message.channel.send("The system ``" + argu[0] + "`` wasn't found. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
			return
		}
	if (!argu[1]){
		const planet = argu[0].toLowerCase().trim()
		for (var i = 0; i < bodies["bodies"].length; i++){
		if (bodies["bodies"][i]["name"].toLowerCase() == planet){
			if (bodies["bodies"][i]["type"] == "Star"){
				const embed = {
  "title": `${bodies["bodies"][i]["type"]} - ${bodies["bodies"][i]["subType"]}`,
  "description": `Distance to Arrival: ${bodies["bodies"][i]["distanceToArrival"]} ls\nMain Star: ${bodies["bodies"][i]["isMainStar"]}\nScoopable: ${bodies["bodies"][i]["isScoopable"]}\nAge: ${bodies["bodies"][i]["age"]} million years\nSpectral Class: ${bodies["bodies"][i]["spectralClass"]}\nLuminosity: ${bodies["bodies"][i]["luminosity"]}\nAbsolute Magnitude: ${bodies["bodies"][i]["absoluteMagnitude"]}\nSolar Masses: ${bodies["bodies"][i]["solarMasses"]}\nSolar Radius: ${bodies["bodies"][i]["solarRadius"]}\nSurface Temp: ${bodies["bodies"][i]["surfaceTemperature"]} K`,
  "color": 13850502,
  "thumbnail": {
    "url": `https://www.edsm.net/img/bodies/stars/${types[`${bodies[`bodies`][i][`subType`]}`]}.png`
  },
  "author": {
    "name": bodies["bodies"][i]["name"]
  },
  "fields": [
    {
      "name": "Rings",
      "value": rings(bodies["bodies"][i]),
      "inline": true
    },
    {
      "name": "Orbital Mechanics",
      "value": `Orbital Period: ${bodies["bodies"][i]["orbitalPeriod"]} d\nSemi-Major Axis: ${bodies["bodies"][i]["semiMajorAxis"]} au\nOrbital Eccentricity: ${bodies["bodies"][i]["orbitalEccentricity"]}\nOrbital Inclination: ${bodies["bodies"][i]["orbitalInclination"]}°\nArg Of Periapsis: ${bodies["bodies"][i]["argOfPeriapsis"]}°\nRotational Period: ${bodies["bodies"][i]["rotationalPeriod"]} d\nRotational Period Tidally Locked: ${bodies["bodies"][i]["rotationalPeriodTidallyLocked"]}\nAxial Tilt: ${bodies["bodies"][i]["axialTilt"]}°`,
      "inline": true
    }
  ]
			};
			message.channel.send({ embed });}}}
	return
	}
	
	const planet = argu[0].toLowerCase().trim() + " " + argu[1].toLowerCase().trim()
	var flag = 0
	for (var i = 0; i < bodies["bodies"].length; i++){
		if (bodies["bodies"][i]["name"].toLowerCase() == planet || bodies["bodies"][i]["name"].toLowerCase() == argu[1].toLowerCase().trim()){
			var flag = 1
			if (bodies["bodies"][i]["type"] == "Planet"){
				const embed = {
  "title": `${bodies["bodies"][i]["type"]} - ${bodies["bodies"][i]["subType"]}`,
  "description": `Distance to Arrival: ${bodies["bodies"][i]["distanceToArrival"]} ls\nIs Landable: ${bodies["bodies"][i]["isLandable"]}\nGravity: ${bodies["bodies"][i]["gravity"]} G\nEarth Masses: ${bodies["bodies"][i]["earthMasses"]}\nRadius: ${bodies["bodies"][i]["radius"]} km\nSurface Temp: ${bodies["bodies"][i]["surfaceTemperature"]} K\nSurface Pressure: ${bodies["bodies"][i]["surfacePressure"]} Atmospheres\nvolcanism: ${bodies["bodies"][i]["volcanismType"]}`,
  "color": 13850502,
  "thumbnail": {
    "url": `https://www.edsm.net/img/bodies/planets/${types[`${bodies[`bodies`][i][`subType`]}`]}.png`
  },
  
  "author": {
    "name": bodies["bodies"][i]["name"]
  },
  "fields": [
    {
      "name": "Composition",
      "value": `Atmosphere Type: ${bodies["bodies"][i]["atmosphereType"]}\nAtmosphere Composition: \n${AtmosCompositionGenerator(bodies["bodies"][i])}\n\nSolid Composition:\n${SolidCompositionGenerator(bodies["bodies"][i])}`
    },
    {
      "name": "Materials",
      "value": materials(bodies["bodies"][i]),
      "inline": true
    },
    {
      "name": "Rings",
      "value": rings(bodies["bodies"][i]),
      "inline": true
    },
    {
      "name": "Orbital Mechanics",
      "value": `Orbital Period: ${bodies["bodies"][i]["orbitalPeriod"]} d\nSemi-Major Axis: ${bodies["bodies"][i]["semiMajorAxis"]} au\nOrbital Eccentricity: ${bodies["bodies"][i]["orbitalEccentricity"]}\nOrbital Inclination: ${bodies["bodies"][i]["orbitalInclination"]}°\nArg Of Periapsis: ${bodies["bodies"][i]["argOfPeriapsis"]}°\nRotational Period: ${bodies["bodies"][i]["rotationalPeriod"]} d\nRotational Period Tidally Locked: ${bodies["bodies"][i]["rotationalPeriodTidallyLocked"]}\nAxial Tilt: ${bodies["bodies"][i]["axialTilt"]}°`,
      "inline": true
    }
  ]
			};
				message.channel.send({ embed });
				}
			if (bodies["bodies"][i]["type"] == "Star"){
				const embed = {
  "title": `${bodies["bodies"][i]["type"]} - ${bodies["bodies"][i]["subType"]}`,
  "description": `Distance to Arrival: ${bodies["bodies"][i]["distanceToArrival"]} ls\nMain Star: ${bodies["bodies"][i]["isMainStar"]}\nScoopable: ${bodies["bodies"][i]["isScoopable"]}\nAge: ${bodies["bodies"][i]["age"]} million years\nSpectral Class: ${bodies["bodies"][i]["spectralClass"]}\nLuminosity: ${bodies["bodies"][i]["luminosity"]}\nAbsolute Magnitude: ${bodies["bodies"][i]["absoluteMagnitude"]}\nSolar Masses: ${bodies["bodies"][i]["solarMasses"]}\nSolar Radius: ${bodies["bodies"][i]["solarRadius"]}\nSurface Temp: ${bodies["bodies"][i]["surfaceTemperature"]} K`,
  "color": 13850502,
  "thumbnail": {
    "url": `https://www.edsm.net/img/bodies/stars/${types[`${bodies[`bodies`][i][`subType`]}`]}.png`
  },
  "author": {
    "name": bodies["bodies"][i]["name"]
  },
  "fields": [
    {
      "name": "Rings",
      "value": rings(bodies["bodies"][i]),
      "inline": true
    },
    {
      "name": "Orbital Mechanics",
      "value": `Orbital Period: ${bodies["bodies"][i]["orbitalPeriod"]} d\nSemi-Major Axis: ${bodies["bodies"][i]["semiMajorAxis"]} au\nOrbital Eccentricity: ${bodies["bodies"][i]["orbitalEccentricity"]}\nOrbital Inclination: ${bodies["bodies"][i]["orbitalInclination"]}°\nArg Of Periapsis: ${bodies["bodies"][i]["argOfPeriapsis"]}°\nRotational Period: ${bodies["bodies"][i]["rotationalPeriod"]} d\nRotational Period Tidally Locked: ${bodies["bodies"][i]["rotationalPeriodTidallyLocked"]}\nAxial Tilt: ${bodies["bodies"][i]["axialTilt"]}°`,
      "inline": true
    }
  ]
			};
			message.channel.send({ embed });}
		}
	}
	if (flag == 0){
		message.channel.send("The body ``" + argu[1] + "`` wasn't found in the system. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
		
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["bodies"],
	permLevel: "User"
};

exports.help = {
	name: "body",
	category: "Custom Commands",
	description: "All Available Information on a Body or Main star. If you just want the Main Star's info, don't use a comma.",
	usage: "body [System], <body>"
};