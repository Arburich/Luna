module.exports = (client, reaction, member) => {
	console.log(reaction.emoji.id)
	console.log(reaction.message.id)
	if(reaction.emoji.id == "759947487090835488" && reaction.message.id === "903667747102269521") 
        {
			var guild = client.guilds.cache.get("903662146355875940")
            guild.members.fetch(member.id) // fetch the user that reacted
                .then((member) => 
                {
                    let role = (member.guild.roles.cache.find(role => role.name === "Fren"));
                    member.roles.add(role)
                    .then(() => 
                    {
                        console.log(`Added the role to ${member.displayName}`);
                    }
                    );
                });
        }
	if(reaction.emoji.id == "728048962623373344" && reaction.message.id === "903667747102269521") 
        {
			var guild = client.guilds.cache.get("903662146355875940")
            guild.members.fetch(member.id) // fetch the user that reacted
                .then((member) => 
                {
                    let role = (member.guild.roles.cache.find(role => role.name === "ARBOOSTREM"));
                    member.roles.add(role)
                    .then(() => 
                    {
                        console.log(`Added the role to ${member.displayName}`);
                    }
                    );
                });
        }
};
