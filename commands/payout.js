const money = require('./discord-muns.js');
exports.run = async (client, message, args) => {
  if(!args || args.length < 1 || !args[1]){
    message.channel.send("Incorrect syntax. Use ``!helpme payout`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
  }

  let memberID = message.mentions.members.first().id;
  let member = message.mentions.members.first();
  money.fetchBal(memberID).then((j) => {
    if((j.money - args[1]) < 0 || args[1] < 0){
      message.channel.send("There aren't enough Lunabits to do that. Make sure you are removing the correct amount!");
      return;
    }
  
    money.updateBal(memberID, -(args[1])).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${member} had ${args[1]} Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
      return;
            })})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "payout",
  category: "Shop",
  description: "Removes Lunabits from a user.",
  usage: "payout <@user> <Lunabits>"
};
