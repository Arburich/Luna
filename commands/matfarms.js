exports.run = async(client, message, args, level) => {
	var stuff = "== Engineering Materials farming locations ==\n\n== Manufactured == \n-Dav's hope- (210.50 ly from home)"
		 + "\nSystem :: Hyades Sector DR-V c2-23"
		 + "\nPlanet :: A 5 Coordinates :: 44.8180, -31.3893"
		 + "\nhttps://canonn.science/codex/davs-hope/"
		 + "\nClosest Trader :: HIP 12067, Vaucanson Gateway\n"
		 + "\n\nIf you want G5 Mats, try ``!hgemats`` instead. You can also search for nearby systems with the hgemat command."
		 + "\n\n== Raw =="
		 + "\n-Captain Niamh Seutonia crash site- (151.02 ly from home)"
		 + "\nSystem :: Trianguli Sector GW-W b1-0"
		 + "\nPlanet :: A 1"
		 + "\nCoordinates :: -12.2741, 24.7005"
		 + "\nClosest Trader :: Estae, Cogswell Dock\n"
		 + "\n== Raw farms that are 1,700ly Away =="
		 + "\nHIP 36601 :: C 1 a :: Polonium :: Bio 3\nHIP 36601 :: C 1 d :: Ruthenium :: Bio 4\nHIP 36601 :: C 3 b :: Tellurium :: Bio 3"
		 + "\nHIP 36601 :: C 5 a :: Technetium :: Bio 6\nOutotz LS-K D8-3 :: B 5 c :: Antimony :: Bio 1\nOutotz LS-K D8-3 :: B 5 a :: Yttrium :: Bio 6"
		 + "\n\n== Data =="
		 + "\n\n-Jameson Crash Site- (260.40 ly from home)"
		 + "\nSystem :: HIP 12099"
		 + "\nPlanet :: 1 B Coordinates :: -54.3, -50.4"
		 + "\nClosest Trader :: Diaguandri, Ray Gateway";

	message.channel.send(stuff, {
		code: "asciidoc"
	})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["matsfarms", "matfarm", "mf", "matsfarm"],
	permLevel: "User"
};

exports.help = {
	name: "matfarms",
	category: "Custom Commands",
	description: "List of Farmable Mat Locations",
	usage: "matfarms"
};
