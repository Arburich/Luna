var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.run = async (client, message, args, level) => {
  if(!args[0]){
  message.channel.send("Incorrect syntax, use ``!helpme systemstatus`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    return;
  }
  const msg = await message.channel.send("Loading Chart.");
let argu = ""
    for(var i = 0; i < args.length; i++){
        if(i == args.length-1) argu += args[i];
        else argu += args[i] + " ";
    }
msg.edit("Loading Chart..");
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
    let uri = `https://elitebgs.kodeblox.com/api/ebgs/v4/factions?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  
  var factions = [];
  var system = download(argu);
  msg.edit("Loading Chart...");
  if(system["docs"]["0"] == undefined){
    msg.edit("The system name wasn't found. Make sure you are spelling it correctly and that it "
                        + "is populated!")
    return;
  }
  
  var eddb_id = system["docs"]["0"]["eddb_id"];
  var testchart = `http://jegin.net/testchart2.php?sysid=${eddb_id}`;
  const embed = {
        "image": {
            "url": testchart
        }
    };
  msg.edit({embed});
  for(i = 0; i <= 7; i++) {
    if(system["docs"]["0"]["factions"][i] != undefined){
      factions.push(system["docs"]["0"]["factions"][i]["name_lower"]);
    }
    else{
    break;}
  }
  var loadin = "Loading Factions List.";
  const msg2 = await message.channel.send("Loading Factions List.");
factions.reverse();
  var output = "";
  for(i = 0; i < factions.length; i++){
    loadin = loadin + ".";
    msg2.edit(loadin);
    var bgs = BGS(factions[i]);
    output = output + "\n== "
      + bgs["docs"]["0"]["name"] + " ==\n      Influence :: <" 
      + (bgs["docs"]["0"]["faction_presence"]["0"]["influence"] * 100).toFixed(2) + ">";
    if(bgs["docs"]["0"]["faction_presence"]["0"]["state"] == undefined){
    output = output + "\n      State: None"
    }
    else {
    output = output + "\n      State :: <" + bgs["docs"]["0"]["faction_presence"]["0"]["state"] + ">";
    }
  }
  msg2.edit(output , {code: "asciidoc", split: { char: "\u200b" }});
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "systemstatus",
  category: "Custom Commands",
  description: "Gives the BGS update of the Factions in a System",
  usage: "systemstatus <system>"
};
