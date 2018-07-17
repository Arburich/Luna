const money = require('discord-money');
exports.run = async (client, message, args, level) => {
  if(!args[0]){
  money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  const embed = {
        "color": 15866827,
        "title": "__**Balance**__",
        "description":"\n**" + i.money + "** Lunabits Available",
        "thumbnail" : {
          url: picture(i.money)
        }
    };
    message.channel.send({ embed });
    
    
   })
  }
  else{
  let member = message.mentions.members.first().id;
  money.fetchBal(member).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  const embed = {
        "color": 15866827,
        "title": "__**Balance of User Mentioned**__",
        "description":"\n**" + i.money + "** Lunabits Available",
        "thumbnail" : {
          url: picture(i.money)
        }
    };
    message.channel.send({ embed });
   })
}
}

function picture(j){

  if(j == 0){
    return "https://i.imgur.com/OJ0cRlV.gif";
  }
  else if((j >= 1) && (j <= 10)){
    return "https://i.imgur.com/hTBH5jD.png";
  }
  else if ((j >= 11) && (j <= 29)){
    return "https://i.imgur.com/sUMocW5.png";
  }
  else if ((j >= 30) && (j <= 50)){
    return "https://i.imgur.com/0kB211q.png";
  }
  else{
    return "https://i.imgur.com/go7WMAH.png";
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "balance",
  category: "Shop",
  description: "Shows your balance of Lunabits",
  usage: "balance"
};
