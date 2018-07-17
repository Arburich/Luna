const money = require('discord-money');
exports.run = async (client, message, args) => {
  if(!args || args.length < 1 || !args[1]){
    message.channel.send("Incorrect syntax. Use !helpme reward for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
  }

  let memberID = message.mentions.members.first().id;
  let member = message.mentions.members.first();
    money.updateBal(memberID, args[1]).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${member} got ${args[1]} Lunabits.\n**New Balance:** ${i.money} Lunabits`);
      return;
            })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "reward",
  category: "Shop",
  description: "Rewards a user with Lunabits",
  usage: "reward <@user> <Lunabits>"
};
