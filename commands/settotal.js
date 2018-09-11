const money = require('./discord-muns.js');
exports.run = async (client, message, args) => {
  if(!args || args.length < 1 || !args[1]){
    message.channel.send("Incorrect syntax. Use ``!helpme settotal`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
  }

  let memberID = message.mentions.members.first().id;
  let member = message.mentions.members.first();
    money.setTotal(memberID, args[1]).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${member} had ${args[1]} Lunabits set to the total. \n**New Total:** ${i.totalbits} Lunabits`);
      return;
            })};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "settotal",
  category: "Shop",
  description: "Sets the total lunabits of a user",
  usage: "settotal <@user> <Lunabits>"
};
