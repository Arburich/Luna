var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
exports.run = async(client, message, args, level) => {
	var ParallelRequest = require('parallel-http-request');
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
	var request = new ParallelRequest(config);
	let factionDetail = "";
	let argu = ""
	if(args.length == 0){
		message.channel.send("I require a system! <:lunasweat:728048962766110760>")
		return
	}
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	function download(sys) {
		let systemLink = sys.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v5/systems?name=${systemLink}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	function BGS(faction) {
		let systemLink = faction.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v5/factions?name=${systemLink}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	async function SENDIT(request){
		const output = new Promise((resolve) =>{
		request.send(resolve)
	}).then(function(result){
		return result
	})
	return output
	}
	download(argu);
	var system = await SENDIT(request)
	system= system[0].body
	if (system["docs"]["0"] == undefined) {
		message.channel.send("The system name wasn't found. Make sure you are spelling it correctly and that it "
			 + "is populated!")
		return;
	}
	var eddb_id = system["docs"]["0"]["eddb_id"]
	var systemName = system["docs"]["0"]["name"];
	var testchart = `http://jegin.net/testchart2.php?sysid=${eddb_id}.png`;
	var factions = [];
	for (i = 0; i <= 7; i++) {
		if (system["docs"]["0"]["factions"][i] != undefined) {
			factions.push(system["docs"]["0"]["factions"][i]["name_lower"]);
		} else {
			break;
		}
	}
	factions.reverse();
	var output = "";
	
	request.clean()
	for (i = 0; i < factions.length; i++) {	
		BGS(factions[i]);
	}
	var allBGS = await SENDIT(request)
	var updatedAt
	for (i = 0; i < allBGS.length; i++) {
		var bgs = allBGS[i].body
		let responseFaction = bgs.docs[0];
		let responseSystem = system.docs[0];
		updatedAt = moment(responseSystem.updated_at);
		let systemName = responseSystem.name;
		let systemState = responseSystem.state;
		let controlling = responseSystem.controlling_minor_faction;
		let factionName = responseFaction.name;
		let factionNameLower = responseFaction.name_lower;
		let systemIndex = responseFaction.faction_presence.findIndex(element => {
				return element.system_name_lower === systemName.toLowerCase();
			});
		let state = responseFaction.faction_presence[systemIndex].state;
		let influence = responseFaction.faction_presence[systemIndex].influence;
		let pendingStatesArray = responseFaction.faction_presence[systemIndex].pending_states;
		let recoveringStatesArray = responseFaction.faction_presence[systemIndex].recovering_states;

		if (controlling === factionNameLower) {
			factionDetail += `== ${factionName} == \\*CONTROLLING FACTION\\*\n `;
		} else {
			factionDetail += `== ${factionName} == \n`;
		}
		factionDetail += `  Influence :: ${(influence * 100).toFixed(1)}%\n`;
		factionDetail += `  State :: ${state}\n`;
		let pendingStates = "";
		if (pendingStatesArray.length === 0) {
			pendingStates = "None";
		} else {
			pendingStatesArray.forEach((pendingState, index, factionPendingStates) => {
				pendingStates = `${pendingStates}${pendingState.state}`;
				if (index !== factionPendingStates.length - 1) {
					pendingStates = `${pendingStates}, `
				}
			});
		}
		factionDetail += `  Pending States :: ${pendingStates}\n`;
		let recoveringStates = "";
		if (recoveringStatesArray.length === 0) {
			recoveringStates = "None";
		} else {
			recoveringStatesArray.forEach((recoveringState, index, factionRecoveringState) => {

				recoveringStates = `${recoveringStates}${recoveringState.state}`;
				if (index !== factionRecoveringState.length - 1) {
					recoveringStates = `${recoveringStates}, `
				}
			})
		}
		factionDetail += `  Recovering States :: ${recoveringStates}\n`;
		
	}
	factionDetail += `\nLast Updated :: ${updatedAt.fromNow()}`;
	function go() {
		message.channel.send(factionDetail, {
			code: "asciidoc"
		});
	}
	var timeMax = Date.now();
	var timeMin = timeMax - (15 * 24 * 60 * 60 * 1000)
	var systemName = systemName.replace('+', '%2B').replace(' ', '+');
	message.channel.send({
			files: [{
                attachment: testchart,
                name: 'file.png'
				}]
		}).then(function () {
		go()
	});

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "systemstatus",
	category: "Background Simulation",
	description: "Gives the BGS update of the Factions in a System",
	usage: "systemstatus <system>"
};
/*var bgs = BGS(factions[i]);
output = output + "\n== "
+ bgs["docs"]["0"]["name"] + " ==\n      Influence :: <"
+ (bgs["docs"]["0"]["faction_presence"]["0"]["influence"] * 100).toFixed(2) + ">";
if(bgs["docs"]["0"]["faction_presence"]["0"]["state"] == undefined){
output = output + "\n      State: None"
}
else {
output = output + "\n      State :: <" + bgs["docs"]["0"]["faction_presence"]["0"]["state"] + ">";
}*/
