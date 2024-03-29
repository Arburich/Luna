// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
	// Load the guild's settings
	const settings = client.getGuildSettings(member.guild);

	var moment = require("moment");
	var fs = require("fs")
		var members = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/members.json", "utf8"));
		members["tracking"][member] = moment()
		members["total"] = client.users.cache.size.toLocaleString()
		fs.writeFileSync(__dirname + "/../commandStorage/members.json", JSON.stringify(members))

		// If welcome is off, don't proceed (don't welcome the user)
		if (settings.welcomeEnabled !== "true")
			return;

	// Replace the placeholders in the welcome message with actual data
	if(member.guild.id == "319655945695395851"){
		var welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user);
		welcomeMessage = welcomeMessage.replace("{{admin}}", "<@&335148186656047104>");
		welcomeMessage = welcomeMessage.replace("{{moderator}}", "<@&442401565568139284>");
		welcomeMessage = welcomeMessage.replace("{{welcomer}}", "<@&467079026331090944>");
		// Send the welcome message to the welcome channel
		// There's a place for more configs here.
		client.channels.cache.get(settings.welcomeChannel).send(welcomeMessage).catch(console.error);
	}
};
