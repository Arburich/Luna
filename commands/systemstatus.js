var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  if(!args[0]){
  message.channel.send("Incorrect syntax, use ``!helpme systemstatus`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    return;
  }
  
let factionDetail = "";
let argu = ""
    for(var i = 0; i < args.length; i++){
        if(i == args.length-1) argu += args[i];
        else argu += args[i] + " ";
    }
  function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
  function download(system){
    let systemLink = system.replace('+','%2B').replace('&','%26').replace(/ /g, '+').replace("&", "%26");
    let uri = `https://elitebgs.app/api/ebgs/v4/systems?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  function BGS(faction){
    let systemLink = faction.replace('+','%2B').replace('&','%26').replace(/ /g, '+').replace("&", "%26");
    let uri = `https://elitebgs.app/api/ebgs/v4/factions?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  var factions = [];
  var system = download(argu);
  
  if(system["docs"]["0"] == undefined){
    message.channel.send("The system name wasn't found. Make sure you are spelling it correctly and that it "
                        + "is populated!")
    return;
  }
  var eddb_id = system["docs"]["0"]["eddb_id"]
  var systemName = system["docs"]["0"]["name"];
  var testchart = `http://jegin.net/testchart2.php?sysid=${eddb_id}.png`;
  /*var testchart = `http://jegin.net/testchart2.php?sysid=${eddb_id}.png`;*/
  //message.channel.send(testchart);
  for(i = 0; i <= 7; i++) {
    if(system["docs"]["0"]["factions"][i] != undefined){
      factions.push(system["docs"]["0"]["factions"][i]["name_lower"]);
    }
    else{
    break;}
  }
factions.reverse();
  var output = "";
  var loading = "Loading Faction List.";
  for(i = 0; i < factions.length; i++){
    var bgs = BGS(factions[i]);
    let responseFaction = bgs.docs[0];
    let responseSystem = system.docs[0];
    let updatedAt = moment(responseSystem.updated_at);
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
      factionDetail += `== ${factionName} == \n`; } 
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
    factionDetail += `  Last Updated :: ${updatedAt.fromNow()}\n`;
  }
  function go(){
    message.channel.send(factionDetail, {code: "asciidoc"});
  }
  var timeMax = Date.now();
  var timeMin = timeMax - (15 * 24 * 60 * 60 * 1000)
  var systemName = systemName.replace('+','%2B').replace(' ', '+');
  //const embed = {
  //      "color": 15866827,
  //      "image": {
  //          "url": `https://elitebgs.app/chartgenerator/systems/influence?name=${systemName}&timemin=${timeMin}&timemax=${timeMax}&theme=dark`
  //      }
    //};
    //message.channel.send({ embed });

//setTimeout(go, 1000);
//message.channel.send();
  message.channel.sendFile(testchart).then(function() {
    setTimeout(go, 1000);
});

}



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