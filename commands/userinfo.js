/*
	Command to get some general info about the user and they're precence in the guild
*/

const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};

exports.run = async (client, message, args, level) => {
	// set the member object to get the info from, if a user was tagged, prioritize that
	let member;
	// get a random color generator
	let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

	if (message.mentions.members.size > 0) {
		member = message.mentions.members.first();
	} else {
		member = message.member;
	}
	console.log(member.presences)
	// now create the embed object and give it the data it wants
	let embed1 = new Discord.MessageEmbed()
		.setColor(randomColor)
		.setThumbnail(`${member.user.avatar != null ? member.user.avatarURL() : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"}`)
		.setAuthor(`${member.user.tag} (${member.id})`)
		.addField("Nickname:", `${(member.nickname !== null && member.nickname !== undefined) ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
		//.addField("Status", `${status[member.presences.status]}`, true)
		//.addField("Playing", `${member.presences.game ? `${member.presences.game.name}` : "Not playing anything."}`, true)
		.addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
		.addField("Joined", `${moment().diff(moment.utc(member.joinedAt), 'days')} Days Ago (Created ${moment.utc(member.user.createdAt).format("HH:mm, MMMM Do YYYY")}, it is now ${moment.utc().format("HH:mm, MMMM Do YYYY")}`, true)
	
	message.channel.send({
				embeds:[embed1]
			});
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
}

exports.help = {
  	name: "userinfo",
  	category: "Discord",
  	description: "Get the user info for this server",
  	usage: "userinfo <@user>"
}
