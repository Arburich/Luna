module.exports = async client => {
	
	require("../modules/lookout.js")(client);
	client.logger.log( 'STARTING BGS LOOKOUT o7')
	require("../modules/tick.js")(client);
	client.logger.log( 'STARTING TICK LOOKOUT o7')
	// Log that the bot is online.
	client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");

	// Make the bot "play the game" which is the help command with default prefix.
	client.user.setActivity(`${client.config.defaultSettings.prefix}helpme`, {
		type: "PLAYING"
	});
	//client.channels.cache.get("899396269359894569").messages.fetch("899397177103765575").then(m => {
        //console.log("Cached reaction message.");
    //}).catch(e => {
    //console.error("Error loading message.");
    //console.error(e);
    //});
	//${client.config.defaultSettings.prefix}helpme
	
};
