// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	//message.channel.send(args[0])
	let argu = ""
		for (var i = 1; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		chan = client.channels.get(args[0])
		checkChannel = args[0].replace(/\D/g, '');
	client.channels.get(checkChannel).startTyping();
	var timeout = argu.length * 150
		setTimeout(() => {
			client.channels.get(checkChannel).send(argu).then((message) => {
				client.channels.get(checkChannel).stopTyping();
			});
		}, timeout)
		//client.channels.get(checkChannel).send(argu);


};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "say",
	category: "System",
	description: "Something Luna can Say",
	usage: "say #channel whatever you want to say here"
};
