var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if(!args[0]){
  message.channel.send("Incorrect syntax, use ``!helpme conflicts`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    return;
  }
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
  function BGS(faction){
    let systemLink = faction.replace('+','%2B').replace(/ /g, '+');
    
    let uri = `https://elitebgs.app/api/ebgs/v4/factions?name=${systemLink}`;
    return JSON.parse(httpGet(uri));
    }
  var faction = BGS(argu)
  if(faction.docs.length == 0){
    message.channel.send("The faction ``" + argu + "`` wasn't found. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
  }
  var output = ""
  for(var i = 0; i < faction.docs[0].faction_presence.length;i++){
    if(faction.docs[0].faction_presence[i].conflicts.length > 0){
      output += `== ${faction.docs[0].faction_presence[i].system_name} ==\n`
      output += ` * conflict status * \n`
      //var states = ""
      for(var j = 0; j < faction.docs[0].faction_presence[i].conflicts.length;j++){
        output += `type     :: ${faction.docs[0].faction_presence[i].conflicts[j].type}\n`
        output += `status   :: ${faction.docs[0].faction_presence[i].conflicts[j].status}\n`
        output += `enemy    :: ${faction.docs[0].faction_presence[i].conflicts[j].opponent_name}\n`
        output += `at stake :: ${faction.docs[0].faction_presence[i].conflicts[j].stake}\n`
        output += `days won :: ${faction.docs[0].faction_presence[i].conflicts[j].days_won}\n`
      }
    }
    
    if((i%4) == 0 && (i > 1)){
      message.channel.send(output,{code :"asciidoc"})
      output = ""
    }

  }
message.channel.send(output,{code :"asciidoc"})  
  
  
  

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["conflict","war","wars"],
  permLevel: "User"
};

exports.help = {
  name: "conflicts",
  category: "Custom Commands",
  description: "Load Information about Conflicts related to a faction",
  usage: "conflicts <faction name>"
};
