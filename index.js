// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (process.version.slice(1).split(".")[0] < 8)
	throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
const sql = require('sqlite3');
const money = require('discord-money');
const { Player } = require('discord-player');
const { Client, Intents } = require('discord.js');
// We also load the rest of the things we need in this file:
const {
	promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
//const EnmapLevel = require("enmap-level");
const http = require('http');
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./util/Logger");
// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({
		//provider: new EnmapLevel({
			//name: "settings"
		//})
	});
global.player = new Player(client, client.config.opt.discordPlayer);
// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.
player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`Started playing ${track.title} in **${queue.connection.channel.name}** 🎧`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`Track ${track.title} added in the queue ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('I finished reading the whole queue ✅');
});

const init = async() => {

	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const cmdFiles = await readdir("./commands/");
	client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith(".js"))
			return;
		const response = client.loadCommand(f);
		if (response)
			console.log(response);
	});

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		const event = require(`./events/${file}`);
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
		player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

		const mod = require.cache[require.resolve(`./events/${file}`)];
		delete require.cache[require.resolve(`./events/${file}`)];
		for (let i = 0; i < mod.parent.children.length; i++) {
			if (mod.parent.children[i] === mod) {
				mod.parent.children.splice(i, 1);
				break;
			}
		}
	});

	// Generate a cache of client permissions for pretty perms
	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
		const thisLevel = client.config.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}

	// Here we login the client.
	client.login(client.config.token);

	// End top-level async/await function.
};

init();
/*
*/
