const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
exports.run = async(client, message, args, level) => {
  if(!args[0]){
    var randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const member = message.author;
  const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setThumbnail(`${member.avatarURL}`)
    .setAuthor(`${member.tag} (${member.id})`, `${member.avatarURL}`)
    .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
    .addField("Status", `${status[member.presence.status]}`, true)
    .addField("Playing", `${member.presence.game ? `${member.presence.game.name}` : "not playing anything."}`, true)
    //.addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("Joined", `${moment().diff(moment.utc(member.joinedAt), 'days')} Days Ago (Created ${moment.utc(member.createdAt).format("MMMM Do YYYY")})`, true)

  message.channel.send({embed});
  }else{
  var randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const member = message.mentions.members.first();
  const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setThumbnail(`${member.user.avatarURL}`)
    .setAuthor(`${member.user.tag} (${member.id})`, `${member.user.avatarURL}`)
    .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("Joined", `${moment().diff(moment.utc(member.joinedAt), 'days')} Days Ago (Created ${moment.utc(member.user.createdAt).format("MMMM Do YYYY")})`, true)

  message.channel.send({embed});
  }
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "userinfo",
  category: "System",
  description: "Shows some User Info",
  usage: "userinfo <@name>"
};
