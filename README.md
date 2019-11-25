# Luna
My Bot for Discord Servers, with Elite Dangerous Functionality. This bot contains a lot of commands that talk to and react to 3rd Party API in Elite Dangerous, big thanks to:
* [EDSM](https://edsm.net/)'s star system and galaxy API
* [EliteBGS](https://elitebgs.app/)'s BGS API
* [EliteBGS](https://elitebgs.app/bgsbot)'s BGS Bot for helping me figure out my own faction status commands
* [Alchemy Den](https://alchemyden.com/) for inspiring me to make this bot as well rounded as possible, and for the massive ideas and help they have given me.

This bot has a bunch of features, inlcuding **Faction and BGS commands**, a unique **Shop system**, related commands for **Elite Dangerous**, easy to use and modify **async commands and modules**, and a bunch of other cool stuff! 

# Setup
Setting up is pretty easy. You only need a few things, and a few commands! 

* Install [Node.js](https://nodejs.org/en/download/) 
* Download or clone the repo to a folder somewhere on your PC
* Open the folder through commandline (I use windows, but this works on literally any operating system that can run Node.js)
* Open the "package.json" in a text editor somewhere, and run the command "**npm install [package name]**" for every package listed under the dependencies. (Don't use "npm install" by itself without a package selected, it for some reason won't install everything and can cause startup issues)
* Copy the config.js.example to a new file just named "config.js"
* Edit the **token** value for your bot's token (if you haven't already, you need to create a bot applicaton for discord through there developer portal [here](https://discordapp.com/developers/applications/) 
* Edit the OwnerID, admins, support, and "defaultSettings" areas of the config to fit your server. **Don't let these stay defaulted**. You can add more role levels for new commands or other commands you want to lock behind specific roles inside "permLevels"
* Add as many perm levels as you want, and you can edit commands to have a specific "perm level" so they they can only be run by a certain level or above. 
* You probably want to go through and edit the Following commands: **Home** (setup for Alchemy Den's home system), **recruit** (recruits people into our server), **shop** (change up the shop list, if you want to include the shop system), **Gilm** (a joke command that needs context), **warn** (change the warnings channel, if you have one, or disable it), **GuardianFarm** and **Matsfarm** (subjective farming locations for the following), **NYND** (a command detailing the Alchemy Den Expedition Fleet), and **Time** (a calender made with our Home System's stellar clock, instead of the natural "Sol" clock)
* Edit the **Help.js** command for whatever you want your !helpme command to be. This lists the commands the bot can use at the user's current Level, and sometimes this can conflict with other bots on the server. 

Once you do all that, you should be fairly setup. If you have any questions, you can find me all over the Elite Dangerous Community, namely inside my own group, [Alchemy Den](https://alchemyden.com)

# Commands as of November 2019

== Custom Commands ==

!avatar        :: Shows the Avatar of a User that is mentioned

!bubble        :: Given a list of systems, it will find the biggest distance between two points

!conflicts     :: Load Information about Conflicts related to a faction, elections, wars, etc. Will also list out full win and loss days for each faction in conflict, as well as what is at stake for each

!dab           :: A tasteful dabbing asp, made by yours truely 

!dist          :: Gives the Distance between two systems in the EDSM database.

!factionstatus :: Status of a particular factions systems, they will all be listed at once, and go into detail about each. 

!gilm          :: Just try it (joke command) 

!guardianfarm  :: List of Farmable Guardian Locations

!home          :: Shows Home System Information

!influence     :: Gives you the total (population x influence) of a faction. Each system the faction is in will have that system's pop multiplied by the influence %, and added up to a total (not to be confused with !systemstatus) 

!matfarms      :: List of Farmable Mat Locations

!mats          :: Shows the list of available Materials in Elite Dangerous, and can be used to call specific information about a mat.

!nynd          :: Info about New Year, New Discoveries, the flagship Alchemy Den Expedition

!randomitem    :: Picks a Wierd Item from a list of weird things. (SCP related)

!systemstatus  :: Gives the BGS update of the Faction's states and influence in a System, this comes handy with a graph as well! 

!time          :: Shows the current 59 Virginis Time and Calendar, among a few other things

!transfercost  :: Approximates how much your transfer cost will be for ships.

!whereis       :: Last Known Location of a Commander using the EDSM profile database

== Miscelaneous ==

!mylevel       :: Tells you your permission level for the current message location.

!ping          :: Pings Luna for a response time.

!recruit       :: Recruiting a fren! (Alchemy Den Specific) 

!status        :: Luna's Processes and seeing if things are offline

== Moderator ==

!warn          :: Adds a user warning, add evidence after

== Shop ==

!balance       :: Shows your balance of Lunabits

!payout        :: Removes Lunabits from a user.

!reward        :: Rewards a user with Lunabits

!setbal        :: Sets the balance of lunabits of a user

!settotal      :: Sets the total lunabits of a user

!shop          :: List shop items or buy items from the shop

!transfer      :: Transfers some of your own Lunabits to another user. Non-refundable, use wisely!

== System ==

!eval          :: Evaluates arbitrary javascript. (bot owner only, very powerful, use sparingly)

!helpme        :: Displays all the available commands for your permission level.

!reboot        :: Shuts down the bot. If running under PM2, bot will restart automatically.

!reload        :: Reloads a command that"s been modified.

!set           :: View or change settings for your server.

!userinfo      :: Shows some User Info
