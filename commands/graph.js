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
    let systemLink = system.replace('+','%2B').replace(' ', '+');
    let uri = `https://elitebgs.kodeblox.com/api/ebgs/v4/systems?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  function BGS(faction){
    let systemLink = faction.replace('+','%2B').replace(' ', '+');
    let uri = `https://elitebgs.kodeblox.com/api/ebgs/v4/factions?name=${systemLink}&timemin=1531593000000&timemax=1534311078081`;
    return JSON.parse(httpGet(uri));
    }
  
  var factions = [];
  var system = download(argu);
  
  if(system["docs"]["0"] == undefined){
    message.channel.send("The system name wasn't found. Make sure you are spelling it correctly and that it "
                        + "is populated!")
    return;
  }
  var eddb_id = system["docs"]["0"]["eddb_id"];
  var systemName = system["docs"]["0"]["name"];
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
  message.channel.send(eddb_id + systemName)
  for(i = 0; i < factions.length; i++){
    var bgs = BGS(factions[i]);
    let responseFaction = bgs.docs[0];
    let responseSystem = system.docs[0];
    let updatedAt = moment(responseSystem.updated_at);
    let systemName = responseSystem.name;
    let systemState = responseSystem.state;
    let factionName = responseFaction.name;
    let factionNameLower = responseFaction.name_lower;
    let systemIndex = responseFaction.faction_presence.findIndex(element => {
   return element.system_name_lower === systemName.toLowerCase();
     });
    let state = responseFaction.faction_presence[systemIndex].state;
    message.channel.send(factionName)
  }
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["g","gr","graphs"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "graph",
  category: "Custom Commands",
  description: "Graph Testing and making",
  usage: "graph <system>"
};
