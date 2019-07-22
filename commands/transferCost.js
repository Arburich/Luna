var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.run = async (client, message, args, level) => {
let argu = ""
    for(var i = 0; i < args.length; i++){
        if(i == args.length-1) argu += args[i];
        else if(args[i] === ", ") argu += args[i];
        else argu += args[i] + " ";
    }

    let data = argu.split(", ");
  if(!data[0] || !data[1]){
    message.channel.send("Incorrect Syntax. Use ``!helpme transfercost`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    return;
  }
  
  if(data[0] < 1 || data[1] < 1){
	message.channel.send("Positive amounts above 0 please! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    return;
  }
  const cost = Math.round((.5 * data[1]) * (data[0] / 400));
  const time = Math.round((data[0] * 9.75) + 300);
  const timeMin = Math.round(time / 60);
  
  const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  const costComma = numberWithCommas(cost);
  const timeMinComma = numberWithCommas(timeMin);
  const lyComma = numberWithCommas(data[0]);
  const rebuyComma = numberWithCommas(data[1]);
  message.channel.send("== Ship Transfer Time and Cost =="+
					   "\nLight Years:: " + lyComma +
					   "\nRebuy Cost :: " + rebuyComma +
					   "\nCost       :: " + costComma +
					   "\nTime(min)  :: " + timeMinComma + " minutes",{code: "asciidoc"});
  
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cost"],
  permLevel: "User"
};

exports.help = {
  name: "transfercost",
  category: "Custom Commands",
  description: "Approximates how much your transfer cost will be.",
  usage: "transfercost <ly>, <ship rebuy cost>"
};


