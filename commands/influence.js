var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  if(!args[0]){
  message.channel.send("Incorrect syntax, use ``!helpme influence`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
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
    let systemLink = system.replace('+','%2B').replace(' ', '+').replace("&", "%26");
    let uri = `https://elitebgs.app/api/ebgs/v4/systems?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  function BGS(faction){
    let systemLink = faction.replace('+','%2B').replace(' ', '+').replace("&", "%26");
    let uri = `https://elitebgs.app/api/ebgs/v4/factions?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  
  var factionSystems = BGS(argu)
  if(factionSystems["docs"]["0"] == undefined){
    message.channel.send("The faction wasn't found. Make sure you are spelling it correctly and that it "
                        + "is in game.")
    return;
  }
  var factions = [];
  var influence = [];
  for(var i = 0; i <= factionSystems["docs"]["0"]["faction_presence"].length - 1; i++) {
    if(factionSystems["docs"]["0"]["faction_presence"][i] != undefined){
      factions.push(factionSystems["docs"]["0"]["faction_presence"][i]["system_name"]);
      influence.push(factionSystems["docs"]["0"]["faction_presence"][i]["influence"]);
    }
    else{
    break;}
  }
  var Header = "== Total Population Influence ==\nFaction :: " + argu + "\nSystems in :: " + factions.length + "\n" ;
  //var popAndInf = "";
  var str = 0;
  for(var i = 0; i<factions.length;i++){
    var systems = download(factions[i])
    var pop = systems["docs"]["0"]["population"];
    var infpop = pop * influence[i];
    infpop = Math.round(infpop)
    str += infpop
    //popAndInf += factions[i] + ", Pop : " + pop + ", INF : " + (influence[i] * 100) + "\nSystem Influenced : " + infpop + "\n"
  }
    const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  str = numberWithCommas(str);
  Header += "People Under " + argu + "'s Flag :: " + str;
  message.channel.send(Header, {code: "asciidoc"})
  //message.channel.send(popAndInf, {code: "asciidoc"})
  //message.channel.send(Footer, {code: "asciidoc"})

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["inf"],
  permLevel: "User"
};

exports.help = {
  name: "influence",
  category: "Background Simulation",
  description: "Gives you the total population influence of a faction",
  usage: "inf <faction>"
};

