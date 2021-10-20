module.exports = (client, reaction, member) => {
	if(reaction.emoji.id == "842084652218449940" && reaction.message.id === "899397177103765575") 
        {
			var guild = client.guilds.cache.get("319655945695395851")
            guild.members.fetch(member.id) // fetch the user that reacted
                .then((member) => 
                {
                    let role = (member.guild.roles.cache.find(role => role.name === "Jeros'd"));
                    member.roles.remove(role)
                    .then(() => 
                    {
                        console.log(`User was un Jeros'd`);
						var fs = require("fs")
						var jerosData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/jerosd.json", "utf8"));
						var moment = require("moment");
						jerosData[member.id]["timeleft"] = moment()
						var duration = moment.duration(moment(jerosData[member.id]["timeleft"]).diff(moment(jerosData[member.id]["timeentered"])));
						//console.log(member)
						
						guild.channels.cache.get('466276477546266625').send( `<@${member.id}>` + " was Jeros'd for " + duration.format() + ` by <@${jerosData[member.id]["jerosdby"]}>`)
						if(jerosData[member.id]["worsttime"] == 0){
							jerosData[member.id]["worsttime"] = duration
							jerosData[member.id]["besttime"] = duration
						}
						else if(duration > moment.duration(jerosData[member.id]["worsttime"])){
							jerosData[member.id]["worsttime"] = duration
						}
						else if(duration < moment.duration(jerosData[member.id]["bestttime"])){
							jerosData[member.id]["besttime"] = duration
						}
						fs.writeFileSync(__dirname + "/../commandStorage/jerosd.json", JSON.stringify(jerosData))
                    }
                    );
                });
        }
};
