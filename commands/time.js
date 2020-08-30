var moment = require("moment");
exports.run = async(client, message, args, level) => {
	output = "# The Alchemy Calendar #"
		output += "\nGalactic Standard Time :: < " + moment().utcOffset('+0000').format("HH:mm:ss, MMMM Do, ") + (Number(moment().format("YYYY")) + 1286).toString() + " >"
	function n(n) {
		return n > 9 ? "" + n : "0" + n;
	}
	var map = {
		0: 0,
		1: 81,
		2: 162,
		3: 243,
		4: 324,
		5: 405,
		6: 486,
		7: 567,
		8: 648,
		9: 729,
		10: 810,
		11: 891,
		12: 972
	};
	const epoch = Number(moment().add(1286, "y").format("X"))
		const sec = 1
		const min = 60
		const hour = 3600
		const cycle = 86400
		//pan = 6998400
		const year = 83721600
		var NewEpochYear = (31556926 / year) * (1970 - 1598)

		var year59 = Math.floor(epoch / year) + Math.floor(NewEpochYear)
		var remainder = (epoch % year)
		var mapedcycle = (Math.floor(remainder / cycle))
		var oct59 = 0
		var cycle59 = 0
		for (var i = 0; i < 13; i++) {

			if (mapedcycle < map[i]) {
				oct59 = i
					cycle59 = mapedcycle - map[i - 1] + 1
					break
			}
		}
		remainder = remainder % cycle
		var hour59 = Math.floor(remainder / hour)
		remainder = remainder % hour
		var min59 = Math.floor(remainder / min)
		var sec59 = remainder % min
		output += "\n59 Virginis Time :: < " + n(hour59) + ":" + n(min59) + ":" + n(sec59)
		 + ", Cycle " + n(cycle59) + " of Oct " + n(oct59) + ", Year " + year59
		output += " >\n# Information #\n> The Alchemy Den Calendar is a cycle of approximately 969 cycles (24 hour Earth Days), spread over 12 Octs (months), with "
		 + "each Oct filling with 81 cycles. The 12th Oct contains only 78 cycles to account for closer approximation to the time."
		 + "\n> The Current 59 Virginis Year is based on the year of 59 Virginis's Discovery by Tycho Brahe in the Earth Year of 1598. "
		 + "\n> Alchemy Den was founded in 59 Virginis on the 50th cycle of Oct 1, 643, at 09:30:00 by the Pioneer, and Creator of this Calender, Arburich."
		message.channel.send(output, {
			code: "md"
		})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["day", "clock", "calendar"],
	permLevel: "User"
};

exports.help = {
	name: "time",
	category: "Custom Commands",
	description: "Shows the current 59 Virginis Time and Calendar, among a few other things",
	usage: "time"
};
