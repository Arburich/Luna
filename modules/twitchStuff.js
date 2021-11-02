module.exports = (client) => {
	//const tclient = new Client
		request = require(`request`);
	var fs = require("fs")
	require('dotenv').config();
	CLIENT_ID = process.env.CLIENT_ID;
	CLIENT_SECRET = process.env.SECRET;
	GET_TOKEN = " https://id.twitch.tv/oauth2/token";
	GET_STREAM = "https://api.twitch.tv/helix/streams"

		getToken = (url, callback) => {
		const options = {
			url: GET_TOKEN,
			json: true,
			body: {
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				grant_type: "client_credentials"
			}
		};

		request.post(options, (err, res, body) => {
			if (err) {
				return console.log(err);
			}
			//console.log(`Status: ${res.statusCode}`);
			//console.log(body);

			callback(res);
		});
	};

	var AT = ``;
	getToken(GET_TOKEN, (res) => {
		//console.log(res.body);
		AT = res.body.access_token;
		return AT;
	});

	const getStream = (url, accessT, callback) => {
		const streamOptions = {
			url: GET_STREAM,
			method: "GET",
			headers: {
				'Client-ID': CLIENT_ID,
				'Authorization': `Bearer ${accessT}`
			},
			qs: {
				'user_login': `arburich`
			}
		}

		request.get(streamOptions, (err, res, body) => {
			if (err) {
				return console.log(err);
			}
			//console.log(`Status: ${res.statusCode}`);
			var response = JSON.parse(body)
			//console.log(response.data[0])
			var isOn = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/twitch.json", "utf8"));
			if(response.data[0] == undefined){
				console.log("Arb is offline")
				if(isOn.online == true){
					console.log("Arb seems to have gone offline recently")
					isOn.online = false
					fs.writeFileSync(__dirname + "/../commandStorage/twitch.json", JSON.stringify(isOn))
				}
				return
			}
			else if(response.data[0].type == 'live' && isOn.online == false){
				client.channels.cache.get("903666148942426122").send(`<@&903670386804269057> Arboo is live, apparently playing ${response.data[0].game_name}.\n${response.data[0].title}\nhttps://twitch.com/Arburich`)
				isOn.online = true
				fs.writeFileSync(__dirname + "/../commandStorage/twitch.json", JSON.stringify(isOn))
			}
		});
	};
	
	async function Arb() {
		setTimeout(() => {
			//console.log(AT);
			getStream(GET_STREAM, AT, (response) => {})
		}, 2000)
	}
	

	var cron = require("node-cron")

		cron.schedule('* * * * *', () => {
			Arb()
		});

	/*	client.logger.log('Twitch Watch Active')
	require('dotenv').config();
	console.log(process.env.USER)
	console.log(process.env.PASS)
	const tmi = require('tmi.js');

	const tclient = new tmi.Client({
	options: {
	debug: true
	},
	identity: {
	username: process.env.USER,
	password: process.env.PASS
	},
	channels: ['arburich']
	});

	tclient.connect();

	tclient.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if (self)
	return;

	if (message.toLowerCase() === '!hello') {
	// "@alca, heya!"
	tclient.say(channel, `@${tags.username}, heya!`);
	}
	});
	 */
};