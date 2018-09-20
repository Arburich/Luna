exports.run = async (client, message, args, level) => {
  if (!message){
    message.channel.send("k")
  }
  let argu = ""
    for(var i = 0; i < args.length; i++){
        if(i == args.length-1) argu += args[i];
        else if(args[i] === " ") argu += args[i];
        else argu += args[i] + " ";
    }
  var split = argu.split(" ");
  var final = ""
  for(var i = 0; i < split.length;i++){
    var len = split[i].length;
    final += split[i].substring(0, len-1) + "k" + split[i].substring(len-1) + " ";
  }
  message.channel.send(final)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gilm",
  category: "Custom Commands",
  description: "Just try it",
  usage: "gilm <anything you want to say to make it sound like gilmster>"
};
