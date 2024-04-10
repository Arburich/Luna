// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	if (message.author.bot)
		return;
	if (message.content.toLowerCase().includes("thanks luna"))
		message.channel.send("You're Welcome! <:lunawave:728048962744877147>");
	if (message.content.toLowerCase().includes("thanks woona"))
		message.channel.send("You're Welcome! <:lunawave:728048962744877147>");
	if (message.content.toLowerCase().includes("thank you woona"))
		message.channel.send("You're Welcome! <:lunawave:728048962744877147>");
    if (message.content.toLowerCase().includes("thank you luna"))
		message.channel.send("You're Welcome! <:lunawave:728048962744877147>");	//You're Welcome! :heart:
	if (message.content.toLowerCase().includes("sorry luna"))
		message.channel.send("It's ok fren <:lunasweat:728048962766110760>"); //It's ok fren :purple_heart:
	if (message.content.toLowerCase().includes("happy birthday luna"))
		message.channel.send("Thanks fren! :cake: <:lunahype:728048962367389728>");
	if (message.content.toLowerCase().includes("love you luna"))
		message.channel.send("I love you too fren <:lunahype:728048962367389728>"); //It's ok fren :purple_heart:
	if (message.channel.id == "466276572836397056") {
		if (message.attachments.size > 0) {
			message.react(`💙`)
		}
	} 
//if (message.author.id == "353576939971411969"){
	//message.channel.send("Monster.", { files: ["./betray.mp3"] });
//}

	if (message.content.toLowerCase().includes("<@&637413476859510787>")){
		message.channel.send("https://gfycat.com/appropriateinsistentgalah")
	}
	if (message.channel.type == "DM") {
		client.channels.cache.get('466269232368320552').send("Hey <@223604997206573056>, " + message.author.toString()  + " sent me this in my PM's:\n" + message.content)
	}
	if (message.content.includes("discord.gg") || message.content.includes("discordapp.com/invite") || message.content.includes("discord.com/invite")) {
		message.delete()
	}
	if (message.channel.id == "571829552121118721"){
   if(message.attachments.size > 0){}
	else{
		message.delete()
	}}

	//if (message.content.toLowerCase().includes("audio") || message.content.toLowerCase().includes("sound")){
	//client.channels.get('468620269255131138').send("Hey <@223604997206573056>, " + message.author + " sent this with a keyword in " + "http://discordapp.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id + "\n" + message)
	//}
	//if(message.attachments.size > 0){
	//Attachment = (message.attachments).array();
	//Attachment.forEach(function(attachment) {
	//message.channel.send(message.member.displayName + ": " + attachment.url);
	//})}else{message.channel.send(message.member.displayName + ": ``" + message.content + "``")}
	//message.delete(1000)


	// Grab the settings for this server from Enmap.
	// If there is no guild, get default conf (DMs)
	const settings = message.settings = client.getGuildSettings(message.guild);

	// Also good practice to ignore any message that does not start with our prefix,
	// which is set in the configuration file.
	if (message.content.indexOf(settings.prefix) !== 0)
		return;

	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// Get the user or member's permission level from the elevation
	const level = client.permlevel(message);

	// Check whether the command, or alias, exist in the collections defined
	// in app.js.
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	// using this const varName = thing OR otherthign; is a pretty efficient
	// and clean way to grab one of 2 values!
	if (!cmd) {
		var fs = require("fs")
			var ccData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/cc.json", "utf8"));
		commands = Object.keys(ccData)
			if (commands.includes(command)) {
				message.channel.send(ccData[command].replace("{user}", message.author).replace("{mention}", message.mentions.members.first()))
				picker = Math.floor(Math.random() * 10);
				return
			} else {
				return
			}
	};

	// Some commands may not be useable in DMs. This check prevents those commands from running
	// and return a friendly error message.
	if (cmd && !message.guild && cmd.conf.guildOnly)
		return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

	if (level < client.levelCache[cmd.conf.permLevel]) {
		return message.channel.send(`Nah`)
		/*if (settings.systemNotice === "true") {
			return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
		} else {
			return;
		}*/
	}
	 if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${message.author}... try again ? ❌`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel ${message.author}... try again ? ❌`);
		}

	// To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
	// The "level" command module argument will be deprecated in the future.
	message.author.permLevel = level;

	message.flags = [];
	while (args[0] && args[0][0] === "-") {
		message.flags.push(args.shift().slice(1));
	}
	// If the command exists, **AND** the user has permission, run it.
	client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
	
	cmd.run(client, message, args, level);
};
