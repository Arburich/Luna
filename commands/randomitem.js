exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  var items = require('../itemsJSON.json');
  if (!args[0]){
    var num = Math.floor(Math.random() * 422) + 1
  }
  else if (parseInt(args[0]) >= 1 || parseInt(args[0]) <= 422) {
     var num = parseInt(args[0])
  }
  else{
    var num = Math.floor(Math.random() * 422) + 1
  }
  var output = `== Item ${num} ==\n` + 
    `Item Description :: ${items[num]["Item Description"]}\n` + 
    `Date of Recovery :: ${items[num]["Date of Recovery"]}\n` + 
    `Location of Recovery :: ${items[num]["Location of Recovery"]}\n` + 
    `Current Status :: ${items[num]["Current Status"]}`
  
  if (items[num].hasOwnProperty('Notes')) {
    output += `\nNotes :: ${items[num]["Notes"]}`
  }
  else {
    output += `\nNotes :: N/A`
  }
  message.channel.send(output, {code: "asciidoc"});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ri","item","randomi"],
  permLevel: "User"
};

exports.help = {
  name: "randomitem",
  category: "Custom Commands",
  description: "Picks a Wierd Item from a list of weird things. Fun!",
  usage: "randomitem (number if you know one particular item)"
};
