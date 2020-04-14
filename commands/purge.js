var moment = require("moment");
exports.run = async (client, message, args, level) => {
  
  const toDel = args[0]
  if (!args[0]) {
	  message.channel.send("Need a number!")
	  return
  }
  
  if (message.channel.type == 'text') {
        message.channel.fetchMessages({ limit: args[0]})
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted
          
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Moderator",
  description: "Purges Stuff",
  usage: "purge <#>"
};
