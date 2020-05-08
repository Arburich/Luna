const money = require('./discord-muns.js');
exports.run = async (client, message, args) => {
  if(!args || args.length < 1 || !args[1]){
    message.channel.send("Incorrect syntax. Use ``!helpme reward`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
  }
  if (args[1] < 0){
    message.channel.send("Can't give someone a negative amount.");
    return;
  }
  
  
  
  let memberID = message.mentions.members.first().id;
  let member = message.mentions.members.first();
  
  function addRole(role)
{
	if(message.member.roles.has("486585462379773961")){
		member.removeRole("486585462379773961").catch(console.error);
	}
	if(message.member.roles.has("486588517158486016")){
		member.removeRole("486588517158486016").catch(console.error);
	}
	if(message.member.roles.has("486592445782687765")){
		member.removeRole("486592445782687765").catch(console.error);
	}
	if(message.member.roles.has("486592970217488404")){
		member.removeRole("486592970217488404").catch(console.error);
	}
	if(message.member.roles.has("486593476260265994")){
		member.removeRole("486593476260265994").catch(console.error);
	}
	if(message.member.roles.has("486594265242140673")){
		member.removeRole("486594265242140673").catch(console.error);
	}
	member.addRole(role).catch(console.error);
}
  
    money.updateBal(memberID, args[1]).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${member} got ${args[1]} Lunabits.\n**New Balance:** ${i.money} Lunabits\n` + "**Lifetime Collected**: " + i.totalbits + " Lunabits");
				if (i.totalbits > 99 && i.totalbits < 200 && !message.member.roles.has("486585462379773961")){
					message.channel.send(member + ", you are promoted to Rank 1: Follower! https://www.youtube.com/watch?v=sSxx12vADYk")
					addRole("486585462379773961")
				}
				if (i.totalbits > 199 && i.totalbits < 350 && !message.member.roles.has("486588517158486016")){
					message.channel.send(member + ", you are promoted to Rank 2: Supporter! https://www.youtube.com/watch?v=sSxx12vADYk")
					addRole("486588517158486016")
				}
				if (i.totalbits > 349 && i.totalbits < 500 && !message.member.roles.has("486592445782687765")){
					message.channel.send(member + ", you are promoted to Rank 3: Dignitary! https://www.youtube.com/watch?v=sSxx12vADYk")
					addRole("486592445782687765")
				}
				if (i.totalbits > 499 && i.totalbits < 700 && !message.member.roles.has("486592970217488404")){
					message.channel.send(member + ", you are promoted to Rank 4: Ambassador! https://www.youtube.com/watch?v=sSxx12vADYk")
					addRole("486592970217488404")
				}
				if (i.totalbits > 699 && i.totalbits < 1000 && !message.member.roles.has("486593476260265994")){
					message.channel.send(member + ", you are promoted to Rank 5: Chief! https://www.youtube.com/watch?v=sSxx12vADYk")
					addRole("486593476260265994")
				}
				if (i.totalbits > 999 && !message.member.roles.has("486594265242140673")){
					message.channel.send(member + ", you are promoted to Rank 6: Commander! https://www.youtube.com/watch?v=sSxx12vADYk")
					addRole("486594265242140673")
				}
      return;
            })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r"],
  permLevel: "Moderator"
};

exports.help = {
  name: "reward",
  category: "Shop",
  description: "Rewards a user with Lunabits",
  usage: "reward <@user> <Lunabits>"
};
