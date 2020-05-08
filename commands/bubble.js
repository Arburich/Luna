var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.run = async (client, message, args, level) => {
let argu = ""
    for(var i = 0; i < args.length; i++){
        if(i == args.length-1) argu += args[i];
        else if(args[i] === ",") argu += args[i];
        else argu += args[i] + " ";
    }
	if(args.length < 3){
	message.channel.send("Incorrect syntax, use ``!helpme bubble`` for correct usage. Needs at least 3 systems! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    return;
  }
    let systems = argu.split(",")
  const msg = await message.channel.send("Getting the Soap Bottle Ready...");
  function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
var flag = false
  function download(system){
    let systemLink = system.trim().replace('+','%2B').replace(/ /g, '+').replace("&", "%26");
	let systemLink = faction.replace('+','%2B').replace(/ /g, '+');
    let uri = `https://www.edsm.net/api-v1/system?sysname=${systemLink}&coords=1`;
    
    if(httpGet(uri).length <= 2 ){
      msg.edit("No information on EDSM for ``" + system + "``");
	  flag = true
    }
    return JSON.parse(httpGet(uri));
  }
  var biggest = 0
  function maths(sys1, sys2){
    return Math.sqrt(Math.pow((sys2["coords"]["x"] - sys1["coords"]["x"]), 2)
                          + Math.pow((sys2["coords"]["y"] - sys1["coords"]["y"]), 2)
                          + Math.pow((sys2["coords"]["z"] - sys1["coords"]["z"]), 2)).toFixed(2);
  }
   //msg.edit("Doing A lot of Math....");
  var dist = []
  var name1= ""
  var name2= ""
  msg.edit("Downloading info")
  for (var i = 0; i < systems.length; i++){
	dist.push(download(systems[i]))
	if (flag != true){
		msg.edit("Loading " + i + " systems...")
	}
  }
  if(flag == true){
	  return;
  }
  for (var i = 0; i < dist.length; i++) {
    for (var k = i + 1; k < dist.length; k++) {
        if (dist[i] != dist[k]) {
            var distBetween = parseFloat(maths(dist[i], dist[k]))
            //message.channel.send(typeof(parseFloat(distBetween)))
            if (distBetween >= biggest){
              biggest = distBetween
              name1 = dist[i]["name"]
              name2 = dist[k]["name"]
            }
        }
    }
}
  msg.edit("Your defined bubble is ``" + biggest + "ly`` across with ``" + name1 + "`` and ``" + name2 + "`` being the furthest apart.")
  //msg.edit("The distance between ``" + systems[0] + "`` and ``" + systems[1] + "`` is ``" + distance + " ly``");
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bubble",
  category: "Background Simulation",
  description: "Given a list of systems, it will find the biggest distance between two points",
  usage: "bubble <system1>, <system2>, <systemx>"
};


