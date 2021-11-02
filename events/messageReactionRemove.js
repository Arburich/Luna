module.exports = (client, reaction, member) => {
	//console.log(reaction.emoji.id)
	//console.log(reaction.message.id)
	if(reaction.emoji.id == "728048962623373344" && reaction.message.id === "903667747102269521") 
        {
			var guild = client.guilds.cache.get("903662146355875940")
            guild.members.fetch(member.id) // fetch the user that reacted
                .then((member) => 
                {
                    let role = (member.guild.roles.cache.find(role => role.name === "ARBOOSTREM"));
                    member.roles.remove(role)
                    .then(() => 
                    {
                        console.log(`Removed the role to ${member.displayName}`);
                    }
                    );
                });
        }
};
