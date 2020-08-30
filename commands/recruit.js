exports.run = async(client, message, args, level) => {
	const member = message.mentions.members.first();
	const role2 = message.guild.roles.find(r => r.name === "Newcomer");

	const role1 = message.guild.roles.find(r => r.name === "Alchemist");

	if (member.roles.has(role1.id)) {
		member.removeRole(role1).catch(console.error);
	} else {
		member.addRole(role1).catch(console.error);
	}
	if (member.roles.has(role2.id)) {
		member.removeRole(role2).catch(console.error);
	} else {
		member.addRole(role2).catch(console.error);
	}

	message.channel.send("Welcome to Alchemy Den " + member + "! <:lunao7:728048963000729681> \n\nYou are now an Alchemist! Head on over to <#466276477546266625> and say hello! \n\nMake sure to also check out the bottom of <#319655945695395851> for some info on this server. \n\n Glad to have you here!! <:NYND:539592347223064599>");
	client.channels.get('466276477546266625').send('Welcome our new fren ' + member + " everyone! <:lunahype:728048962367389728>")
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Regular"
};

exports.help = {
	name: "recruit",
	category: "Miscelaneous",
	description: "Recruiting a fren!",
	usage: "recruit <@name>"
};
