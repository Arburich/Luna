/*
Find the nearest system with specified High Grade Emissions drop
 */

// module requires
const https = require("https");
const { codeBlock } = require("@discordjs/builders");

exports.run = async(client, message, args, level) => {
	// list all possible HGE drops
	let materialsArray = [{
			material: "Core Dynamics Composites",
			allegiance: "Federation",
			state: "Any"
		}, {
			material: "Proprietary Composites",
			allegiance: "Federation",
			state: "Any"
		}, {
			material: "Imperial Shielding",
			allegiance: "Empire",
			state: "Any"
		}, {
			material: "Improvised Components",
			allegiance: "Any",
			state: "Civil Unrest"
		}, {
			material: "Military Grade Alloys",
			allegiance: "Any",
			state: "War"
		}, // state can also be Civil War
		{
			material: "Military Supercapacitors",
			allegiance: "Any",
			state: "War"
		}, // state can also be Civil War
		{
			material: "Pharmaceutical Isolators",
			allegiance: "Any",
			state: "Outbreak"
		}, {
			material: "Proto Heat Radiators",
			allegiance: "Any",
			state: "Boom"
		}, {
			material: "Proto Light Alloys",
			allegiance: "Any",
			state: "Boom"
		}, {
			material: "Proto Radiolic Alloys",
			allegiance: "Any",
			state: "Boom"
		}
	]

	// split out the material that's been looked after and system
	let argsSplit = args.join(" ").split(", ").map(line => line.trim());

	let material = argsSplit[0];
	let refSystem = argsSplit[1] ? argsSplit[1].toLowerCase() : "";
	let radius = parseInt(argsSplit[2]);

	// list all materials if first argument was "list" or if no arguments specified
	if (material == "list" || args.length == 0) {
		let output = (
			`== List of all possible materials from an High Grade Emissions signal source. ==\n` + 
`Finding possible systems for specific material can be found by: !hgemats <material>, <referenceSystem>\n\n`)
		for (mat of materialsArray) {
			output += (
				`= ${mat.material} =\n` + 
				`Allegiance :: ${mat.allegiance}\n` + 
`State      :: ${mat.state == "War" ? "War or Civil war" : mat.state}\n`);
		}
		return message.channel.send(codeBlock("asciidoc", output));
	}

	// do a quick check for material and refSystem if they contain tags
	if (material.includes("@") || refSystem.includes("@")) {
		// and if they have @everyone
		if (material.toLowerCase().includes("@everyone") || material.toLowerCase().includes("@here")
			 || refSystem.includes("@everyone") || refSystem.includes("@here")) {
			return message.reply(`Trying to be funny pinging lots of people? Well... You're not..`);
		}
		return message.reply(`Tagging friends through a bot? Rude...`);
	}

	// check if the specified material is in the list, if not, give a response
	let lookingFor = {
		toFind: "",
		value: ""
	};

	if (material) {
		let validMatFound = false;
		let validMaterials = []

		for (mat of materialsArray) {
			validMaterials.push(`\`${mat.material}\``);

			if (mat.material.toLowerCase() == material.toLowerCase()) {
				lookingFor.toFind = mat.allegiance != "Any" ? "allegiance" : "factionState";
				lookingFor.value = mat.allegiance != "Any" ? mat.allegiance : mat.state;
				validMatFound = true;
				break;
			}
		}

		if (!validMatFound) {
			return message.reply(
				`Invalid material name: \`${material}\`.\n` + 
`Valid materials: ${validMaterials.join(", ")}`);
		}
	}

	// have a quick check if refSystem has something in it
	if (refSystem == "") {
		return message.reply(`Forgot to add a reference system? I don't know where to check from now :(`)
	}

	// do some checks to the radius if specified
	radius = (radius && !isNaN(radius)) ? (radius <= 100 ? (radius > 10 ? radius : 10) : 100) : 25;

	// get a list of systems from the EDSM api with the default
	let interestingSystems = await getSystems(refSystem, radius);

	// check if we have an array back or just the string for no data found
	if (typeof interestingSystems == "string") {
		return message.reply(interestingSystems);
	}

	// now go through the systems found and find the specific fit
	let systemCandidates = [];

	for (system of interestingSystems) {
		if (system.information[lookingFor.toFind]) {
			if (system.information[lookingFor.toFind].toLowerCase().includes(lookingFor.value.toLowerCase())) {
				systemCandidates.push(system)
			}
		}
	}

	// check if any systems were found, if not say to increase the radius
	if (systemCandidates.length == 0) {
		return message.reply(
			`No systems within distance of: ${radius}Ly of: \`${refSystem}\`.\n` + 
			`Try with increasing the radius to search for (up to max 100Ly)` + 
`\`!hgemats <material>, <referenceSystem>, <radius>\``);
	}

	// sort the list according to the distance from reference
	systemCandidates.sort((a, b) => a.distance - b.distance);

	// now create the output and throw in the first 20 found system names
	let output = (`= Possible systems where: "${material}" should be found within: ${radius}Ly.=\n` +
		`${systemCandidates.length > 20 ? "= Limited to 20 closest systems =\n" : ""}` + 
`\nDistance :: SystemName`);

	for (let i = 0; i < Math.min(20, systemCandidates.length); i++) {
		output += `\n${systemCandidates[i].distance.toString().padStart(6, " ")}Ly :: ${systemCandidates[i].name}`;
	}
	var listedOut = ""
	var count = 0
	for (var i = 0; i < output.length; i++){
		listedOut += output
		if(i % 2000 == 0){
			message.channel.send(codeBlock("asciidoc", listedOut));
			listedOut = ""
		}
	}
	return message.channel.send(codeBlock("asciidoc", listedOut));
}

async function getSystems(refSystem, radius) {
	return new Promise(function (resolve, reject) {
		https.get(
			`https://www.edsm.net/api-v1/sphere-systems` + 
			`?systemName=${encodeURIComponent(refSystem)}` + 
			`&showInformation=1` + 
`&radius=${radius}`,
			(res) => {

			if (res.statusCode < 200 || res.statusCode > 300) {
				return reject(new Error(`Status code: \`${res.statusCode}\``));
			}

			let data = "";
			let returnArray = [];

			res.on("data", (chunk) => {
				data += chunk;
			});

			// when all data got, parse out empty systems
			res.on("end", () => {
				try {
					if (data.length <= 2) {
						resolve(`No data found for system: \`${refSystem}\``);
					}

					for (system of JSON.parse(data)) {
						if (Object.keys(system.information).length > 0) {
							if (system.information.population > 0) {
								returnArray.push(system);
							}
						}
					}
				} catch (err) {
					reject(err);
				}

				resolve(returnArray);
			});

		}).on("error", (err) => {
			reject(err);
		});
	})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
}

exports.help = {
	name: "hgemats",
	category: "Custom Commands",
	description: "Lists systems with possible HGE drops",
	usage: "hgemats <material>, <reference system>, <radius>"
}
