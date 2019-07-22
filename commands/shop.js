const money = require('./discord-muns.js');
exports.run = async (client, message, args) => {
  if(!args){
    message.channel.send("Incorrect syntax. Use !helpme shop for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
  }
  if(args[0] === "list"){
    message.channel.send(`= Shop Items! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ =

• 1.) Server Emoji Slot :: 50 Lunabits 
    > The buyer can buy an emoji slot. Needs to fit 500x500px. 

• 2.) Custom Command    :: 30 Lunabits
    > Buys one !{command} that can use a basic chat reply. You can add links, picture links, or \"something fancy\".

• 3.) Animated Emoji    :: 50 Lunabits
    > Buys you a single Animated Emoji Slot. Nitro only!

• 4.) A Piece of Scrap  :: 250 Lunabits
    > An item from the Frontier Store worth $2.50

• 5.) A Chunk of Slag   :: 500 Lunabits
    > An item from the Frontier Store worth $5.00

• 6.) Some Refined Iron :: 1000 Lunabits
    > An item on the Frontier Store worth $10.00

=  Note: All items can be rejected at Moderator discretion.  =
= If you have suggestions for more items, let Arburich know! =`, {code: "asciidoc"});
    return;
  }
  else if ((args[0] === "buy") && (args[1])){
    switch (args[1]){
      case "1":
        money.fetchBal(message.author.id).then((j) => {
          if((j.money - 50) < 0){
            message.channel.send("You need 50 Lunabits for that.");
            return;
    }
    money.updateBal(message.author.id, -50).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had 50 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
                message.channel.send("Screenshot this and let an @Admin know you purchased an emoji." )
      return;
            })})
        break;
        case "2":
        money.fetchBal(message.author.id).then((j) => {
          if((j.money - 30) < 0){
            message.channel.send("You need 50 Lunabits for that.");
            return;
    }
    money.updateBal(message.author.id, -30).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had 30 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
                message.channel.send("Screenshot this and let an @Admin know you purchased a custom command." )
      return;
            })})
        break;
        case "3":
        money.fetchBal(message.author.id).then((j) => {
          if((j.money - 50) < 0){
            message.channel.send("You need 50 Lunabits for that.");
            return;
    }
    money.updateBal(message.author.id, -50).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had 50 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
                message.channel.send("Screenshot this and let an @Admin know you purchased an Animated Emoji." )
      return;
            })})
        break;
        case "4":
        money.fetchBal(message.author.id).then((j) => {
          if((j.money - 250) < 0){
            message.channel.send("You need 250 Lunabits for that.");
            return;
    }
    money.updateBal(message.author.id, -250).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had 250 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
                message.channel.send("Screenshot this and let @Arburich know you purchased this." )
      return;
            })})
        break;
        case "5":
        money.fetchBal(message.author.id).then((j) => {
          if((j.money - 500) < 0){
            message.channel.send("You need 500 Lunabits for that.");
            return;
    }
    money.updateBal(message.author.id, -500).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had 500 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
                message.channel.send("Screenshot this and let @Arburich know you purchased this." )
      return;
            })})
        break;
        case "6":
        money.fetchBal(message.author.id).then((j) => {
          if((j.money - 1000) < 0){
            message.channel.send("You need 1000 Lunabits for that.");
            return;
    }
    money.updateBal(message.author.id, -1000).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had 1000 Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
                message.channel.send("Screenshot this and let @Arburich know you purchased this." )
      return;
            })})
        break;
      default:
        message.channel.send("No such item number found. Use ``!helpme shop`` for proper syntax");
        break;
            }
  }
  else{
  message.channel.send("Incorrect syntax. Use ``!helpme shop`` for correct usage.")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shop",
  category: "Shop",
  description: "List shop items or buy items from the shop",
  usage: "shop <list|buy> [list number]"
};
