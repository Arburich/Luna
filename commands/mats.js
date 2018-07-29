const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if (!args[0]){
    message.channel.send("Incorrect syntax. Use ``!helpme mats`` for proper usage.");
      return;
  }
  let argu = ""
    for(var i = 0; i < args.length; i++){
        if(i == args.length-1) argu += args[i];
        else argu += args[i] + " ";
    }

  var list = ({
  "Aberrant+Shield+Pattern+Analysis": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/1/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Combat+ships),+Mission+reward"
  },
  "Abnormal+Compact+Emissions+Data": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/2/",
    "Type": "Encoded",
    "Where": "USS+(Type=Encoded+emissions),+Ship+scanning+(Combat+ships),+Mission+reward"
  },
  "Adaptive+Encryptors+Capture": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/114/",
    "Type": "Encoded",
    "Where": "Surface+POI,+USS"
  },
  "Anomalous+Bulk+Scan+Data": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/3/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Transport+ships),+Mission+reward"
  },
  "Anomalous+FSD+Telemetry": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/4/",
    "Type": "Encoded",
    "Where": "High+wake+scanning,+Mission+reward"
  },
  "Antimony": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/5/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Arsenic": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/6/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining,+Mission+reward"
  },
  "Atypical+Disrupted+Wake+Echoes": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/8/",
    "Type": "Encoded",
    "Where": "High+wake+scanning,+Mission+reward"
  },
  "Atypical+Encryption+Archives": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/145/",
    "Type": "Encoded",
    "Where": "Surface+POI"
  },
  "Basic+Conductors": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/9/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships)"
  },
  "Bio-Mechanical+Conduits": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/165/",
    "Type": "Manufactured",
    "Where": "Thargoid+ship+encounter"
  },
  "Biotech+Conductors": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/118/",
    "Type": "Manufactured",
    "Where": "Mission+reward"
  },
  "Boron": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/168/",
    "Type": "Raw",
    "Where": "Mining"
  },
  "Cadmium": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/10/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining"
  },
  "Carbon": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/11/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining,+Mining+(Ice+rings)"
  },
  "Chemical+Distillery": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/12/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS"
  },
  "Chemical+Manipulators": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/13/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+Surface+POI,+USS+(Convoy+dispersal+pattern)"
  },
  "Chemical+Processors": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/14/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS,+Mission+reward"
  },
  "Chemical+Storage+Units": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/15/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships)"
  },
  "Chromium": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/16/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining+(Ice+rings)"
  },
  "Classified+Scan+Databanks": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/17/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Transport+ships),+Surface+POI"
  },
  "Classified+Scan+Fragment": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/110/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+Mission+reward,+Ship+scanning+(Military+&+authority+ships)"
  },
  "Compact+Composites": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/19/",
    "Type": "Manufactured",
    "Where": "USS,+Surface+POI"
  },
  "Compound+Shielding": {
    "Grade": "Rare",
    "Link": "https:https://inara.cz/galaxy-component/20/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS+(Type=Encoded+emissions),+Mission+reward"
  },
  "Conductive+Ceramics": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/21/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS+(Degraded+emissions/Anarchy)"
  },
  "Conductive+Components": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/22/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS+(Degraded+emissions/Anarchy)"
  },
  "Conductive+Polymers": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/23/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+Surface+POI,+Mission+reward"
  },
  "Configurable+Components": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/24/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS+(Combat+aftermath),+USS+(Type=Encoded+emissions)"
  },
  "Core+Dynamics+Composites": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/103/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS+(High+grade+emissions)"
  },
  "Cracked+Industrial+Firmware": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/25/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+Mission+reward"
  },
  "Crystal+Shards": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/26/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+Surface+POI"
  },
  "Datamined+Wake+Exceptions": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/27/",
    "Type": "Encoded",
    "Where": "High+wake+scanning,+Mission+reward,+USS+(Type=Encoded+emissions)"
  },
  "Decoded+Emission+Data": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/28/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Combat+ships),+Mission+reward"
  },
  "Distorted+Shield+Cycle+Recordings": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/29/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Transport+ships),+Mission+reward"
  },
  "Divergent+Scan+Data": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/115/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+Mission+reward"
  },
  "Eccentric+Hyperspace+Trajectories": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/30/",
    "Type": "Encoded",
    "Where": "High+wake+scanning"
  },
  "Electrochemical+Arrays": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/31/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+USS+(Degraded+emissions/Anarchy)"
  },
  "Exceptional+Scrambled+Emission+Data": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/32/",
    "Type": "Encoded",
    "Where": "Ship+scanning,+USS,+Mission+reward"
  },
  "Exquisite+Focus+Crystals": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/104/",
    "Type": "Manufactured",
    "Where": "Mission+reward"
  },
  "Filament+Composites": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/33/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+USS"
  },
  "Flawed+Focus+Crystals": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/34/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS+(Combat+aftermath)"
  },
  "Focus+Crystals": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/35/",
    "Type": "Manufactured",
    "Ship+salvage+(Combat+ships),+USS": {}
  },
  "Galvanising+Alloys": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/36/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS,+Mission+reward"
  },
  "Germanium": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/37/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mission+reward"
  },
  "Grid+Resistors": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/38/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+USS,+Mission+reward"
  },
  "Guardian+Module+Blueprint+Segment": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/176/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Power+Cell": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/171/",
    "Type": "Manufactured",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Power+Conduit": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/172/",
    "Type": "Manufactured",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Sentinel+Weapon+Parts": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/174/",
    "Type": "Manufactured",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Sentinel+Wreckage+Components": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/175/",
    "Type": "Manufactured",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Technology+Component": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/173/",
    "Type": "Manufactured",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Vessel+Blueprint+Segment": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/177/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Guardian+Weapon+Blueprint+Segment": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/170/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Heat+Conduction+Wiring": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/39/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS,+Mission+reward"
  },
  "Heat+Dispersion+Plate": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/41/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS,+Mission+reward"
  },
  "Heat+Exchangers": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/43/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS+(Degraded+emissions/Anarchy)"
  },
  "Heat+Resistant+Ceramics": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/44/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships)"
  },
  "Heat+Vanes": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/45/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS,+Mission+reward"
  },
  "High+Density+Composites": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/46/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+USS"
  },
  "Hybrid+Capacitors": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/48/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+USS,+Mission+reward"
  },
  "Imperial+Shielding": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/49/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions),+Mission+reward"
  },
  "Improvised+Components": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/50/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions),+Mission+reward"
  },
  "Inconsistent+Shield+Soak+Analysis": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/51/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Transport+ships),+Mission+reward"
  },
  "Iron": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/53/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining,+Mining+(Ice+rings)"
  },
  "Irregular+Emission+Data": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/54/",
    "Type": "Encoded",
    "Where": "Mission+reward,+USS"
  },
  "Lead": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/167/",
    "Type": "Raw",
    "Where": "Mining"
  },
  "Manganese": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/55/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mission+reward"
  },
  "Mechanical+Components": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/56/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS+(Combat+aftermath)"
  },
  "Mechanical+Equipment": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/57/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS"
  },
  "Mechanical+Scrap": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/58/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Transport+ships),+USS,+Mission+reward"
  },
  "Mercury": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/59/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Military+Grade+Alloys": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/109/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions),+Mission+reward"
  },
  "Military+Supercapacitors": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/61/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions),+Mission+reward"
  },
  "Modified+Consumer+Firmware": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/105/",
    "Type": "Encoded",
    "Where": "Mission+reward,+USS,+Surface+data+point"
  },
  "Modified+Embedded+Firmware": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/62/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+Mission+reward"
  },
  "Molybdenum": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/64/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mission+reward"
  },
  "Nickel": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/66/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining,+Mining+(Ice+rings)"
  },
  "Niobium": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/67/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mission+reward"
  },
  "Open+Symmetric+Keys": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/111/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+USS,+Mission+reward"
  },
  "Pattern+Alpha+Obelisk+Data": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/148/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Pattern+Beta+Obelisk+Data": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/149/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Pattern+Delta+Obelisk+Data": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/150/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Pattern+Epsilon+Obelisk+Data": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/151/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Pattern+Gamma+Obelisk+Data": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/152/",
    "Type": "Encoded",
    "Where": "Ancient/Guardian+ruins"
  },
  "Peculiar+Shield+Frequency+Data": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/68/",
    "Type": "Encoded",
    "Where": "Ship+scanning,+Mission+reward"
  },
  "Pharmaceutical+Isolators": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/69/",
    "Type": "Manufactured",
    "Where": "Mission+reward,+USS+(High+grade+emissions)"
  },
  "Phase+Alloys": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/70/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS"
  },
  "Phosphorus": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/71/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining,+Mining+(Ice+rings)"
  },
  "Polonium": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/72/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mission+reward"
  },
  "Polymer+Capacitors": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/73/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+USS+(Convoy+dispersal+pattern),+Mission+reward"
  },
  "Precipitated+Alloys": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/75/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Military+&+authority+ships),+Mission+reward"
  },
  "Proprietary+Composites": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/76/",
    "Type": "Manufactured",
    "Where": "USS+(Type=Encoded+emissions),+USS+(High+grade+emissions),+Mission+reward"
  },
  "Propulsion+Elements": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/164/",
    "Type": "Manufactured",
    "Where": "Thargoid+ship+encounter"
  },
  "Proto+Heat+Radiators": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/77/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions),+Mission+reward"
  },
  "Proto+Light+Alloys": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/78/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions),+Mission+reward"
  },
  "Proto+Radiolic+Alloys": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/106/",
    "Type": "Manufactured",
    "Where": "USS+(High+grade+emissions)"
  },
  "Refined+Focus+Crystals": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/79/",
    "Type": "Manufactured",
    "Where": "Mission+reward,+USS+(Weapons+fire)"
  },
  "Rhenium": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/169/",
    "Type": "Raw",
    "Where": "Mining"
  },
  "Ruthenium": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/80/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Salvaged+Alloys": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/81/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS+(Combat+aftermath)"
  },
  "Security+Firmware+Patch": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/82/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+Mission+reward"
  },
  "Selenium": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/83/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mission+reward"
  },
  "Sensor+Fragment": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/113/",
    "Type": "Manufactured",
    "Where": "Destroyed+Unknown+artefact,+USS+(Anomaly),+Thargoid+site"
  },
  "Shield+Emitters": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/84/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS"
  },
  "Shielding+Sensors": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/85/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS,+Mission+reward"
  },
  "Ship+Flight+Data": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/162/",
    "Type": "Encoded",
    "Where": "Thargoid+ship+encounter"
  },
  "Ship+Systems+Data": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/161/",
    "Type": "Encoded",
    "Where": "Thargoid+ship+encounter"
  },
  "Specialised+Legacy+Firmware": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/112/",
    "Type": "Encoded",
    "Where": "Mission+reward,+Surface+data+point,+USS"
  },
  "Strange+Wake+Solutions": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/87/",
    "Type": "Encoded",
    "Where": "High+wake+scanning,+Mission+reward"
  },
  "Sulphur": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/88/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining,+Mining+(Ice+rings)"
  },
  "Tagged+Encryption+Codes": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/89/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+USS,+Mission+reward"
  },
  "Technetium": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/90/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Tellurium": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/91/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Tempered+Alloys": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/92/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships)"
  },
  "Thargoid+Carapace": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/157/",
    "Type": "Manufactured",
    "Where": "Thargoid+site"
  },
  "Thargoid+Energy+Cell": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/158/",
    "Type": "Manufactured",
    "Where": "Thargoid+site"
  },
  "Thargoid+Material+Composition+Data": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/156/",
    "Type": "Encoded",
    "Where": "Thargoid+site"
  },
  "Thargoid+Organic+Circuitry": {
    "Grade": "Very+rare",
    "Link": "https://inara.cz/galaxy-component/159/",
    "Type": "Manufactured",
    "Where": "Thargoid+site"
  },
  "Thargoid+Residue+Data": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/155/",
    "Type": "Encoded",
    "Where": "Thargoid+site"
  },
  "Thargoid+Ship+Signature": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/147/",
    "Type": "Encoded",
    "Where": "Thargoid+ship+encounter,+Thargoid+site"
  },
  "Thargoid+Structural+Data": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/154/",
    "Type": "Encoded",
    "Where": "Thargoid+site"
  },
  "Thargoid+Technological+Components": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/160/",
    "Type": "Manufactured",
    "Where": "Thargoid+site"
  },
  "Thargoid+Wake+Data": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/153/",
    "Type": "Encoded",
    "Where": "Thargoid+ship+encounter"
  },
  "Thermic+Alloys": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/108/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+Mission+reward"
  },
  "Tin": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/93/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Tungsten": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/94/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Unexpected+Emission+Data": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/95/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Combat+ships),+USS"
  },
  "Unidentified+Scan+Archives": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/96/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Transport+ships)"
  },
  "Untypical+Shield+Scans": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/97/",
    "Type": "Encoded",
    "Where": "Ship+scanning+(Combat+ships)"
  },
  "Unusual+Encrypted+Files": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/146/",
    "Type": "Encoded",
    "Where": "Surface+data+point,+USS,+Mission+reward"
  },
  "Vanadium": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/98/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+Mining+(Ice+rings)"
  },
  "Weapon+Parts": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/166/",
    "Type": "Manufactured",
    "Where": "Thargoid+ship+encounter"
  },
  "Worn+Shield+Emitters": {
    "Grade": "Very+common",
    "Link": "https://inara.cz/galaxy-component/99/",
    "Type": "Manufactured",
    "Where": "Ship+salvage+(Combat+ships),+USS"
  },
  "Wreckage+Components": {
    "Grade": "Standard",
    "Link": "https://inara.cz/galaxy-component/163/",
    "Type": "Manufactured",
    "Where": "Thargoid+ship+encounter"
  },
  "Yttrium": {
    "Grade": "Rare",
    "Link": "https://inara.cz/galaxy-component/100/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Zinc": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/101/",
    "Type": "Raw",
    "Where": "Surface+prospecting"
  },
  "Zirconium": {
    "Grade": "Common",
    "Link": "https://inara.cz/galaxy-component/102/",
    "Type": "Raw",
    "Where": "Surface+prospecting,+MiningAberrant+Shield+Pattern+Analysis"
  }
});
  var dataString = "";
  var manuString = "";
  var rawString = "";
  for (var i in list){
    if(list[i].Type.split("+").join(" ")== "Encoded"){
      if(list[i].Grade.split("+").join(" ") == "Very common"){
        dataString += "G1 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Common"){
        dataString += "G2 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Standard"){
        dataString += "G3 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Rare"){
        dataString += "G4 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Very rare"){
        dataString += "G5 :: "
      }
        dataString += i.split("+").join(" ") + "\n";
      }
     if(list[i].Type.split("+").join(" ")== "Raw"){
      if(list[i].Grade.split("+").join(" ") == "Very common"){
        rawString += "G1 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Common"){
        rawString += "G2 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Standard"){
        rawString += "G3 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Rare"){
        rawString += "G4 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Very rare"){
        rawString += "G5 :: "
      }
        rawString += i.split("+").join(" ") + "\n";
      }
     if(list[i].Type.split("+").join(" ")== "Manufactured"){
      if(list[i].Grade.split("+").join(" ") == "Very common"){
        manuString += "G1 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Common"){
         manuString += "G2 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Standard"){
        manuString += "G3 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Rare"){
        manuString += "G4 :: "
      }
      if(list[i].Grade.split("+").join(" ") == "Very rare"){
        manuString += "G5 :: "
      }
        manuString += i.split("+").join(" ") + "\n";
      }
  }
  
    if (args[0].toLowerCase() == "list"){
      if(args[1]){
        if(args[1].toLowerCase() == "raw"){
          message.channel.send(rawString, {code:"asciidoc"});
        }  
        else if(args[1].toLowerCase() == "manufactured"){
          message.channel.send(manuString, {code:"asciidoc"})
        }
        else if(args[1].toLowerCase() == "data"){
          message.channel.send(dataString, {code:"asciidoc"});
        }
        else{
          message.channel.send("Specify a Data Type. ``Raw``, ``Manufactured``, or ``Data``.");
        }
      }
      else{
      message.channel.send("Specify a Data Type. ``Raw``, ``Manufactured``, or ``Data``.");
      }
  }
  else {
    var failed = false;
    for (i in list){
      if (argu.toLowerCase() == i.split("+").join(" ").toLowerCase()){
        const embed = {
          "color": 16740608,
          "thumbnail": {
            "url": gradePic(list[i].Grade.split("+").join(" "))
          },
          "author": {
            "name": list[i].Type.split("+").join(" ")
          },
          "fields": [
            {
              "name": i.split("+").join(" "),
              "value": "Grade: " + list[i].Grade.split("+").join(" ")
            },
            {
              "name": "Where to find it",
              "value": list[i].Where.split("+").join(" "),
              "inline": true
            },
            {
              "name": "INARA Link",
              "value": list[i].Link.split("+").join(" "),
              "inline": true
            }
          ]
        };
        message.channel.send({ embed });
        failed = true;
      }
    }
    if (failed == false){
      message.channel.send("Couldn't find " + argu + ". Use ``!mats list <raw|data|manufactured>`` for a list of materials.")
    }
  }
  function gradePic(grade){
    if (grade == "Very common"){
      return "https://i.imgur.com/HjWMILb.png";
    }
    if (grade == "Common"){
      return "https://i.imgur.com/yXCcexd.png";
    }
    if (grade == "Standard"){
      return "https://i.imgur.com/WVAFXaU.png";
    }
    if (grade == "Rare"){
      return"https://i.imgur.com/6MtI4i7.png";
    }
    if (grade == "Very rare"){
      return "https://i.imgur.com/PvI78mB.png";
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mat"],
  permLevel: "User"
};

exports.help = {
  name: "mats",
  category: "Custom Commands",
  description: "Shows the list of available Materials in Elite Dangerous",
  usage: "mats <material name>"
};
