document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('map').setView([56.8, -4.2], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const createEmojiIcon = (emoji) => {
    return L.divIcon({
      html: emoji,
      className: 'map-emoji-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  const clanIcon = createEmojiIcon('🛡️');
  const distilleryIcon = createEmojiIcon('🥃');
  const attractionIcon = createEmojiIcon('🏰');
  const mythIcon = createEmojiIcon('✨');
  const vikingIcon = createEmojiIcon('🪓');
  const golfIcon = createEmojiIcon('⛳');
  const sportsIcon = createEmojiIcon('🦌');
  const filmIcon = createEmojiIcon('🎬');
  const literaryIcon = createEmojiIcon('✍️');
  const ntsIcon = createEmojiIcon('🏴');
  const staysIcon = createEmojiIcon('🛌');
  const craftsIcon = createEmojiIcon('🧶');
  const eventsIcon = createEmojiIcon('🗓️');
  const historicEventsIcon = createEmojiIcon('📜');
  const airportIcon = createEmojiIcon('✈️');
  const ferryIcon = createEmojiIcon('⛴️');
  const hearthstoneIcon = createEmojiIcon('❤️');

  const allData = {
    clans: [
      { id: 'armstrong', lat: 55.1500, lng: -2.9800, name: 'Clan Armstrong', desc: 'A powerful Border Reiver clan.' },
      { id: 'bruce', lat: 56.1290, lng: -3.9382, name: 'Clan Bruce', desc: 'Historic seat near Stirling.' },
      { id: 'buchanan', lat: 56.0760, lng: -4.5880, name: 'Clan Buchanan', desc: 'Lands on the eastern shore of Loch Lomond.' },
      { id: 'cameron', lat: 56.8590, lng: -5.0690, name: 'Clan Cameron', desc: 'Heartland in Lochaber, near Fort William.' },
      { id: 'campbell', lat: 56.2345, lng: -5.0654, name: 'Clan Campbell', desc: 'Power base at Inveraray Castle on Loch Fyne.' },
      { id: 'chattan', lat: 57.0800, lng: -4.4500, name: 'Clan Chattan', desc: 'A confederation centered around Inverness.' },
      { id: 'colquhoun', lat: 56.0080, lng: -4.6300, name: 'Clan Colquhoun', desc: 'Territory on the shores of Loch Lomond.' },
      { id: 'drummond', lat: 56.3750, lng: -3.8680, name: 'Clan Drummond', desc: 'Seat at Drummond Castle near Crieff.' },
      { id: 'farquharson', lat: 57.0040, lng: -3.3600, name: 'Clan Farquharson', desc: 'Based in Invercauld, near Braemar.' },
      { id: 'forbes', lat: 57.2500, lng: -2.6000, name: 'Clan Forbes', desc: 'Seat at Castle Forbes.' },
      { id: 'fraser', lat: 57.4100, lng: -4.4500, name: 'Clan Fraser of Lovat', desc: 'Centered around Beauly.' },
      { id: 'graham', lat: 56.0500, lng: -4.9400, name: 'Clan Graham', desc: 'Associated with Montrose.' },
      { id: 'grant', lat: 57.3200, lng: -3.6000, name: 'Clan Grant', desc: 'Historic lands in Strathspey.' },
      { id: 'gunn', lat: 58.4500, lng: -3.5200, name: 'Clan Gunn', desc: 'Territory in Caithness and Sutherland.' },
      { id: 'hay', lat: 57.3400, lng: -2.4500, name: 'Clan Hay', desc: 'Seat at Slains Castle.' },
      { id: 'kerr', lat: 55.4500, lng: -2.7800, name: 'Clan Kerr', desc: 'A major Border clan from Jedburgh.' },
      { id: 'lamont', lat: 55.9300, lng: -5.2500, name: 'Clan Lamont', desc: 'Based on the Cowal peninsula in Argyll.' },
      { id: 'macdonald', lat: 55.5750, lng: -6.1500, name: 'Clan MacDonald', desc: 'Lords of the Isles, Islay power base.' },
      { id: 'macgregor', lat: 56.3770, lng: -4.3870, name: 'Clan MacGregor', desc: 'Lands around Loch Katrine.' },
      { id: 'mackay', lat: 58.4800, lng: -4.4300, name: 'Clan Mackay', desc: 'The vast northern "Mackay Country".' },
      { id: 'mackenzie', lat: 57.2740, lng: -5.5160, name: 'Clan Mackenzie', desc: 'Historic seat at Eilean Donan Castle.' },
      { id: 'macleod', lat: 57.4128, lng: -6.5900, name: 'Clan MacLeod', desc: 'Seat at Dunvegan Castle on Skye.' },
      { id: 'murray', lat: 56.7700, lng: -3.7340, name: 'Clan Murray', desc: 'Power base at Blair Castle.' },
      { id: 'ogilvy', lat: 56.7000, lng: -3.0000, name: 'Clan Ogilvy', desc: 'Based in Angus at Airlie Castle.' },
      { id: 'robertson', lat: 56.7100, lng: -3.8500, name: 'Clan Robertson', desc: 'Lands centered around Struan.' },
      { id: 'scott', lat: 55.4200, lng: -2.9900, name: 'Clan Scott', desc: 'A powerful Border clan.' },
      { id: 'sinclair', lat: 58.5900, lng: -3.3800, name: 'Clan Sinclair', desc: 'Seat at Castle Sinclair Girnigoe.' },
      { id: 'sutherland', lat: 58.0150, lng: -3.9450, name: 'Clan Sutherland', desc: 'Seat at Dunrobin Castle.' },
      { id: 'douglas', lat: 55.6050, lng: -3.6700, name: 'House of Douglas', desc: 'Powerful lowland family.' },
      { id: 'hamilton', lat: 55.7700, lng: -4.0300, name: 'House of Hamilton', desc: 'Prominent lowland family.' },
      { id: 'stewart', lat: 56.1300, lng: -3.9400, name: 'House of Stewart', desc: 'The Royal House of Scotland.' },
      { id: 'wallace', lat: 55.8000, lng: -4.5000, name: 'House of Wallace', desc: 'From Elderslie in the Lowlands.' }
    ],
    distilleries: [
      { id: 'aberlour', lat: 57.4695, lng: -3.2275, name: 'Aberlour Distillery', desc: 'Famous for its double cask maturation.' },
      { id: 'ardbeg', lat: 55.6400, lng: -6.1090, name: 'Ardbeg Distillery', desc: 'Known for its intensely peaty and complex whiskies.' },
      { id: 'auchentoshan', lat: 55.9220, lng: -4.4360, name: 'Auchentoshan Distillery', desc: 'Triple-distilled Lowland whisky.' },
      { id: 'bennevis', lat: 56.8385, lng: -5.0715, name: 'Ben Nevis Distillery', desc: 'At the foot of Ben Nevis.' },
      { id: 'dalmore', lat: 57.6890, lng: -4.2480, name: 'The Dalmore Distillery', desc: 'Produces a rich, robust Highland malt.' },
      { id: 'deanston', lat: 56.1882, lng: -4.0673, name: 'Deanston Distillery', desc: 'Near Doune Castle, used as a warehouse in Outlander.' },
      { id: 'glenscotia', lat: 55.4270, lng: -5.6050, name: 'Glen Scotia Distillery', desc: 'A classic Campbeltown malt with a hint of sea salt.' },
      { id: 'glenfarclas', lat: 57.4313, lng: -3.3150, name: 'Glenfarclas Distillery', desc: 'Independent distillery known for sherry casks.' },
      { id: 'glenfiddich', lat: 57.4549, lng: -3.1288, name: 'Glenfiddich Distillery', desc: 'World-famous family-owned distillery.' },
      { id: 'glenkinchie', lat: 55.9325, lng: -2.8781, name: 'Glenkinchie Distillery', desc: 'Classic Lowland distillery.' },
      { id: 'glengoyne', lat: 56.0125, lng: -4.3169, name: 'Glengoyne Distillery', desc: 'Unpeated Highland style.' },
      { id: 'glenlivet', lat: 57.2880, lng: -3.3640, name: 'The Glenlivet Distillery', desc: 'The original Speyside single malt.' },
      { id: 'glenmorangie', lat: 57.8470, lng: -4.0530, name: 'Glenmorangie Distillery', desc: 'Known for its tall stills and elegant spirit.' },
      { id: 'lagavulin', lat: 55.6327, lng: -6.1543, name: 'Lagavulin Distillery', desc: 'Iconic Islay peaty single malt.' },
      { id: 'laphroaig', lat: 55.6300, lng: -6.1520, name: 'Laphroaig Distillery', desc: 'Classic Islay distillery with a medicinal peat smoke.' },
      { id: 'oban', lat: 56.4143, lng: -5.4725, name: 'Oban Distillery', desc: 'One of the oldest distilleries.' },
      { id: 'oldpulteney', lat: 58.4381, lng: -3.0854, name: 'Old Pulteney Distillery', desc: 'Maritime malt from Wick.' },
      { id: 'springbank', lat: 55.4260, lng: -5.6080, name: 'Springbank Distillery', desc: 'A cult classic from Campbeltown.' },
      { id: 'strathisla', lat: 57.5410, lng: -2.9550, name: 'Strathisla Distillery', desc: 'The picturesque home of Chivas Regal.' },
      { id: 'talisker', lat: 57.3019, lng: -6.3582, name: 'Talisker Distillery', desc: 'Oldest distillery on Skye.' },
      { id: 'macallan', lat: 57.4846, lng: -3.2076, name: 'The Macallan Distillery', desc: 'World-famous Speyside distillery.' },
      { id: 'tomatin', lat: 57.3480, lng: -4.0040, name: 'Tomatin Distillery', desc: 'A soft and mellow Highland single malt.' }
    ],
    attractions: [
      { id: 'edinburghcastle', lat: 55.9486, lng: -3.1999, name: 'Edinburgh Castle', desc: 'Historic fortress overlooking Edinburgh.' },
      { id: 'fingalscave', lat: 56.4350, lng: -6.3410, name: 'Fingal\'s Cave', desc: 'Geological marvel of basalt columns on Staffa.' },
      { id: 'ionaabbey', lat: 56.3340, lng: -6.3930, name: 'Iona Abbey', desc: 'The "birthplace of Christianity in Scotland".' },
      { id: 'storr', lat: 57.5076, lng: -6.1782, name: 'Old Man of Storr', desc: 'Iconic rock formation on Skye.' },
      { id: 'ringofbrodgar', lat: 59.0010, lng: -3.2290, name: 'Ring of Brodgar', desc: 'A vast Neolithic stone circle in Orkney.' },
      { id: 'stirlingcastle', lat: 56.1234, lng: -3.9482, name: 'Stirling Castle', desc: 'Grandest and most important castle.' },
      { id: 'sumburghhead', lat: 59.8530, lng: -1.2750, name: 'Sumburgh Head', desc: 'Shetland lighthouse and puffin colony.' },
      { id: 'quiraing', lat: 57.6490, lng: -6.2700, name: 'The Quiraing', desc: 'A spectacular landslide landscape on Skye.' },
      { id: 'tobermory', lat: 56.6230, lng: -6.0670, name: 'Tobermory', desc: 'Picturesque capital of the Isle of Mull.' },
      { id: 'urquhartcastle', lat: 57.3241, lng: -4.4423, name: 'Urquhart Castle', desc: 'Iconic ruins on Loch Ness.' },
      { id: 'lochness', lat: 57.3224, lng: -4.4244, name: 'Loch Ness', desc: 'Home of "Nessie," Scotland\'s most famous mythical beast.' }
    ],
    myths: [
      { id: 'lochnessmyth', lat: 57.3224, lng: -4.4244, name: 'Loch Ness Monster', desc: 'The home of "Nessie," Scotland\'s most famous mythical beast.' },
      { id: 'kelpies', lat: 56.0150, lng: -3.7550, name: 'The Kelpies', desc: 'Giant horse-head sculptures representing mythical water spirits.' },
      { id: 'fairypoolsmyth', lat: 57.2500, lng: -6.2580, name: 'Fairy Pools', desc: 'Magical blue pools on Skye, said to be a gateway to the fairy world.' },
      { id: 'brahanseer', lat: 57.5100, lng: -4.5300, name: 'Brahan Seer', desc: 'The homeland of a 17th-century prophet who predicted major Scottish events.' },
      { id: 'selkies', lat: 59.1500, lng: -2.9600, name: 'Home of the Selkies', desc: 'Orkney is the heart of Selkie folklore—mythical seal-folk who become human on land.' }
    ],
    vikings: [
      { id: 'jarlshof', lat: 59.8660, lng: -1.2940, name: 'Jarlshof Norse Settlement', desc: 'Incredible site with a prominent Norse longhouse.' },
      { id: 'largs', lat: 55.7950, lng: -4.8670, name: 'Battle of Largs', desc: 'Site of the 1263 battle that ended major Viking influence in Scotland.' },
      { id: 'stmagnus', lat: 58.9818, lng: -2.9593, name: 'St. Magnus Cathedral', desc: 'A monumental red sandstone cathedral built by the Norse Earls of Orkney.' },
      { id: 'lewischessmen', lat: 58.2980, lng: -6.9800, name: 'Lewis Chessmen Findspot', desc: 'The world-famous Viking-era chess pieces were discovered in a sand dune at Uig Bay.' },
      { id: 'tingwall', lat: 60.1550, lng: -1.2150, name: 'Tingwall', desc: 'Site of the Norse parliament (Thing) for Shetland, a centre of Viking law and power.' }
    ],
    historicEvents: [
      { id: 'bannockburn_battle', lat: 56.0960, lng: -3.9330, name: 'Battle of Bannockburn (1314)', desc: 'Robert the Bruce\'s decisive victory securing Scottish independence.'},
      { id: 'arbroath_declaration', lat: 56.5600, lng: -2.5830, name: 'Declaration of Arbroath (1320)', desc: 'A declaration of Scottish independence, asserting Scotland\'s sovereignty.'},
      { id: 'flodden_battle', lat: 55.6270, lng: -2.1800, name: 'Battle of Flodden (1513)', desc: 'A catastrophic defeat for Scotland where King James IV and much of the nobility were killed.'},
      { id: 'union_of_crowns', lat: 55.9533, lng: -3.1883, name: 'Union of the Crowns (1603)', desc: 'King James VI of Scotland inherited the English throne, uniting the two crowns.'},
      { id: 'culloden_battle_hist', lat: 57.4780, lng: -4.0931, name: 'Battle of Culloden (1746)', desc: 'The final, brutal battle of the Jacobite Rising, which ended the clan system.'}
    ],
    golf: [
      { id: 'standrews', lat: 56.3490, lng: -2.8010, name: 'St Andrews (Old Course)', desc: 'The "Home of Golf," the most famous and historic course in the world.' },
      { id: 'carnoustie', lat: 56.4950, lng: -2.7200, name: 'Carnoustie Golf Links', desc: 'Known as "Car-nasty," one of the toughest and most respected Open Championship courses.' },
      { id: 'muirfield', lat: 56.0410, lng: -2.8210, name: 'Muirfield', desc: 'Home to The Honourable Company of Edinburgh Golfers, a classic and exclusive links course.' },
      { id: 'royaltroon', lat: 55.5300, lng: -4.6590, name: 'Royal Troon Golf Club', desc: 'A famous Open Championship venue, known for its iconic "Postage Stamp" hole.' },
      { id: 'royaldornoch', lat: 57.8780, lng: -4.0280, name: 'Royal Dornoch Golf Club', desc: 'A legendary and highly-ranked links course in the remote beauty of the Highlands.' },
      { id: 'turnberry', lat: 55.3090, lng: -4.8320, name: 'Turnberry (Ailsa Course)', desc: 'A stunningly beautiful course with a famous lighthouse, host of epic Open Championships.' },
      { id: 'gleneagles', lat: 56.2840, lng: -3.7430, name: 'Gleneagles (King\'s Course)', desc: 'One of the world\'s finest inland courses, a masterpiece of moorland design.' }
    ],
    sports: [
      { id: 'speyfishing', lat: 57.4200, lng: -3.2100, name: 'River Spey Salmon Fishing', desc: 'One of the "big four" Scottish salmon rivers, famous for its fly fishing.' },
      { id: 'tweedfishing', lat: 55.6000, lng: -2.5000, name: 'River Tweed Salmon Fishing', desc: 'A world-renowned river for Atlantic salmon, especially in the autumn.' },
      { id: 'athollstalking', lat: 56.7900, lng: -3.8500, name: 'Atholl Estates Deer Stalking', desc: 'A premier sporting estate offering traditional red deer stalking in the Highlands.' },
      { id: 'jurastalking', lat: 55.9000, lng: -5.9500, name: 'Isle of Jura Stalking', desc: 'Experience stalking in one of Scotland\'s most remote and wild landscapes.' },
      { id: 'grouseshooting', lat: 57.0500, lng: -3.5000, name: 'Cairngorms Grouse Moors', desc: 'The heartland of driven grouse shooting, a classic Scottish field sport.' }
    ],
    film: [
      { id: 'glenfinnanviaduct', lat: 56.8760, lng: -5.4310, name: 'Glenfinnan Viaduct', desc: 'The "Hogwarts Express" bridge from the Harry Potter films.' },
      { id: 'glencoefilm', lat: 56.6650, lng: -5.0350, name: 'Glencoe', desc: 'Iconic backdrop for films like Skyfall, Braveheart, and the Outlander opening credits.' },
      { id: 'douneloch', lat: 56.1850, lng: -4.0550, name: 'Doune Castle (Castle Leoch)', desc: 'Famous as Castle Leoch in Outlander and featured in Monty Python.' },
      { id: 'culrossoutlander', lat: 56.0560, lng: -3.6280, name: 'Culross (Cranesmuir)', desc: 'This preserved village serves as the fictional Cranesmuir in Outlander.' },
      { id: 'lochshiel', lat: 56.8200, lng: -5.3500, name: 'Loch Shiel (Black Lake)', desc: 'The stunning setting for Hogwarts\' Black Lake in the Harry Potter films.' }
    ],
    literary: [
      { id: 'burnsmuseum', lat: 55.4340, lng: -4.6190, name: 'Robert Burns Birthplace Museum', desc: 'Explore the humble cottage where Scotland\'s national poet was born in Alloway.' },
      { id: 'abbotsford', lat: 55.5990, lng: -2.7830, name: 'Abbotsford House', desc: 'The magnificent home of Sir Walter Scott, who invented the historical novel.' },
      { id: 'scottmonument', lat: 55.9520, lng: -3.1930, name: 'Scott Monument', desc: 'A Victorian Gothic monument to Sir Walter Scott on Princes Street, Edinburgh.' },
      { id: 'rls', lat: 55.9550, lng: -3.1880, name: 'Robert Louis Stevenson Trail', desc: 'Explore the Edinburgh locations that inspired "Dr. Jekyll and Mr. Hyde".' },
      { id: 'barriemuseum', lat: 56.6740, lng: -2.8850, name: 'J.M. Barrie\'s Birthplace', desc: 'The Kirriemuir cottage where the creator of Peter Pan grew up.' }
    ],
    nts: [
      { id: 'nts_culzean', lat: 55.3540, lng: -4.7910, name: 'Culzean Castle', desc: 'NTS. Robert Adam\'s cliff-top masterpiece.' },
      { id: 'nts_bannockburn', lat: 56.0960, lng: -3.9330, name: 'Battle of Bannockburn', desc: 'NTS. Site of Robert the Bruce\'s greatest victory.' },
      { id: 'nts_culloden', lat: 57.4780, lng: -4.0931, name: 'Culloden Battlefield', desc: 'NTS. Site of the final Jacobite battle.' },
      { id: 'nts_glencoe', lat: 56.6829, lng: -5.1025, name: 'Glencoe', desc: 'NTS. Dramatic mountains and haunting history.' },
      { id: 'nts_falkland', lat: 56.2540, lng: -3.2080, name: 'Falkland Palace', desc: 'NTS. A fine Renaissance palace, a favourite of Mary Queen of Scots.' },
      { id: 'nts_craigievar', lat: 57.1720, lng: -2.7160, name: 'Craigievar Castle', desc: 'NTS. A fairytale pink castle, said to inspire Disney.' },
      { id: 'nts_brodie', lat: 57.6100, lng: -3.7130, name: 'Brodie Castle', desc: 'NTS. Magnificent turreted castle with over 400 varieties of daffodil.' },
      { id: 'nts_glenfinnan', lat: 56.8680, lng: -5.4380, name: 'Glenfinnan Monument', desc: 'NTS. Marks the spot where the 1745 Jacobite Rising began.' }
    ],
    stays: [
      { id: 'inverlochy', lat: 56.8400, lng: -5.0730, name: 'Inverlochy Castle Hotel', desc: 'A stunning 19th-century castle hotel near Fort William.' },
      { id: 'witchery', lat: 55.9490, lng: -3.1970, name: 'The Witchery by the Castle', desc: 'A world-famous, gothic and opulent hotel at the gates of Edinburgh Castle.' },
      { id: 'glencoehouse', lat: 56.6870, lng: -5.1030, name: 'Glencoe House', desc: 'A luxurious historic mansion offering suite accommodation in the heart of Glencoe.' },
      { id: 'dornochcastle', lat: 57.8800, lng: -4.0260, name: 'Dornoch Castle Hotel', desc: 'A historic castle hotel with its own award-winning whisky bar, opposite Dornoch Cathedral.' }
    ],
    crafts: [
      { id: 'harris_tweed', lat: 57.8990, lng: -6.7990, name: 'Harris Tweed Authority', desc: 'The heart of the world-famous Harris Tweed industry in the Outer Hebrides.' },
      { id: 'tartan_mill', lat: 55.6200, lng: -2.7800, name: 'Lochcarron Tartan Weavers', desc: 'Visit a working tartan mill in the Scottish Borders to see how this iconic cloth is made.' },
      { id: 'kiltmaker', lat: 55.9500, lng: -3.1900, name: 'Geoffrey (Tailor) Kiltmaker', desc: 'A renowned traditional kiltmaker on Edinburgh\'s Royal Mile.' },
      { id: 'celtic_jewellery', lat: 58.9800, lng: -2.9600, name: 'Sheila Fleet Jewellery', desc: 'Famous Orkney workshop creating stunning jewellery inspired by Celtic and Norse heritage.' }
    ],
    events: [
      { id: 'fringe', lat: 55.9533, lng: -3.1883, name: 'Edinburgh Festival Fringe', desc: 'The world\'s largest arts festival.', month: 8 },
      { id: 'tattoo', lat: 55.9486, lng: -3.1999, name: 'Royal Edinburgh Military Tattoo', desc: 'A spectacular show of music and military precision.', month: 8 },
      { id: 'uphellyaa', lat: 60.1545, lng: -1.1449, name: 'Up Helly Aa', desc: 'A legendary fire festival in Lerwick, Shetland.', month: 1 },
      { id: 'braemar', lat: 57.0050, lng: -3.3980, name: 'Braemar Gathering', desc: 'The most famous Highland Games, attended by the Royal Family.', month: 9 },
      { id: 'beltane', lat: 55.9550, lng: -3.1800, name: 'Beltane Fire Festival', desc: 'A modern reinterpretation of an ancient Celtic fire festival.', month: 4 },
      { id: 'kirkwallba', lat: 58.9810, lng: -2.9600, name: 'Kirkwall Ba\' Game', desc: 'A chaotic, ancient street football game.', month: 12 }
    ],
    airports: [
      { id: 'edi', lat: 55.9508, lng: -3.3615, name: 'Edinburgh Airport (EDI)', desc: 'Scotland\'s busiest airport and a major international gateway.'},
      { id: 'gla', lat: 55.8719, lng: -4.4331, name: 'Glasgow Airport (GLA)', desc: 'Major international airport serving the west of Scotland.'},
      { id: 'abz', lat: 57.2019, lng: -2.1978, name: 'Aberdeen Airport (ABZ)', desc: 'Key airport for the North East and oil industry.'},
      { id: 'inv', lat: 57.5425, lng: -4.0475, name: 'Inverness Airport (INV)', desc: 'The main air gateway to the Scottish Highlands.'},
    ],
    ferries: [
      { id: 'oban_ferry', lat: 56.4120, lng: -5.4740, name: 'Oban Ferry Terminal', desc: 'Gateway to the isles of Mull, Colonsay, Coll, Tiree, and the Outer Hebrides.'},
      { id: 'ullapool_ferry', lat: 57.8960, lng: -5.1580, name: 'Ullapool Ferry Terminal', desc: 'Mainland port for the ferry to Stornoway in the Outer Hebrides.'},
      { id: 'kennacraig_ferry', lat: 55.7950, lng: -5.4650, name: 'Kennacraig Ferry Terminal', desc: 'The primary mainland port for ferries to Islay.'},
      { id: 'uig_ferry', lat: 57.5880, lng: -6.3680, name: 'Uig Ferry Terminal', desc: 'Skye port for ferries to Tarbert (Harris) and Lochmaddy (North Uist).'},
      { id: 'scrabster_ferry', lat: 58.6140, lng: -3.5420, name: 'Scrabster Ferry Terminal', desc: 'Mainland port for the ferry to Stromness in Orkney.'},
    ]
  };

  let trip = [];
  let routeLine = null;
  let userHearthstone = null;

  const layers = {
    clans: L.layerGroup(), distilleries: L.layerGroup(), attractions: L.layerGroup(),
    myths: L.layerGroup(), vikings: L.layerGroup(), golf: L.layerGroup(),
    sports: L.layerGroup(), film: L.layerGroup(), literary: L.layerGroup(),
    nts: L.layerGroup(), stays: L.layerGroup(), crafts: L.layerGroup(),
    events: L.layerGroup(), historicEvents: L.layerGroup(), airports: L.layerGroup(), ferries: L.layerGroup()
  };

  const signatureJourneys = {
    outlander: ['culrossoutlander', 'stirlingcastle', 'douneloch', 'deanston', 'glencoefilm', 'culloden'],
    highland: ['stirlingcastle', 'glencoefilm', 'mackenzie', 'lochness', 'culloden'],
    golf: ['standrews', 'carnoustie', 'gleneagles', 'macallan'],
    viking: ['jarlshof', 'tingwall', 'stmagnus']
  };

  const suggestionRules = {
    'talisker': 'fairypoolsmyth',
    'stirlingcastle': 'douneloch'
  };

  const createPopupContent = (item) => {
    return `<h3>${item.name}</h3><p>${item.desc}</p><button class="add-to-trip-btn" onclick="addToTrip('${item.id}', '${item.name}', ${item.lat}, ${item.lng})">Add to Trip</button>`;
  };

  const allItems = {};

  const addMarkers = (dataArray, icon, layer) => {
    dataArray.forEach(item => {
      const marker = L.marker([item.lat, item.lng], { icon: icon }).bindPopup(createPopupContent(item));
      marker.addTo(layer);
      allItems[item.id] = item;
      item.marker = marker;
    });
  };

  const iconMap = {
    clans: clanIcon, distilleries: distilleryIcon, attractions: attractionIcon,
    myths: mythIcon, vikings: vikingIcon, golf: golfIcon,
    sports: sportsIcon, film: filmIcon, literary: literaryIcon,
    nts: ntsIcon, stays: staysIcon, crafts: craftsIcon,
    events: eventsIcon, historicEvents: historicEventsIcon, airports: airportIcon, ferries: ferryIcon
  };

  Object.keys(allData).forEach(key => {
    if(layers[key] && iconMap[key]){
      addMarkers(allData[key], iconMap[key], layers[key]);
    }
  });

  Object.values(layers).forEach(layer => layer.addTo(map));

  const itineraryPanel = document.getElementById('itinerary-panel');
  const itineraryHeader = document.getElementById('itinerary-header');
  const suggestionBox = document.getElementById('suggestion-box');
  const suggestionText = document.getElementById('suggestion-text');
  const suggestionAddBtn = document.getElementById('suggestion-add-btn');
  const suggestionDismissBtn = document.getElementById('suggestion-dismiss-btn');
  const suggestionCloseBtn = document.getElementById('suggestion-close-btn');
  const hearthstonePanel = document.getElementById('hearthstone-panel');
  const addHearthstoneBtn = document.getElementById('add-hearthstone-btn');
  const saveHearthstoneBtn = document.getElementById('save-hearthstone-btn');
  const cancelHearthstoneBtn = document.getElementById('cancel-hearthstone-btn');
  const transportGuideBtn = document.getElementById('transport-guide-btn');
  const transportPanel = document.getElementById('transport-panel');
  const eventMonthSelect = document.getElementById('event-month-select');
  const quizModal = document.getElementById('quiz-modal');
  const showQuizBtn = document.getElementById('show-quiz-btn');
  const closeQuizBtn = document.getElementById('close-quiz-btn');
  const toggleLayersBtn = document.getElementById('toggle-layers-btn');
  const moreLayers = document.getElementById('more-layers');

  itineraryHeader.addEventListener('click', () => itineraryPanel.classList.toggle('open'));

  const showSuggestion = (suggestedItemId) => {
    const suggestedItem = allItems[suggestedItemId];
    if (!suggestedItem || trip.some(item => item.id === suggestedItemId)) return;
    suggestionText.textContent = `While you're visiting the area, you might also like ${suggestedItem.name}.`;
    suggestionAddBtn.onclick = () => {
      addToTrip(suggestedItem.id, suggestedItem.name, suggestedItem.lat, suggestedItem.lng);
      hideSuggestion();
    };
    suggestionBox.classList.add('visible');
  };

  const hideSuggestion = () => suggestionBox.classList.remove('visible');
  if(suggestionDismissBtn) suggestionDismissBtn.addEventListener('click', hideSuggestion);
  if(suggestionCloseBtn) suggestionCloseBtn.addEventListener('click', hideSuggestion);

  window.addToTrip = (id, name, lat, lng, transport = 'Car') => {
    if (!trip.some(item => item.id === id)) {
      trip.push({ id, name, lat, lng, transport });
      updateTripList();
      if (!itineraryPanel.classList.contains('open')) itineraryPanel.classList.add('open');
      if (suggestionRules[id]) setTimeout(() => showSuggestion(suggestionRules[id]), 500);
    } else {
      alert(`${name} is already in your trip.`);
    }
  };

  const updateTripList = () => {
    const tripList = document.getElementById('trip-list');
    const tripCount = document.getElementById('trip-count');
    tripList.innerHTML = '';
    tripCount.textContent = trip.length;

    if (trip.length === 0) {
      tripList.innerHTML = '<li class="text-gray-500">Your trip is empty. Add locations from the map!</li>';
    } else {
      trip.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${index + 1}. ${item.name} <span class="trip-transport">(${item.transport})</span>`;
        tripList.appendChild(li);
      });
    }
    drawRoute();
  };

  const drawRoute = () => {
    if (routeLine) map.removeLayer(routeLine);
    if (trip.length > 1) {
      const latLngs = trip.map(item => [item.lat, item.lng]);
      routeLine = L.polyline(latLngs, { color: '#dc2626', weight: 3 }).addTo(map);
      map.fitBounds(routeLine.getBounds().pad(0.1));
    }
  };

  document.getElementById('show-route-btn').addEventListener('click', drawRoute);

  const clearTrip = () => {
    trip = [];
    if (routeLine) map.removeLayer(routeLine);
    updateTripList();
  };

  document.getElementById('clear-trip-btn').addEventListener('click', clearTrip);

  document.getElementById('print-btn').addEventListener('click', () => {
    const printArea = document.getElementById('print-area');
    let printContent = '<h1>My Scottish Journey</h1><ol>';
    trip.forEach(item => {
      printContent += `<li>${item.name} (${item.transport})</li>`;
    });
    printContent += '</ol>';
    printArea.innerHTML = printContent;
    window.print();
  });

  const toggleLayer = (layer, isChecked) => isChecked ? map.addLayer(layer) : map.removeLayer(layer);
  Object.keys(layers).forEach(key => {
    const toggle = document.getElementById(`${key}-toggle`);
    if(toggle) toggle.addEventListener('change', (e) => toggleLayer(layers[key], e.target.checked));
  });

  document.getElementById('journey-select').addEventListener('change', (e) => {
    const selectedJourney = e.target.value;
    clearTrip();
    if (selectedJourney !== 'none') {
      alert('This is a premium feature! Loading the journey for demonstration.');
      const journeyStops = signatureJourneys[selectedJourney];
      if (journeyStops) {
        journeyStops.forEach(stop => {
          const item = allItems[stop.id];
          if (item) {
            addToTrip(item.id, item.name, item.lat, item.lng, stop.transport || 'Car');
          }
        });
        if (!itineraryPanel.classList.contains('open')) itineraryPanel.classList.add('open');
      }
    }
  });

  const enterHearthstoneMode = () => {
    hearthstonePanel.classList.add('active');
    map.getContainer().classList.add('placing-hearthstone');
    map.on('click', placeHearthstone);
  };

  const exitHearthstoneMode = () => {
    hearthstonePanel.classList.remove('active');
    map.getContainer().classList.remove('placing-hearthstone');
    map.off('click', placeHearthstone);
  };

  const placeHearthstone = (e) => {
    const type = document.getElementById('hearthstone-type').value;
    const note = document.getElementById('hearthstone-note').value;
    const name = `${type} Our Special Place`;

    if (userHearthstone) {
      map.removeLayer(userHearthstone);
    }

    userHearthstone = L.marker(e.latlng, { icon: hearthstoneIcon })
      .addTo(map)
      .bindPopup(`<h3>${name}</h3><p><em>${note}</em></p>`)
      .openPopup();

    addToTrip('hearthstone', name, e.latlng.lat, e.latlng.lng, 'Start');
    exitHearthstoneMode();
  };

  addHearthstoneBtn.addEventListener('click', enterHearthstoneMode);
  cancelHearthstoneBtn.addEventListener('click', exitHearthstoneMode);
  saveHearthstoneBtn.addEventListener('click', () => {
    alert("Now click on the map to place your Hearthstone.");
  });

  transportGuideBtn.addEventListener('click', () => {
    transportPanel.classList.toggle('active');
  });

  eventMonthSelect.addEventListener('change', (e) => {
    const selectedMonth = e.target.value;
    layers.events.clearLayers();
    const filteredEvents = allData.events.filter(event => selectedMonth === 'all' || event.month == selectedMonth);
    addMarkers(filteredEvents, eventsIcon, layers.events);
  });

  setTimeout(() => {
    if (moreLayers) {
      moreLayers.classList.add('hidden');
      toggleLayersBtn.textContent = 'Show More';
    }
  }, 5000);

  if (toggleLayersBtn) {
    toggleLayersBtn.addEventListener('click', () => {
      const isHidden = moreLayers.classList.toggle('hidden');
      toggleLayersBtn.textContent = isHidden ? 'Show More' : 'Show Less';
    });
  }

  updateTripList();
});