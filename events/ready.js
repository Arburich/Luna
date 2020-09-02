module.exports = async client => {
	// Log that the bot is online.
	client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

	// Make the bot "play the game" which is the help command with default prefix.
	//client.user.setActivity(`${client.config.defaultSettings.prefix}helpme`, {
		client.user.setActivity(`Arb Destroy my Code`, {
		type: "WATCHING"
	});
	//${client.config.defaultSettings.prefix}helpme
};
