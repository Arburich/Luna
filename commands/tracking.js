exports.run = async (client, message, args, level) => {
  var fs = require("fs")
  var members = JSON.parse(fs.readFileSync("./members.json", "utf8"));
  var moment = require("moment");
  var todaysdate = moment();
  
  var day = 0
  var week = 0 
  var month = 0
  
  for (var key in members["tracking"]) {
    if (members["tracking"].hasOwnProperty(key)) {
        //key + " -> " + members["tracking"][key]
		var eventdate = moment(members["tracking"][key]);
		joined = eventdate.diff(todaysdate, 'days')
		if (joined == 0){
			day += 1
		}
		if (joined < 0 && joined >= -7){
			week += 1
		}
		if (joined > -29){
			month += 1
		}
    }
}
  output = `== New Memeber Tracking ==\nNew Members in last:\n\nDay :: ${day}\nWeek :: ${week}\nMonth :: ${month}\n\nTotal :: ${members["total"]}`
 message.channel.send(output,{code: "asciidoc"})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "tracking",
  category: "Custom Commands",
  description: "New User Tracking",
  usage: "tracking"
};
