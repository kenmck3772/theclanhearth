document.addEventListener('DOMContentLoaded', function() {
    // --- DATA ---
    const clanData = [
        { id: "armstrong", name: "Clan Armstrong", gaelicName: "MacGhillielàidir", motto: "Invictus Maneo (I remain unvanquished)", crest: "An arm from the shoulder, armed, Proper", plantBadge: "N/A", warCry: "N/A", territories: "Liddesdale (The Borders)", historicSeats: "Gilnockie Tower", rival: "Scottish & English Crowns", lore: `Perhaps the most feared of all the Border Reiver clans, the Armstrongs were a famously lawless and formidable force in Liddesdale...`, events: [ { year: "c. 1376", event: "The first record of the Armstrong name in Liddesdale." }, { year: "1530", event: "Johnnie Armstrong of Gilnockie, the famous Reiver chief, is captured and hanged by King James V." }, { year: "1969", event: "Neil Armstrong, the first man on the moon, visits the Armstrong ancestral lands." }, ], mottoLore: "This defiant motto perfectly captures the spirit of a clan that survived for centuries in the violent frontier of the Borders...", tartan: { description: "The Armstrong tartan is a handsome and well-balanced pattern...", colors: ["#004225", "#1a2d57", "#000000"] }, famousNames: [ { name: "Johnnie Armstrong of Gilnockie (d. 1530)", desc: "The legendary Border Reiver whose execution became a symbol of royal treachery." }, { name: "Neil Armstrong (1930-2012)", desc: "The American astronaut and first human to walk on the Moon, who was of Armstrong descent." }, ], recipe: { name: "Border Reiver's Hot Pot", link: "A hearty, one-pot meal that could be cooked over a campfire during a long raid...", ingredients: ["2 lbs lamb neck chops", "3 large onions, sliced", "3 lbs potatoes, sliced", "2 cups lamb or beef stock", "Salt and pepper", "A knob of butter"], method: [ "Preheat the oven to 325°F (160°C).", "In a heavy casserole dish, layer the lamb chops, onions, and potatoes, seasoning each layer well.", "Pour over the stock.", "Arrange a final, neat layer of overlapping potato slices on top. Brush with melted butter.", "Cover and bake for 2 hours. Remove the lid and bake for a further 30 minutes to brown the potatoes. Serve hot." ] } },
        { id: "campbell", name: "Clan Campbell", gaelicName: "Na Caimbeulaich", motto: "Ne Obliviscaris (Forget Not)", crest: "A boar's head erased fessways, Or", plantBadge: "Bog Myrtle / Fir Club Moss", warCry: "Cruachan!", territories: "Argyll, Perthshire, Cawdor, Loudoun, Breadalbane", historicSeats: "Inveraray Castle, Castle Campbell", rival: "Clan MacDonald", lore: `The history of Clan Campbell is a masterclass in the acquisition and consolidation of power...`, events: [ { year: "c. 1263", event: "Earliest surviving written record mentions a Campbell, Gillespie." }, { year: "1314", event: "The Campbells fight alongside King Robert the Bruce at the pivotal Battle of Bannockburn." }, { year: "1457", event: "Colin Campbell is elevated to become the 1st Earl of Argyll." }, { year: "1692", event: "The Massacre of Glencoe is carried out by soldiers from the Earl of Argyll's Regiment." }, { year: "1701", event: "The 10th Earl of Argyll is created the 1st Duke of Argyll." }, ], mottoLore: 'This powerful and somewhat menacing motto perfectly encapsulates the Campbell ethos...', tartan: { description: "The primary Campbell tartan forms the basis of the military tartan of the Black Watch...", colors: ["#004225", "#1a2d57", "#000000"] }, famousNames: [ { name: "Cailean Mór Campbell (d. 1296)", desc: '"Colin the Great," the clan\'s semi-legendary progenitor.' }, { name: "Archibald Campbell, 1st Marquess of Argyll (1607–1661)", desc: "The de facto head of the Covenanter government in Scotland during the Wars of the Three Kingdoms." }, { name: "John Campbell, 2nd Duke of Argyll (1680–1743)", desc: "A Field Marshal who commanded government forces at the Battle of Sheriffmuir in 1715." }, ], recipe: { name: "Argyll Lamb Stovies", link: "The Campbell heartland of Argyll is a region of rugged hills and deep lochs...", ingredients: ["2 lbs lamb shoulder, cut into chunks", "2 lbs potatoes, thickly sliced", "2 large onions, thinly sliced", "2 cups beef or lamb stock", "2 tablespoons butter or lamb dripping", "Salt and pepper"], method: [ "In a large, heavy-bottomed pot, melt the butter and gently cook the onions for 10-15 minutes until very soft.", "Brown the lamb chunks on all sides.", "Arrange a layer of sliced potatoes, then onions and lamb. Season and repeat, finishing with potatoes.", "Pour in the stock. Bring to a simmer, then cover and cook slowly for 1.5 to 2 hours. Do not stir.", "Serve hot in bowls, garnished with fresh parsley." ] } },
        { id: "cameron", name: "Clan Cameron", gaelicName: "Camshron", motto: "Aonaibh ri chéile (Unite)", crest: "A sheaf of five arrows, points upwards, tied with a band, Gules", plantBadge: "Oak / Crowberry", warCry: "Chlanna nan con thigibh a so's gheibh sibh feòil! (Sons of the hounds, come hither and get flesh!)", territories: "Lochaber", historicSeats: "Achnacarry Castle", rival: "Clan Chattan", lore: `Clan Cameron is one of the most ancient and warlike of the great Highland clans...`, events: [ { year: "c. 1370", event: "The Battle of Invernahavon is fought between the Camerons and the Clan Chattan confederation." }, { year: "1665", event: "The feud with the Mackintoshes is finally ended by a treaty at Achnacarry." }, { year: "1745", event: 'Donald Cameron of Lochiel, the "Gentle Lochiel," commits the clan to the Jacobite cause...' }, { year: "1746", event: "The Clan Cameron suffers devastating losses at the Battle of Culloden." }, ], mottoLore: "This Gaelic motto is a powerful call for unity and solidarity...", tartan: { description: "The basic Cameron tartan is a bold and martial pattern of red and green...", colors: ["#C41E3A", "#004225", "#FFD700"] }, famousNames: [ { name: "Sir Ewen Cameron of Lochiel (1629–1719)", desc: 'A legendary warrior chief known as the "Ulysses of the Highlands."' }, { name: "Donald Cameron of Lochiel, 19th Chief (c. 1695–1748)", desc: 'The "Gentle Lochiel," whose reluctant but ultimately decisive support for Bonnie Prince Charlie initiated the 1745 Rising.' }, ], recipe: { name: "Lochaber Venison Sausages with Neeps and Tatties", link: "The Camerons' historic lands in Lochaber are a vast, mountainous wilderness...", ingredients: ["1 lb ground venison", "1/2 lb pork fat, ground", "1 small onion, finely grated", "1 cup fresh breadcrumbs", "1 tablespoon chopped fresh sage", "Salt and black pepper", "1 lb potatoes", "1 lb rutabaga (neep)"], method: [ "Combine the venison, pork fat, onion, breadcrumbs, and sage. Form into patties.", "Cook the patties in a lightly oiled pan over medium heat for 15-20 minutes...", "While the sausages cook, prepare the neeps and tatties...", "Drain both well. Mash the potatoes with butter and a splash of milk. Mash the rutabaga with a knob of butter...", "Serve the hot venison alongside generous helpings of the mashed neeps and tatties." ] } },
        { id: "chattan", name: "Clan Chattan", gaelicName: "Clann Chatain (Clan of the Cats)", motto: "Touch not the cat bot a glove", crest: "A wildcat salient, Proper", plantBadge: "Red Whortleberry / Boxwood", warCry: "Clan Chattan!", territories: "Badenoch, Strathnairn, Lochaber", historicSeats: "Tor Castle / Moy Hall", rival: "Clan Cameron", lore: `Clan Chattan is unique among the great Highland clans in that it was not a single clan, but a powerful confederation...`, events: [ { year: "1396", event: "The Battle of the North Inch is fought between Clan Chattan and Clan Cameron." }, { year: "1688", event: "The Battle of Mulroy, the last clan battle fought on Scottish soil..." }, { year: "1745", event: "The confederation is a major force in the Jacobite army. Lady Anne Farquharson-MacKintosh famously raises the Mackintosh regiment for the Prince." }, ], mottoLore: 'This is one of the most famous and evocative of all clan mottos...', tartan: { description: "As a confederation, each member clan has its own tartan...", colors: ["#1a2d57", "#004225", "#C41E3A"] }, famousNames: [ { name: "Eva, heiress of Clan Chattan (d. 1313)", desc: "Her marriage to Angus Mackintosh, 6th chief of that clan, brought the leadership of the confederation to the Mackintoshes." }, { name: "Lady Anne Farquharson-MacKintosh (1723-1787)", desc: 'Known as "Colonel Anne," this formidable Jacobite heroine raised the Mackintosh regiment for Bonnie Prince Charlie...' }, ], recipe: { name: "Highland Rabbit Stew with Mustard Dumplings", link: "The vast territories of the Clan Chattan confederation in Badenoch and Strathnairn were rich in game...", ingredients: ["1 rabbit, jointed", "2 tablespoons flour", "2 tablespoons oil", "2 onions, chopped", "2 carrots, chopped", "1 cup ale or stock", "For dumplings: 1 cup self-rising flour, 1/2 cup shredded suet, 1 tablespoon wholegrain mustard"], method: [ "Toss the rabbit pieces in the flour seasoned with salt and pepper.", "Heat the oil in a large casserole dish and brown the rabbit pieces on all sides...", "In the same dish, cook the onions and carrots until softened.", "Return the rabbit to the dish, pour in the ale or stock, bring to a simmer, then cover and cook on a low heat for 1.5 hours...", "To make the dumplings, mix the flour, suet, and mustard in a bowl...", "Drop spoonfuls of the dumpling mixture onto the surface of the simmering stew.", "Cover the dish and cook for a further 20 minutes, or until the dumplings are puffed up and cooked through. Serve hot." ] } },
        { id: "cunningham", name: "Clan Cunningham", gaelicName: "MacCuinneagain", motto: "Over Fork Over", crest: "A unicorn's head couped, Argent, armed and maned Or", plantBadge: "Common Gorse", warCry: "A Cunningham! A Cunningham!", territories: "Cunninghame (Ayrshire)", historicSeats: "Finlaystone House, Kerelaw Castle, Glencairn Castle", rival: "Clan Montgomery", lore: `The Cunninghams are a powerful Lowland clan whose name is territorial, from the district of Cunninghame in North Ayrshire...`, events: [ { year: "c. 1160", event: "Wernebald is granted the lands of Cunningham." }, { year: "1488", event: "Alexander Cunningham is created 1st Earl of Glencairn by King James III." }, { year: "1560", event: "Alexander, 5th Earl of Glencairn, plays a leading role in the Scottish Reformation." }, { year: "1586", event: "The murder of the Earl of Eglinton by the Cunninghams marks the height of their feud with the Montgomeries." }, ], mottoLore: "This unique and agricultural motto directly references the clan's origin story...", tartan: { description: "The Cunningham tartan is a simple yet striking pattern...", colors: ["#C41E3A", "#000000", "#FFFFFF"] }, famousNames: [ { name: 'Alexander Cunningham, 5th Earl of Glencairn (d. 1574)', desc: '"The Good Earl," a leading Protestant reformer and a close friend of John Knox.' }, { name: "William Cunningham, 9th Earl of Glencairn (1610–1664)", desc: "A prominent Covenanter who later became a Royalist and was appointed Lord Chancellor of Scotland after the Restoration." }, ], recipe: { name: "Ayrshire Bacon and Tattie Scones", link: "The Cunningham heartland of Ayrshire is famous for its high-quality bacon...", ingredients: ["For Tattie Scones: 1 lb floury potatoes, boiled and mashed; 1/4 cup flour; 2 tbsp butter; pinch of salt", "8 slices of thick-cut Ayrshire bacon"], method: [ "To make the tattie scones, mix the hot mashed potato with the butter and salt...", "Turn the dough out onto a floured surface and roll it into a round about 1/4 inch thick...", "Cook the scones on a hot, dry griddle or heavy-based frying pan for 3-4 minutes per side...", "While the scones are cooking, grill or fry the Ayrshire bacon until crisp.", "Serve the hot tattie scones alongside the bacon..." ] } },
        { id: "douglas", name: "Clan Douglas", gaelicName: "Dùbhghlas (Black Water)", motto: "Jamais arrière (Never behind)", crest: "On a chapeau, a green salamander surrounded by flames", plantBadge: "Wild Thyme", warCry: "A Douglas! A Douglas!", territories: "The Scottish Borders, Lanarkshire, Angus, Galloway", historicSeats: "Douglas Castle, Tantallon Castle, Threave Castle, Bothwell Castle", rival: "House of Stewart / Clan Hamilton", lore: `The history of Clan Douglas is the story of power itself—its acquisition, its consolidation, and its perilous proximity to the Scottish throne...`, events: [ { year: "c. 1174", event: "William de Duglas is the first of the name to appear in the historical record." }, { year: "1306-1329", event: '"The Good" Sir James Douglas serves as Robert the Bruce\'s most trusted commander...' }, { year: "1330", event: "Sir James Douglas is killed in Spain while carrying the heart of Robert the Bruce on crusade." }, { year: "1440", event: 'The "Black Dinner" takes place at Edinburgh Castle...' }, { year: "1452", event: "King James II murders William, 8th Earl of Douglas, at Stirling Castle." }, { year: "1455", event: "The Black Douglases are defeated at the Battle of Arkinholm..." }, ], mottoLore: 'This is the quintessential motto for a clan defined by its ambition, forward momentum, and refusal to be second to any...', tartan: { description: "The Douglas tartan is a simple yet striking design, reflecting the clan's ancient and starkly powerful status in the Lowlands...", colors: ["#a0aec0", "#2d3748", "#FFFFFF"] }, famousNames: [ { name: '"The Good" Sir James Douglas (c. 1286–1330)', desc: "The hero of the Wars of Independence, Bruce's right-hand man..." }, { name: 'Archibald Douglas, 5th Earl of Angus (c. 1449–1513)', desc: 'Known as "Bell the Cat," a powerful "Red Douglas" who dominated Scottish politics...' }, { name: 'James Douglas, 4th Earl of Morton (c. 1516–1581)', desc: 'A powerful and ruthless Protestant lord who was a key figure in the downfall of Mary, Queen of Scots...' }, ], recipe: { name: "Borders Pan Haggerty", link: "The Douglases were the great Wardens of the Marches, their power base firmly rooted in the Scottish Borders...", ingredients: ["2 lbs waxy potatoes", "2 large onions, thinly sliced", "8 oz strong cheddar cheese, grated", "4 tablespoons beef dripping or butter", "Salt and freshly ground black pepper", "Beef stock or water (optional)"], method: [ "Parboil the potatoes for about 10 minutes until they are just tender...", "In a large, heavy-bottomed, oven-proof frying pan, melt half of the dripping or butter...", "Add the remaining dripping or butter to the pan. Arrange a neat, overlapping layer of sliced potatoes...", "Top the potatoes with a layer of the cooked onions, followed by a generous layer of grated cheese. Repeat the layers...", "Press down firmly. Cook over a medium-low heat on the stovetop for about 20 minutes...", "Transfer the pan to a preheated oven at 400°F (200°C) for a further 20-25 minutes...", "Serve by cutting into wedges directly from the pan..." ] } },
        { id: "elliot", name: "Clan Elliot", gaelicName: "Euloit", motto: "Fortiter et Recte (Boldly and Rightly)", crest: "A dexter arm holding a cutlass, Proper", plantBadge: "White Heather", warCry: "N/A", territories: "Liddesdale (The Borders)", historicSeats: "Redheugh Tower", rival: "Clan Armstrong", lore: `The Elliots were another of the great riding clans of the Scottish Borders...`, events: [ { year: "c. 1320", event: "The first record of the Elliot name in Scotland." }, { year: "1569", event: "The Elliots are involved in a major border feud with the Scotts." }, { year: "1764", event: "George Augustus Eliott, later Lord Heathfield, begins his distinguished military career." }, ], mottoLore: "This motto perfectly captures the spirit of the Border Reivers...", tartan: { description: "The Elliot tartan is a handsome and well-balanced pattern...", colors: ["#1a2d57", "#004225", "#FFFFFF"] }, famousNames: [ { name: "George Augustus Eliott, 1st Baron Heathfield (1717-1790)", desc: "A distinguished British Army officer, famous for his successful defence of Gibraltar during the Great Siege." }, { name: "Gilbert Elliot-Murray-Kynynmound, 1st Earl of Minto (1751-1814)", desc: "A prominent politician and diplomat who served as Governor-General of India." }, ], recipe: { name: "Hawick Balls", link: "Hawick is a major town in the heart of Elliot country...", ingredients: ["1 cup butter", "1 cup sugar", "1 egg", "2 cups all-purpose flour", "1 tsp baking soda", "1/2 tsp cream of tartar", "1/2 tsp ground ginger"], method: [ "Preheat the oven to 350°F (175°C).", "Cream the butter and sugar together until light and fluffy.", "Beat in the egg.", "In a separate bowl, sift together the flour, baking soda, cream of tartar, and ginger.", "Gradually add the dry ingredients to the creamed mixture and mix well to form a stiff dough.", "Roll the dough into small balls and place them on a greased baking sheet.", "Bake for 10-12 minutes, or until golden brown. Let them cool on a wire rack." ] } },
        { id: "fraser", name: "Clan Fraser of Lovat", gaelicName: "Na Frisealaich", motto: "Je suis prest (I am ready)", crest: "A buck's head erased Proper", plantBadge: "Yew", warCry: "Caisteal Dhuni! (Castle Dounie!)", territories: "The Aird, Stratherrick (Inverness-shire)", historicSeats: "Castle Dounie (now Beaufort Castle), Castle Fraser", rival: "Clan MacDonald of Clanranald", lore: `The Frasers are a clan of Norman origin, their name likely derived from the French fraise (strawberry)...`, events: [ { year: "c. 1160", event: "Simon Fraser holds lands in East Lothian, marking the family's presence in Scotland." }, { year: "1544", event: "The Battle of the Shirts (Blar-na-Léine), a bloody clan battle fought against the MacDonalds of Clanranald." }, { year: "1746", event: "The Clan Fraser fights with distinction for the Jacobite cause at the Battle of Culloden..." }, { year: "1747", event: "Simon Fraser, 11th Lord Lovat, is executed for high treason on Tower Hill in London." }, ], mottoLore: "This French motto reflects the clan's Norman origins and perfectly encapsulates their history...", tartan: { description: "The Fraser of Lovat tartan is a bold and handsome design, dominated by a bright, scarlet red background...", colors: ["#C41E3A", "#004225", "#1a2d57"] }, famousNames: [ { name: 'Simon Fraser, 11th Lord Lovat (c. 1676–1747)', desc: '"The Old Fox," the archetypal cunning and powerful Highland chief...' }, { name: "Simon Fraser of Lovat (1726–1782)", desc: "Son of the Old Fox. Despite fighting as a Jacobite, he was later pardoned and became a successful general in the British Army..." }, ], recipe: { name: "Poached Salmon with Heather Honey and Oats", link: "The historic Fraser heartland is the Aird and the glens surrounding the River Beauly...", ingredients: ["4 salmon fillets", "For poaching liquid: water, white wine, lemon, dill, bay leaf", "2 tbsp heather honey", "1 tbsp Scotch whisky", "2 tbsp pinhead oatmeal", "1 tbsp butter"], method: [ "First, prepare the oatmeal topping. In a small, dry frying pan, toast the oatmeal over medium heat until fragrant...", "Prepare the poaching liquid in a wide, shallow pan...", "Gently lower the salmon fillets into the simmering liquid. Poach for 6-10 minutes...", "While the salmon is poaching, prepare the glaze by whisking together the heather honey and the whisky.", "Carefully remove the poached salmon and place it on a serving platter.", "Gently pat the top of the fillets dry, brush with the honey and whisky glaze, and sprinkle with the toasted oatmeal. Serve immediately." ] } },
        { id: "grant", name: "Clan Grant", gaelicName: "Grannd", motto: "Craig Elachie (Stand Fast)", crest: "A burning hill, Proper", plantBadge: "Scots Pine", warCry: "Stand Fast Craig Elachie!", territories: "Strathspey, Glen Moriston, Glen Urquhart", historicSeats: "Castle Grant", rival: "Clan Gordon", lore: `The Grants are a powerful Highland clan whose name is believed to come from the Norman French le grand, meaning "large" or "great."...`, events: [ { year: "c. 1258", event: "The first record of the Grant family in Strathspey." }, { year: "1314", event: "The Grants support Robert the Bruce in the Wars of Independence." }, { year: "1765", event: "Sir James Grant founds the town of Grantown-on-Spey." }, ], mottoLore: "This motto, which is also the clan's war cry, is a direct command to be resolute and unmoving...", tartan: { description: "The Grant tartan is a handsome and striking pattern. Its primary color is a bright, clear red...", colors: ["#C41E3A", "#004225", "#1a2d57"] }, famousNames: [ { name: "Sir James Grant, 8th Baronet (1738–1811)", desc: "The founder of Grantown-on-Spey, a visionary and progressive landlord." }, { name: "Ulysses S. Grant (1822–1885)", desc: "The 18th President of the United States and commanding general of the Union Army..., was of Scottish Grant descent." }, ], recipe: { name: "Speyside Shortbread", link: "The Grant heartland of Strathspey is also the heart of Scotland's whisky industry...", ingredients: ["1 cup all-purpose flour", "1/2 cup butter, softened", "1/4 cup powdered sugar", "1/4 cup cornstarch or rice flour", "1 tablespoon Speyside single malt whisky", "Pinch of salt"], method: [ "Preheat the oven to 325°F (160°C).", "In a bowl, cream the butter and sugar together until light and fluffy.", "In a separate bowl, sift together the flour, cornstarch/rice flour, and salt.", "Gradually add the dry ingredients to the creamed mixture...", "Stir in the whisky.", "Press the dough evenly into an 8-inch round cake pan or a traditional shortbread mold...", "Bake for 30-35 minutes, or until pale golden.", "Let it cool in the pan for 10 minutes before turning it out onto a wire rack to cool completely..." ] } },
        { id: "keith", name: "Clan Keith", gaelicName: "MacCeith", motto: "Veritas Vincit (Truth Conquers)", crest: "Out of a crest coronet, a roebuck's head, Proper", plantBadge: "White Heather", warCry: "A Keith! A Keith!", territories: "East Lothian, Aberdeenshire, Caithness", historicSeats: "Dunnottar Castle", rival: "Clan Irvine", lore: `The Keiths are one of Scotland's most ancient and powerful noble families...`, events: [ { year: "1010", event: "A warrior named Robert is said to have killed the Danish General Camus at the Battle of Barry, and is rewarded with the lands of Keith." }, { year: "1314", event: "Sir Robert Keith, Marischal of Scotland, commands the Scottish cavalry at the Battle of Bannockburn." }, { year: "1458", event: "The chief is created Earl Marischal." }, { year: "1715", event: "The 10th Earl Marischal joins the Jacobite Rising, leading to the forfeiture of the family's titles and estates." }, ], mottoLore: "This noble motto reflects the clan's ancient role as hereditary Marischals of Scotland...", tartan: { description: "The Keith tartan is a handsome and well-balanced pattern...", colors: ["#004225", "#1a2d57", "#000000"] }, famousNames: [ { name: "Sir Robert Keith (d. 1346)", desc: "The great Marischal of Scotland who commanded the cavalry at Bannockburn." }, { name: "George Keith, 5th Earl Marischal (c. 1553–1623)", desc: "The founder of Marischal College in Aberdeen." }, { name: "George Keith, 10th Earl Marischal (c. 1693–1778)", desc: "The Jacobite Earl who was forced into exile and became a trusted friend of Frederick the Great of Prussia." }, ], recipe: { name: "Cullen Skink", link: "While the Keiths held lands across Scotland, their great fortress of Dunnottar was on the coast of the North East...", ingredients: ["1 lb smoked haddock (finnan haddie)", "2 cups milk", "2 cups water", "1 onion, finely chopped", "2 large potatoes, peeled and diced", "1/4 cup heavy cream", "Chopped fresh parsley"], method: [ "Place the smoked haddock in a large pot with the milk and water. Bring to a gentle simmer and cook for 5-10 minutes...", "Remove the fish from the liquid, and when cool enough to handle, flake the flesh from the bones, discarding the skin and bones.", "Add the chopped onion and diced potatoes to the cooking liquid. Bring back to a simmer and cook for 15-20 minutes...", "Return the flaked fish to the pot. Stir in the heavy cream and heat through gently without boiling.", "Season with black pepper (it may not need salt, as the smoked fish is salty).", "Serve hot, garnished with a generous amount of fresh parsley." ] } },
        { id: "kerr", name: "Clan Kerr", gaelicName: "Cearr", motto: "Sero Sed Serio (Late but in earnest)", crest: "The sun in his splendour, Or", plantBadge: "Bog Myrtle", warCry: "Sero Sed Serio!", territories: "The Scottish Borders (Roxburghshire)", historicSeats: "Ferniehirst Castle, Cessford Castle", rival: "Clan Scott", lore: `The Kerrs were one of the great Border Reiver clans...`, events: [ { year: "1333", event: "The Kerrs fight at the Battle of Halidon Hill." }, { year: "1526", event: "The Battle of Melrose, a major feud battle between the Kerrs and the Scotts." }, { year: "1606", event: "The feud with the Scotts is finally settled." }, ], mottoLore: "This motto is a statement of deliberation and resolve...", tartan: { description: "The Kerr tartan is a handsome and colourful pattern...", colors: ["#C41E3A", "#004225", "#000000"] }, famousNames: [ { name: "Sir Thomas Kerr of Ferniehirst (d. 1585)", desc: "A staunch supporter of Mary, Queen of Scots." }, { name: "Robert Kerr, 1st Earl of Ancram (c. 1578–1654)", desc: "A courtier and poet." }, ], recipe: { name: "Jedburgh Snails", link: "Jedburgh, in the heart of Kerr country, is famous for a type of boiled sweet...", ingredients: ["2 cups sugar", "1/2 cup water", "1/4 tsp cream of tartar", "Peppermint oil"], method: [ "In a saucepan, dissolve the sugar in the water over a low heat.", "Add the cream of tartar and bring the mixture to a boil.", "Continue to boil until the mixture reaches the 'hard crack' stage (300°F / 150°C).", "Remove from the heat and add a few drops of peppermint oil.", "Pour the mixture onto a greased baking sheet and let it cool slightly.", "While still warm, cut the candy into strips and twist them into a snail shape. Let them cool completely before eating." ] } },
        { id: "macdougall", name: "Clan MacDougall", gaelicName: "MacDhùghaill", motto: "Buaidh No Bàs (Victory or Death)", crest: "On a chapeau, a dexter arm in armour, couped at the elbow, holding a cross crosslet fitchée", plantBadge: "Bell Heather", warCry: "Buaidh No Bàs!", territories: "Argyll (Lorn)", historicSeats: "Dunollie Castle, Dunstaffnage Castle", rival: "Clan Campbell", lore: `Descended from Dugald, a son of the great Somerled, the MacDougalls were a powerful sea-going clan who were once the Kings of Lorn...`, events: [ { year: "1306", event: "The MacDougalls defeat Robert the Bruce at the Battle of Dalrigh." }, { year: "1308", event: "Robert the Bruce defeats the MacDougalls at the Battle of the Pass of Brander." }, { year: "1715", event: "The MacDougalls fight for the Jacobite cause at the Battle of Sheriffmuir." }, ], mottoLore: "This Gaelic motto is a stark and uncompromising statement of the clan's warrior ethos...", tartan: { description: "The MacDougall tartan is a handsome and well-balanced pattern...", colors: ["#C41E3A", "#004225", "#1a2d57"] }, famousNames: [ { name: "Alasdair MacDougall of Lorn (d. 1310)", desc: "The powerful chief who defeated Robert the Bruce and captured the famous Brooch of Lorn." }, { name: "Iain Ciar MacDougall, 22nd Chief (d. 1737)", desc: "The Jacobite chief who led the clan in the 1715 rising." }, ], recipe: { name: "Oban Scallops with Garlic and Herb Butter", link: "The MacDougall heartland of Lorn is centered on the port town of Oban...", ingredients: ["12 large scallops", "2 tbsp butter", "2 cloves garlic, minced", "2 tbsp chopped fresh parsley", "Juice of 1/2 lemon", "Salt and pepper"], method: [ "Pat the scallops dry with a paper towel and season with salt and pepper.", "Melt the butter in a large frying pan over high heat.", "Add the scallops to the pan in a single layer and cook for 1-2 minutes per side...", "In the last 30 seconds of cooking, add the minced garlic to the pan and cook until fragrant.", "Remove the pan from the heat and stir in the chopped parsley and lemon juice.", "Serve the scallops immediately, drizzled with the garlic and herb butter." ] } },
        { id: "mackintosh", name: "Clan Mackintosh", gaelicName: "Mac an Tòisich (Son of the Chief)", motto: "Touch not the cat bot a glove", crest: "A wildcat salient, Proper", plantBadge: "Red Whortleberry / Boxwood", warCry: "Loch Mòigh!", territories: "Badenoch, Strathnairn", historicSeats: "Moy Hall", rival: "Clan Cameron", lore: `The Mackintoshes were the principal chiefs of the powerful Clan Chattan Confederation for centuries...`, events: [ { year: "1396", event: "The clan fights in the Battle of the North Inch in Perth." }, { year: "1688", event: "The Battle of Mulroy, the last clan battle, is fought against the Camerons." }, { year: "1745", event: 'Lady Anne Farquharson-MacKintosh, "Colonel Anne," raises the clan for the Jacobite cause.' }, ], mottoLore: "This is the famous motto of the Clan Chattan confederation, adopted by the Mackintoshes as its leaders...", tartan: { description: "The Mackintosh tartan is a handsome and well-balanced pattern...", colors: ["#C41E3A", "#004225", "#FFFFFF"] }, famousNames: [ { name: "Angus Mackintosh, 6th Chief (d. 1345)", desc: "His marriage to Eva, the heiress of Clan Chattan, brought the leadership of the confederation to the Mackintoshes." }, { name: "Lady Anne Farquharson-MacKintosh (1723-1787)", desc: 'Known as "Colonel Anne," this formidable Jacobite heroine raised the Mackintosh regiment for Bonnie Prince Charlie...' }, ], recipe: { name: "Moy Game Pie", link: "The Mackintosh heartland around Moy was rich in game...", ingredients: ["2 lbs mixed game meat (venison, pheasant, rabbit), cubed", "2 tbsp flour", "2 onions, chopped", "2 carrots, chopped", "1 cup red wine", "2 cups beef stock", "1 sheet of puff pastry", "1 egg, beaten"], method: [ "Toss the game meat in the flour, seasoned with salt and pepper.", "Brown the meat in a large pot. Set aside.", "In the same pot, cook the onions and carrots until soft.", "Return the meat to the pot, add the red wine and stock, bring to a simmer, then cover and cook on low for 2-3 hours...", "Pour the stew into a pie dish and let it cool completely.", "Preheat the oven to 400°F (200°C).", "Cover the pie with the puff pastry, trim the edges, and brush with the beaten egg. Bake for 20-25 minutes..." ] } },
        { id: "macgregor", name: "Clan MacGregor", gaelicName: "Clann Ghriogair", motto: "'S Rioghal Mo Dhream (Royal is my Race)", crest: "A lion's head erased Proper, crowned with an antique crown Or", plantBadge: "Scots Pine", warCry: "Ard-Choille!", territories: "Glen Orchy, Glenlochy, Glenstrae", historicSeats: "Kilchurn Castle (originally)", rival: "Clan Campbell", lore: `The MacGregors, the "Children of the Mist," are one of the most famous and famously persecuted of all Highland clans. Their proud motto asserts their ancient lineage, claiming descent from Griogar, son of the 9th-century King Alpin. For centuries, they held lands around Glen Orchy and Loch Awe, but their fortunes turned as their powerful neighbors, the Campbells, expanded. Following the Battle of Glen Fruin in 1603, where they defeated the Colquhouns, King James VI proscribed the very name MacGregor, making it a capital crime to bear the surname. For nearly 200 years, they were hunted outlaws, a history that forged a reputation for resilience and defiance, immortalized in the figure of Rob Roy MacGregor.`, events: [ { year: "1603", event: "The Battle of Glen Fruin leads to the proscription of the MacGregor name." }, { year: "1671", event: "Birth of Rob Roy MacGregor, the famous Highland outlaw." }, { year: "1774", event: "The proscription against the clan is finally repealed." } ], mottoLore: "This is one of the proudest and most defiant of all clan mottos, a direct assertion of the clan's ancient and royal lineage in the face of centuries of persecution.", tartan: { description: "The MacGregor Red and Green tartan is one of the most iconic and recognizable tartans.", colors: ["#C41E3A", "#004225"] }, famousNames: [ { name: "Rob Roy MacGregor (1671-1734)", desc: "The famous Highland outlaw, cattle drover, and Jacobite whose life was romanticized by Sir Walter Scott." } ], recipe: { name: "Rob Roy's Stolen Beef Stew", link: "A hearty stew made with whatever could be 'liberated' from the Duke of Montrose's lands.", ingredients: ["2 lbs stewing beef, cubed", "2 large onions, chopped", "4 carrots, roughly chopped", "1 bottle of dark Scottish ale", "2 cups beef stock", "A few sprigs of thyme"], method: [ "In a heavy pot, brown the beef in batches. Set aside.", "Soften the onions and carrots in the same pot.", "Return the beef to the pot, pour in the ale and stock, and add the thyme.", "Bring to a simmer, cover, and cook slowly for at least 3 hours, or until the beef is meltingly tender.", "Serve hot with crusty bread to mop up the gravy." ] } }
    ];

    const legendsData = [
         { name: "The Brahan Seer", title: "Coinneach Odhar, The Gaelic Nostradamus", lore: `In the rich tapestry of Highland folklore, few figures loom as large or as tragically as Coinneach Odhar, the Brahan Seer...`, recipe: { name: "Seer's Brose with a Dram", link: "A simple, fortifying meal for a man of the people...", ingredients: ["1/2 cup pinhead or coarse oatmeal", "Pinch of salt", "1 tbsp butter (optional)", "1 tbsp honey or to taste", "Boiling water", "1 tbsp single malt whisky"], method: [ "Place the oatmeal and salt in a sturdy bowl.", "Add the butter, if using, and the honey.", "Pour over just enough boiling water to cover the oats. Stir vigorously...", "Cover the bowl with a plate and let it stand for 5-10 minutes...", "Stir in the whisky just before eating." ] } },
         { name: "Rob Roy MacGregor", title: "The Highland Rogue", lore: `Robert "Rob Roy" MacGregor (1671–1734) was a real historical figure, a cattleman, and a Jacobite...`, recipe: { name: "Whisky-Glazed Stolen Beef", link: "A dish fit for an outlaw...", ingredients: ["2 lbs beef steak (sirloin or ribeye), thick-cut", "2 tbsp olive oil", "Salt and freshly ground black pepper", "For the glaze: 1/4 cup Scotch whisky, 2 tbsp brown sugar, 1 tbsp soy sauce, 1 clove garlic, minced"], method: [ "Rub the steaks with olive oil and season generously. Let them come to room temperature.", "Whisk together the glaze ingredients.", "Heat a heavy griddle pan or barbecue to a high heat.", "Sear the steaks for 3-4 minutes per side for medium-rare.", "In the last minute of cooking, brush the glaze generously over both sides of the steak...", "Remove the steaks from the heat and let them rest for 5-10 minutes before slicing." ] } },
         { name: "The Marquess of Montrose", title: "The Poet General", lore: `James Graham, 1st Marquess of Montrose (1612-1650), was a figure of dazzling contradictions...`, recipe: { name: "Covenanter's Clapshot", link: "A humble but hearty dish for a soldier on a long march...", ingredients: ["2 lbs potatoes, peeled and chopped", "1 lb turnip (rutabaga), peeled and chopped", "4 tbsp butter", "Splash of milk or cream", "Salt and black pepper", "Chives, chopped, for garnish"], method: [ "Boil the potatoes and turnips in separate pots of salted water until very tender.", "Drain both vegetables thoroughly and return them to their pots over a low heat for a minute to drive off any excess steam.", "Combine the potatoes and turnips in one large bowl. Mash them together...", "Beat in the butter and enough milk or cream to achieve a creamy consistency.", "Season generously with salt and a good deal of black pepper.", "Stir in the chopped chives and serve hot..." ] } },
         { name: "Bonnie Prince Charlie", title: "The Young Pretender", lore: `Charles Edward Stuart (1720-1788), known to history as Bonnie Prince Charlie, is the romantic, tragic hero of the final Jacobite Rising of 1745...`, recipe: { name: "Drambuie and Raspberry Fool", link: "A dessert that tastes of romance and tragedy...", ingredients: ["1 pint heavy (double) cream", "1 pint fresh raspberries", "3 tbsp Drambuie liqueur", "2 tbsp powdered sugar", "Toasted oatmeal or crushed shortbread for topping"], method: [ "Gently crush about three-quarters of the raspberries with a fork.", "Whip the heavy cream and powdered sugar until it forms soft peaks.", "Gently fold the Drambuie and the crushed raspberries into the whipped cream...", "Spoon the mixture into serving glasses, layering it with the remaining whole raspberries.", "Chill for at least an hour before serving.", "Top with a sprinkle of toasted oatmeal or crushed shortbread just before serving." ] } },
         { name: "William Wallace", title: "Guardian of Scotland", lore: `Sir William Wallace (c. 1270–1305) is one of Scotland's most enduring national heroes. A knight of lesser nobility, he rose from obscurity to lead the Scottish resistance during the first Wars of Scottish Independence. His victory over the English at the Battle of Stirling Bridge in 1297 was a masterstroke of strategy and made him a legend. Appointed Guardian of Scotland, he was the de facto leader of the nation. Though later defeated at the Battle of Falkirk, he was never broken. Captured by the English, he was brutally executed in London, but his martyrdom inspired his countrymen, including Robert the Bruce, to continue the fight for freedom.`, recipe: { name: "Wallace's Bannock Bread", link: "The food of a guerrilla army. Bannocks are simple, unleavened flatbreads made from oatmeal or barley, cooked on a griddle (or a hot stone in a campfire). It was the staple food that could be made quickly and easily, fueling Wallace's army on the march.", ingredients: ["2 cups medium oatmeal", "1/2 tsp salt", "1 tsp baking soda", "2 tbsp melted butter or bacon fat", "Approx. 1 cup buttermilk or hot water"], method: [ "In a bowl, mix the oatmeal, salt, and baking soda.", "Stir in the melted butter or fat.", "Gradually add enough buttermilk or hot water to form a soft, but not sticky, dough.", "On a lightly floured surface, knead the dough briefly and roll it out into a round about 1/2 inch thick.", "Cut the round into four or six wedges (farls).", "Cook on a lightly greased, hot griddle or heavy frying pan for about 4-5 minutes per side, until golden and cooked through. Best served warm with butter." ] } },
         { name: "Robert the Bruce", title: "The Warrior King", lore: `Robert I (1274–1329), popularly known as Robert the Bruce, was the king who secured Scotland's independence from England. His early career was complex, marked by shifting allegiances, but after the execution of William Wallace, he seized the throne in 1306 and became the undisputed leader of the Scottish cause. He was a brilliant guerrilla tactician, leading a long and arduous campaign against the English. His perseverance culminated in the legendary and decisive victory at the Battle of Bannockburn in 1314, where his small Scottish army defeated a much larger English force. His reign established a new dynasty and ensured that Scotland would remain an independent kingdom for centuries to come.`, recipe: { name: "King Robert's Crown Roast of Lamb", link: "A dish fit for a king's celebration after a great victory. A crown roast is a spectacular centerpiece, symbolizing the crown that Bruce fought so hard to win and secure for Scotland.", ingredients: ["2 racks of lamb (8 ribs each), frenched", "For the stuffing: 1 cup breadcrumbs, 1/4 cup chopped dried apricots, 1/4 cup chopped nuts (pistachios or almonds), 2 tbsp chopped fresh mint, 1 small onion, finely chopped, 1 egg, beaten", "For the glaze: 2 tbsp honey, 1 tbsp Dijon mustard", "Salt and pepper"], method: [ "Preheat oven to 400°F (200°C).", "To make the stuffing, sauté the onion until soft, then mix with all other stuffing ingredients. Season well.", "Bend each rack of lamb into a semicircle and tie them together with kitchen twine to form a 'crown'. Place in a roasting tin.", "Fill the center of the crown with the stuffing mixture.", "Roast for 15 minutes, then reduce the oven temperature to 350°F (180°C).", "Mix the honey and mustard for the glaze and brush it over the lamb. Continue to roast for another 15-20 minutes for medium-rare.", "Let the roast rest for 10 minutes before carving between the ribs to serve." ] } }
    ];
    
    const marketplaceData = [
        { id: 1, name: "Harris Tweed Jacket", desc: "Handwoven from virgin wool in the Outer Hebrides. A timeless classic.", price: 350, image: "https://placehold.co/600x400/5A7165/FBF6E8?text=Harris+Tweed" },
        { id: 2, name: "Handmade Sgian Dubh", desc: "A traditional ceremonial dagger with a handle carved from stag antler.", price: 180, image: "https://placehold.co/600x400/8C4843/FBF6E8?text=Sgian+Dubh" },
        { id: 3, name: "Pewter Quaich", desc: "The 'cup of friendship,' perfect for sharing a dram of whisky.", price: 75, image: "https://placehold.co/600x400/4A4A4A/FBF6E8?text=Quaich" },
        { id: 4, name: "Cashmere Tartan Scarf", desc: "Luxuriously soft, woven in the Scottish Borders.", price: 95, image: "https://placehold.co/600x400/a16207/FBF6E8?text=Tartan+Scarf" },
        { id: 5, name: "Heathergem Kilt Pin", desc: "Crafted from natural heather stems, each piece is unique.", price: 45, image: "https://placehold.co/600x400/6C5B7B/FBF6E8?text=Kilt+Pin" },
        { id: 6, name: "Scottish Shortbread Tin", desc: "All-butter shortbread from a traditional family bakery in Speyside.", price: 25, image: "https://placehold.co/600x400/DEB887/FBF6E8?text=Shortbread" }
    ];
    
    const clanTerritories = {
        sinclair: { name: 'Sinclair (Norse)', coords: [[[60.8, -1.5], [60.1, -1.8], [59.8, -1.2], [60.5, -0.8]], [[59.2, -3.5], [58.8, -2.8], [59.3, -3.0]]], color: '#FFD700', info: '<strong>Clan Sinclair:</strong> The Norse Earls of Orkney and Shetland, their power base was in the Northern Isles and Caithness.' },
        donald: { name: 'Donald (Highland)', coords: [[57.2, -6.3], [57.0, -6.0], [56.8, -6.2], [55.8, -6.2], [55.6, -5.8], [56.5, -5.5], [57.4, -5.8]], color: '#8C4843', info: '<strong>Clan Donald:</strong> The Lords of the Isles. Their power base was maritime, controlling the Hebrides and the western seaboard.' },
        campbell: { name: 'Campbell (Highland)', coords: [[56.5, -5.5], [56.0, -5.0], [56.3, -4.5], [56.6, -5.0]], color: '#3D4F45', info: '<strong>Clan Campbell:</strong> Masters of Argyll. Their power was land-based, consolidated through political alignment with the Crown.' },
        macleod: { name: 'MacLeod (Highland)', coords: [[57.4, -6.8], [58.2, -6.9], [58.3, -6.2], [57.5, -6.2]], color: '#A57C00', info: '<strong>Clan MacLeod:</strong> Rulers of Skye and Harris. Their strength came from their island strongholds like Dunvegan Castle.' },
        mackenzie: { name: 'MacKenzie (Highland)', coords: [[57.3, -5.5], [57.8, -5.0], [57.6, -4.0], [57.2, -4.5]], color: '#5A7165', info: '<strong>Clan MacKenzie:</strong> Power in the North. They controlled a vast territory from Kintail to the Black Isle.' },
        gordon: { name: 'Gordon (North East)', coords: [[57.6, -3.5], [57.2, -2.5], [57.0, -3.0], [57.3, -3.8]], color: '#6B4226', info: '<strong>Clan Gordon:</strong> Dominant in the Northeast, the Gordons were a powerful feudal family whose influence often rivaled that of the Crown.' },
        forbes: { name: 'Forbes (North East)', coords: [[57.4, -3.0], [57.1, -2.8], [57.2, -3.4]], color: '#9E5B41', info: '<strong>Clan Forbes:</strong> A powerful North East family and the great rivals of the Gordons, with whom they fought a centuries-long feud.' },
        leslie: { name: 'Leslie (North East)', coords: [[57.5, -2.8], [57.3, -2.4], [57.2, -2.9]], color: '#4B0082', info: '<strong>Clan Leslie:</strong> A noble house holding the Earldom of Rothes, they were a powerful force in Aberdeenshire and Fife.' },
        irvine: { name: 'Irvine (North East)', coords: [[57.1, -2.4], [57.0, -2.2], [56.9, -2.6]], color: '#008080', info: '<strong>Clan Irvine of Drum:</strong> An ancient family whose lands near Aberdeen were a gift from Robert the Bruce.' },
        keith: { name: 'Keith (North East)', coords: [[56.9, -2.3], [57.1, -2.1], [56.8, -2.5]], color: '#B5651D', info: '<strong>Clan Keith:</strong> Hereditary Earls Marischal of Scotland, their power was based in the North East, with Dunnottar Castle as their seat.' },
        fraser: { name: 'Fraser (Highland)', coords: [[57.5, -4.8], [57.6, -4.2], [57.3, -4.3], [57.2, -4.9]], color: '#465C69', info: '<strong>Clan Fraser:</strong> Masters of the Aird, their lands surrounded the Beauly Firth near Inverness, giving them immense influence.' },
        grant: { name: 'Grant (Highland)', coords: [[57.3, -3.6], [57.1, -3.2], [57.4, -3.8]], color: '#2E8B57', info: '<strong>Clan Grant:</strong> A powerful Speyside clan, their lands centered on the River Spey. Known for their motto "Stand Fast".' },
        maclean: { name: 'Maclean (Highland)', coords: [[56.5, -6.1], [56.3, -5.8], [56.6, -6.3]], color: '#C71585', info: '<strong>Clan Maclean:</strong> A formidable clan of the Inner Hebrides, with their main seat at Duart Castle on the Isle of Mull.' },
        macdougall: { name: 'MacDougall (Highland)', coords: [[56.45, -5.6], [56.3, -5.4], [56.5, -5.7]], color: '#000000', info: '<strong>Clan MacDougall:</strong> An ancient clan descended from Somerled, they were Lords of Lorn with their seat at Dunollie Castle.' },
        stewart: { name: 'Stewart of Appin (Highland)', coords: [[56.6, -5.4], [56.7, -5.1], [56.5, -5.1], [56.4, -5.4]], color: '#B5A696', info: '<strong>Clan Stewart of Appin:</strong> A staunchly Jacobite clan, their lands were situated in a strategic coastal area of Argyll.' },
        chattan: { name: 'Clan Chattan (Highland)', coords: [[57.1, -4.3], [56.9, -3.9], [57.2, -4.5]], color: '#800000', info: '<strong>Clan Chattan:</strong> A powerful confederation of clans, including Mackintoshes and Macphersons, who controlled Badenoch.' },
        mackintosh: { name: 'Mackintosh (Highland)', coords: [[57.2, -4.2], [57.0, -3.8], [57.3, -4.4]], color: '#800000', info: '<strong>Clan Mackintosh:</strong> The principal chiefs of the Clan Chattan confederation, their heartland was in Badenoch and Strathnairn.' },
        macgregor: { name: 'MacGregor (Highland)', coords: [[56.4, -4.8], [56.6, -4.5], [56.3, -4.9]], color: '#A52A2A', info: '<strong>Clan MacGregor:</strong> The "Children of the Mist," a famously persecuted clan whose name was outlawed for nearly 200 years.' },
        cameron: { name: 'Cameron (Highland)', coords: [[56.8, -5.4], [57.0, -4.8], [56.7, -4.9], [56.6, -5.3]], color: '#6C5B7B', info: '<strong>Clan Cameron:</strong> Fierce warriors from Lochaber, their territory was rugged and mountainous. Staunchly Jacobite.' },
        macpherson: { name: 'Macpherson (Highland)', coords: [[57.0, -4.4], [56.8, -4.0], [57.1, -4.6]], color: '#F4A460', info: '<strong>Clan Macpherson:</strong> A key part of the Clan Chattan Confederation, their heartland was in Badenoch. Staunch Jacobites.' },
        murray: { name: 'Murray (Highland/Lowland)', coords: [[56.7, -4.2], [56.5, -3.7], [56.8, -3.9]], color: '#8A2BE2', info: '<strong>Clan Murray:</strong> A ducal family with immense power in Perthshire, straddling the Highland line. The Dukes of Atholl command Europe\'s only private army.' },
        lindsay: { name: 'Lindsay (Lowland)', coords: [[56.6, -2.8], [56.4, -2.5], [56.7, -3.0]], color: '#00008B', info: '<strong>Clan Lindsay:</strong> An ancient Lowland house, the Earls of Crawford, with power centered in Angus and Fife.' },
        douglas: { name: 'Douglas (Lowland)', coords: [[55.6, -4.0], [55.3, -3.5], [55.7, -3.8]], color: '#4682B4', info: '<strong>House of Douglas:</strong> An immensely powerful Lowland family whose influence in the south often rivaled that of the monarchy.' },
        cunningham: { name: 'Cunningham (Lowland)', coords: [[55.6, -4.8], [55.4, -4.5], [55.7, -4.9]], color: '#DEB887', info: '<strong>Clan Cunningham:</strong> A powerful Ayrshire family known for their long and bloody feud with the Montgomeries.' },
        scott: { name: 'Scott (Border)', coords: [[55.5, -3.2], [55.2, -2.8], [55.3, -3.4]], color: '#004225', info: '<strong>Clan Scott:</strong> One of the most powerful Border Reiver clans, controlling large parts of the turbulent frontier with England.' },
         kerr: { name: 'Kerr (Border)', coords: [[55.45, -2.7], [55.25, -2.4], [55.35, -2.9]], color: '#A0522D', info: '<strong>Clan Kerr:</strong> A powerful Border Reiver clan known for their left-handed warriors and their feud with the Scotts.' },
        armstrong: { name: 'Armstrong (Border)', coords: [[55.2, -2.8], [55.0, -2.5], [55.1, -3.1]], color: '#587445', info: '<strong>Clan Armstrong:</strong> A famously lawless and formidable Border Reiver clan, so powerful they were seen as a threat by the Scottish Crown.' },
        elliot: { name: 'Elliot (Border)', coords: [[55.3, -2.9], [55.1, -2.6], [55.2, -3.2]], color: '#BDB76B', info: '<strong>Clan Elliot:</strong> A tough and resilient Border Reiver clan, known for their skill in the saddle and constant feuding.' }
    };
    
    const regionData = {
        highlands: { coords: [[58.6, -4.0], [57.0, -6.5], [56.2, -5.0], [56.5, -3.5], [57.8, -3.5]], color: '#8C4843' },
        northeast: { coords: [[57.8, -3.5], [57.0, -1.8], [56.8, -2.8], [57.6, -3.5]], color: '#6B4226' },
        lowlands: { coords: [[56.5, -3.5], [56.2, -5.0], [55.0, -4.5], [55.5, -2.0], [56.3, -2.5]], color: '#4682B4' },
        borders: { coords: [[55.5, -2.0], [55.0, -4.5], [54.8, -2.0]], color: '#004225' },
        isles: { coords: [[[60.8, -1.5], [60.1, -1.8], [59.8, -1.2], [60.5, -0.8]], [[59.2, -3.5], [58.8, -2.8], [59.3, -3.0]]], color: '#FFD700' }
    };

    let cart = [];
    let map;
    let mapInitialized = false;

    // --- INITIALIZATION ---
    initNav();
    initClansPage();
    setupDossierPage({
        sectionId: 'legends-section',
        mainContentId: 'legends-main-content',
        listData: [{ title: 'Legendary Figures', data: legendsData, type: 'figure', displayFn: displayFigure }]
    });
    initTartanBuilder(); 
    initRecipeBook();
    initMarketplace();
    initClanFinder();

    // --- NAVIGATION ---
    function initNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pageSections = document.querySelectorAll('.page-section');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetId = link.dataset.target + '-section';
                pageSections.forEach(section => section.classList.toggle('active', section.id === targetId));
                navLinks.forEach(nav => nav.classList.remove('active'));
                document.querySelectorAll(`.nav-link[data-target="${link.dataset.target}"]`).forEach(l => l.classList.add('active'));
                
                if (targetId === 'clans-section' && map) {
                     setTimeout(() => { map.invalidateSize(); }, 50);
                }
                if (targetId === 'tartan-designer-section') {
                    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 50);
                }
                mobileMenu.classList.add('hidden');
            });
        });
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelector('.nav-link[data-target="home"]').classList.add('active');
        document.getElementById('home-section').classList.add('active');
    }

    function setupTabs(container) {
        const tabs = container.querySelectorAll('.tab-button');
        const tabContents = container.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                tabContents.forEach(content => content.classList.remove('active'));
                const contentEl = container.querySelector(`#${tab.dataset.tab}-content`);
                if (contentEl) contentEl.classList.add('active');
            });
        });
    }

    // --- CLANS & MAP PAGE ---
    function initClansPage() {
        const sectionEl = document.getElementById('clans-section');
        if (!sectionEl) return;

        if (!mapInitialized) {
            map = L.map('clanMap', { center: [57.0, -4.5], zoom: 6, minZoom: 6, maxBounds: [[61.0, -9.0], [54.5, 0.0]] });
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }).addTo(map);

            for (const regionKey in regionData) {
                const region = regionData[regionKey];
                L.polygon(region.coords, { color: region.color, fillColor: region.color, fillOpacity: 0.1, weight: 0, interactive: false }).addTo(map);
            }
            mapInitialized = true;
        }
        
        const sidebarListEl = document.getElementById('clan-sidebar-list');
        const infoBox = document.getElementById('map-info');
        const layers = {};
        
        const sortedData = [...clanData].sort((a, b) => a.name.localeCompare(b.name));
        
        sidebarListEl.innerHTML = '';
        sortedData.forEach(clan => {
            const button = document.createElement('button');
            button.textContent = clan.name;
            button.dataset.id = clan.id;
            button.className = 'block w-full text-left px-4 py-2 rounded-md text-stone-600 hover:bg-stone-200 transition-colors duration-150';
            button.addEventListener('click', () => highlightClan(clan.id));
            sidebarListEl.appendChild(button);
        });
        
        for (const clan of clanData) {
            const territory = clanTerritories[clan.id];
            if (territory) {
                const polygon = L.polygon(territory.coords, { color: territory.color, fillColor: territory.color, fillOpacity: 0.4, weight: 2 });
                polygon.bindPopup(`<b>${territory.name.split(' ')[0]}</b>`);
                layers[clan.id] = polygon;
            }
        }

        function highlightClan(clanId) {
            sidebarListEl.querySelectorAll('.active-item').forEach(el => el.classList.remove('active-item'));
            sidebarListEl.querySelector(`[data-id="${clanId}"]`)?.classList.add('active-item');

            for (const id in layers) {
                if (map.hasLayer(layers[id])) {
                    layers[id].setStyle({ fillOpacity: 0.2, weight: 1 });
                }
            }
            
            if (layers[clanId]) {
                if (!map.hasLayer(layers[clanId])) {
                    layers[clanId].addTo(map);
                }
                layers[clanId].setStyle({ fillOpacity: 0.7, weight: 3 });
                map.fitBounds(layers[clanId].getBounds().pad(0.2));
                
                const clan = clanData.find(c => c.id === clanId);
                const territory = clanTerritories[clanId];
                infoBox.innerHTML = `
                    <p class="font-bold text-lg">${clan.name}</p>
                    <p>${territory.info}</p>
                    <button class="view-details-btn mt-4 bg-yellow-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-900 transition-colors shadow text-sm" data-id="${clanId}">View Full Dossier</button>
                `;
                infoBox.querySelector('.view-details-btn').addEventListener('click', (e) => {
                    const clan = clanData.find(c => c.id === e.target.dataset.id);
                    openGenericModal(clan);
                });
            }
        }
        Object.values(layers).forEach(layer => layer.addTo(map));
    }

    // --- DOSSIER PAGE SETUP (LEGENDS) ---
    function setupDossierPage(config) {
        const sectionEl = document.getElementById(config.sectionId);
        if (!sectionEl || config.sectionId === 'clans-section') return;

        const mainContentEl = document.getElementById(config.mainContentId);
        const sidebarContentEl = sectionEl.querySelector('.sidebar-scroll');

        sidebarContentEl.innerHTML = '';
        config.listData.forEach(list => {
            const sortedData = [...list.data].sort((a, b) => a.name.localeCompare(b.name));
            
            const heading = document.createElement('h3');
            heading.className = 'text-xs font-semibold uppercase text-stone-500 tracking-wider px-4 mb-2';
            heading.textContent = list.title;
            sidebarContentEl.appendChild(heading);
            
            const listEl = document.createElement('div');
            sortedData.forEach(item => {
                const button = document.createElement('button');
                button.textContent = item.name;
                button.dataset.name = item.name;
                button.dataset.type = list.type;
                button.className = 'block w-full text-left px-4 py-2 rounded-md text-stone-600 hover:bg-stone-200 transition-colors duration-150';
                button.addEventListener('click', () => list.displayFn(item.name, mainContentEl, sidebarContentEl));
                listEl.appendChild(button);
            });
            sidebarContentEl.appendChild(listEl);
        });

        if (config.listData.length > 0 && config.listData[0].data.length > 0) {
            const firstList = config.listData[0];
            const firstItemName = [...firstList.data].sort((a, b) => a.name.localeCompare(b.name))[0].name;
            firstList.displayFn(firstItemName, mainContentEl, sidebarContentEl);
        }
    }

    function updateActiveItem(name, type, sidebarEl) {
        if (!sidebarEl) return;
        sidebarEl.querySelectorAll('.active-item').forEach(el => el.classList.remove('active-item'));
        const activeItem = sidebarEl.querySelector(`[data-type="${type}"][data-name="${name}"]`);
        activeItem?.classList.add('active-item');
    }

    function displayFigure(figureName, mainContentEl, sidebarEl) {
        const figure = legendsData.find(f => f.name === figureName);
        if (!figure) return;

        mainContentEl.innerHTML = `
            <div class="animate-fade-in">
                <div class="mb-6">
                    <h1 class="text-4xl font-bold text-stone-900 font-title">${figure.name}</h1>
                    <p class="text-lg text-stone-500 mt-1">${figure.title}</p>
                </div>
                 <div class="border-b border-stone-300 mb-6">
                     <nav class="figure-tabs -mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                         <button class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="lore">Lore</button>
                         ${figure.recipe ? `<button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300" data-tab="recipe">Recipe</button>` : ''}
                     </nav>
                 </div>
                 <div class="tab-content-container">
                     <div id="lore-content" class="tab-content active">
                         <div class="prose max-w-none text-stone-700 space-y-4">${figure.lore.replace(/\n\n/g, '</p><p>')}</div>
                     </div>
                     ${figure.recipe ? `
                     <div id="recipe-content" class="tab-content">
                         <h3 class="text-2xl font-semibold text-stone-800 mb-2 font-title">${figure.recipe.name}</h3>
                         <p class="mb-6 text-stone-600 italic">"${figure.recipe.link}"</p>
                         <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             <div class="lg:col-span-1">
                                 <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Ingredients</h4>
                                 <ul class="list-disc list-inside space-y-2 text-stone-600">${figure.recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                             </div>
                             <div class="lg:col-span-2">
                                 <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Method</h4>
                                 <ol class="list-decimal list-inside space-y-3 text-stone-600">${figure.recipe.method.map(s => `<li>${s}</li>`).join('')}</ol>
                             </div>
                         </div>
                     </div>` : ''}
                 </div>
            </div>`;
        updateActiveItem(figureName, 'figure', sidebarEl);
        setupTabs(mainContentEl);
    }

    // --- TARTAN BUILDER ---
    function initTartanBuilder() {
        const canvas = document.getElementById('tartan-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const colorPalette = document.getElementById('color-palette');
        const threadCountInput = document.getElementById('thread-count');
        const addStripeBtn = document.getElementById('add-stripe-btn');
        const clearPatternBtn = document.getElementById('clear-pattern-btn');
        const patternList = document.getElementById('pattern-list');
        const tartanNameInput = document.getElementById('tartan-name');
        const saveBtn = document.getElementById('save-btn');
        const shareBtn = document.getElementById('share-btn');
        const shareTooltip = document.getElementById('share-tooltip');
        const examplesGrid = document.getElementById('tartan-examples-grid');

        const TARTAN_COLORS = [
            { name: 'Hunter Green', hex: '#004225' }, { name: 'Royal Red', hex: '#C41E3A' },
            { name: 'Azure Blue', hex: '#0072B2' }, { name: 'Charcoal', hex: '#36454F' },
            { name: 'Gold', hex: '#FFD700' }, { name: 'White', hex: '#FFFFFF' },
        ];
        let selectedColor = TARTAN_COLORS[0].hex;
        let sett = [];

        const exampleTartans = {
            "Royal Stewart": [ { color: '#C41E3A', threads: 72 }, { color: '#0072B2', threads: 12 }, { color: '#FFFFFF', threads: 4 }, { color: '#FFD700', threads: 12 }, { color: '#004225', threads: 18 }, { color: '#36454F', threads: 4 }, ],
            "Black Watch": [ { color: '#1a2d57', threads: 48 }, { color: '#004225', threads: 48 }, { color: '#36454F', threads: 24 }, ],
            "MacLeod of Harris": [ { color: '#FFD700', threads: 24 }, { color: '#36454F', threads: 12 }, { color: '#C41E3A', threads: 4 }, ]
        };

        function setup() {
            setupColorPalette();
            populateTartanExamples();
            loadPatternFromURL();
            if (sett.length === 0) loadDefaultPattern();
            updatePatternList();
            
            setTimeout(() => { resizeCanvas(); drawTartan(); }, 50);

            addStripeBtn.addEventListener('click', addStripe);
            clearPatternBtn.addEventListener('click', clearPattern);
            saveBtn.addEventListener('click', saveTartanAsImage);
            shareBtn.addEventListener('click', shareTartanLink);
            threadCountInput.addEventListener('input', previewTartan);
            window.addEventListener('resize', () => { if(document.getElementById('tartan-designer-section').classList.contains('active')) { resizeCanvas(); drawTartan(); } });
        }
        
        function populateTartanExamples() {
            examplesGrid.innerHTML = '';
            for (const name in exampleTartans) {
                const card = document.createElement('div');
                card.className = 'tartan-example-card bg-white p-2 rounded-lg shadow border';
                card.innerHTML = `<canvas class="w-full h-20 rounded-md"></canvas><p class="text-center font-semibold text-sm mt-2">${name}</p>`;
                
                const exampleCanvas = card.querySelector('canvas');
                const exampleCtx = exampleCanvas.getContext('2d');

                setTimeout(() => {
                    const dpr = window.devicePixelRatio || 1;
                    const rect = exampleCanvas.getBoundingClientRect();
                    exampleCanvas.width = rect.width * dpr;
                    exampleCanvas.height = rect.height * dpr;
                    exampleCtx.scale(dpr, dpr);
                    drawTartan(exampleTartans[name], exampleCtx, rect.width, rect.height);
                }, 100);

                card.addEventListener('click', () => { loadExampleTartan(name); });
                examplesGrid.appendChild(card);
            }
        }

        function loadExampleTartan(name) {
            sett = JSON.parse(JSON.stringify(exampleTartans[name]));
            tartanNameInput.value = name;
            updatePatternList();
            drawTartan();
        }

        function setupColorPalette() {
            colorPalette.innerHTML = '';
            TARTAN_COLORS.forEach((color, index) => {
                const colorEl = document.createElement('div');
                colorEl.className = 'w-10 h-10 rounded-full cursor-pointer border-2 border-stone-200 color-box';
                colorEl.style.backgroundColor = color.hex;
                colorEl.dataset.color = color.hex;
                colorEl.title = color.name;
                if (index === 0) colorEl.classList.add('selected');
                colorEl.addEventListener('click', () => {
                    selectedColor = color.hex;
                    document.querySelectorAll('#color-palette .color-box').forEach(el => el.classList.remove('selected'));
                    colorEl.classList.add('selected');
                    previewTartan();
                });
                colorPalette.appendChild(colorEl);
            });
        }

        function updatePatternList() {
            if (!patternList) return;
            patternList.innerHTML = sett.length === 0 ? '<p class="text-stone-500 text-center">Your stripes will appear here...</p>' : '';
            if (sett.length > 0) {
                sett.forEach((stripe, index) => {
                    const stripeEl = document.createElement('div');
                    stripeEl.className = 'flex items-center justify-between p-2 rounded-lg mb-2 bg-white border';
                    stripeEl.innerHTML = `
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full border" style="background-color: ${stripe.color};"></div>
                            <span class="text-sm">${stripe.threads} threads</span>
                        </div>
                        <button class="text-red-500 hover:text-red-700 font-bold text-lg" data-index="${index}">&times;</button>
                    `;
                    stripeEl.querySelector('button').addEventListener('click', (e) => removeStripe(parseInt(e.target.dataset.index)));
                    patternList.appendChild(stripeEl);
                });
            }
        }
        
        function showMessage(text, isError = false) {
            const messageBox = document.getElementById('message-box');
            const messageText = document.getElementById('message-text');
            messageText.textContent = text;
            messageBox.className = 'fixed top-20 right-5 py-2 px-4 rounded-lg shadow-lg transition-all duration-300 z-50';
            messageBox.classList.add(isError ? 'bg-red-600' : 'bg-green-600', 'text-white', 'opacity-100');
            setTimeout(() => { messageBox.classList.remove('opacity-100'); messageBox.classList.add('opacity-0'); }, 3000);
        }

        function loadDefaultPattern() { loadExampleTartan("Royal Stewart"); }
        
        function addStripe() {
            const threads = parseInt(threadCountInput.value);
            if (!threads || threads < 2) {
                showMessage('Please enter a thread count of 2 or more.', true);
                return;
            }
            sett.push({ color: selectedColor, threads });
            threadCountInput.value = '';
            updatePatternList();
            drawTartan();
        }

        function previewTartan() {
            const threads = parseInt(threadCountInput.value);
            if (!threads || threads < 2) { drawTartan(); return; }
            const previewSett = [...sett, { color: selectedColor, threads: threads }];
            drawTartan(previewSett);
        }

        function removeStripe(index) {
            sett.splice(index, 1);
            updatePatternList();
            drawTartan();
        }

        function clearPattern() {
            sett = [];
            if(tartanNameInput) tartanNameInput.value = '';
            updatePatternList();
            drawTartan();
        }

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        function drawTartan(patternToDraw = sett, targetCtx = ctx, width = canvas.parentElement.getBoundingClientRect().width, height = canvas.parentElement.getBoundingClientRect().height) {
            if (width === 0 || height === 0) return;

            targetCtx.clearRect(0, 0, width, height);
            if (patternToDraw.length === 0) {
                targetCtx.fillStyle = '#F9FAFB';
                targetCtx.fillRect(0, 0, width, height);
                targetCtx.fillStyle = '#9CA3AF';
                targetCtx.font = '16px Inter';
                targetCtx.textAlign = 'center';
                targetCtx.fillText('Add stripes to see your tartan!', width / 2, height / 2);
                return;
            }

            const fullPattern = [...patternToDraw, ...[...patternToDraw].reverse()];
            const totalThreads = fullPattern.reduce((sum, s) => sum + s.threads, 0);
            if (totalThreads === 0) return;

            const scale = Math.max(width, height) / totalThreads;
            
            let x = 0;
            while (x < width) {
                fullPattern.forEach(stripe => {
                    targetCtx.fillStyle = stripe.color;
                    const stripeWidth = stripe.threads * scale;
                    targetCtx.fillRect(x, 0, stripeWidth, height);
                    x += stripeWidth;
                });
            }

            let y = 0;
            while (y < height) {
                 fullPattern.forEach(stripe => {
                    targetCtx.fillStyle = stripe.color;
                    const stripeHeight = stripe.threads * scale;
                    targetCtx.globalAlpha = 0.65;
                    targetCtx.fillRect(0, y, width, stripeHeight);
                    targetCtx.globalAlpha = 1.0;
                    y += stripeHeight;
                });
            }
        }

        function saveTartanAsImage() {
            const name = tartanNameInput.value || 'My-Tartan';
            const link = document.createElement('a');
            link.download = `${name.replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showMessage('Tartan saved as image!', false);
        }

        function shareTartanLink() {
            const patternString = sett.map(s => `${s.color.replace('#','')}-${s.threads}`).join(',');
            const nameString = encodeURIComponent(tartanNameInput.value || 'My Tartan');
            const url = `${window.location.href.split('?')[0]}?tartan=${patternString}&name=${nameString}`;
            
            const dummy = document.createElement('textarea');
            document.body.appendChild(dummy);
            dummy.value = url;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);

            shareTooltip.textContent = 'Copied!';
            setTimeout(() => { shareTooltip.textContent = 'Copy sharable link'; }, 2000);
        }

        function loadPatternFromURL() {
            const params = new URLSearchParams(window.location.search);
            const tartanParam = params.get('tartan');
            const nameParam = params.get('name');
            if (tartanParam) {
                try {
                    const newSett = tartanParam.split(',').map(p => {
                        const [color, threads] = p.split('-');
                        return { color: `#${color}`, threads: parseInt(threads) };
                    });
                    sett = newSett;
                    if(nameParam) tartanNameInput.value = decodeURIComponent(nameParam);
                    document.querySelector('.nav-link[data-target="tartan-designer"]').click();
                } catch (e) {
                    console.error("Could not parse tartan from URL", e);
                    loadDefaultPattern();
                }
            }
        }
        setup();
    }

    // --- RECIPE BOOK ---
    function initRecipeBook() {
        const recipeGrid = document.getElementById('recipe-grid');
        const recipeIndexList = document.getElementById('recipe-index-list');
        if (!recipeGrid || !recipeIndexList) return;

        const allRecipes = [];
        clanData.forEach(clan => { if (clan.recipe) { allRecipes.push({ ...clan.recipe, context: `From the lands of ${clan.name}` }); } });
        legendsData.forEach(legend => { if (legend.recipe) { allRecipes.push({ ...legend.recipe, context: `A dish for ${legend.name}` }); } });

        recipeGrid.innerHTML = allRecipes.map((recipe, index) => `
            <div class="content-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" data-index="${index}">
                <div class="p-6">
                    <h2 class="text-2xl font-bold font-title text-stone-900">${recipe.name}</h2>
                    <p class="text-stone-600 mt-2 text-sm h-12 overflow-hidden">${recipe.link}</p>
                    <p class="text-xs text-yellow-800 font-semibold mt-3">${recipe.context}</p>
                </div>
            </div>`).join('');

        const sortedRecipes = [...allRecipes].sort((a, b) => a.name.localeCompare(b.name));
        recipeIndexList.innerHTML = sortedRecipes.map(recipe => {
            const originalIndex = allRecipes.findIndex(r => r.name === recipe.name && r.context === recipe.context);
            return `<button class="text-stone-700 hover:text-yellow-800 hover:underline transition-colors text-left" data-index="${originalIndex}">${recipe.name}</button>`;
        }).join('');

        const handleRecipeClick = (index) => { if (allRecipes[index]) openGenericModal(allRecipes[index]); };

        recipeGrid.addEventListener('click', e => {
            const card = e.target.closest('.content-card');
            if (card?.dataset.index) handleRecipeClick(card.dataset.index);
        });

        recipeIndexList.addEventListener('click', e => {
            const button = e.target.closest('button');
            if (button?.dataset.index) handleRecipeClick(button.dataset.index);
        });
    }
    
    // --- MARKETPLACE ---
    function initMarketplace() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = marketplaceData.map(product => `
            <div class="content-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold font-title text-stone-900">${product.name}</h3>
                    <p class="text-stone-600 mt-2 text-sm flex-grow">${product.desc}</p>
                    <div class="flex justify-between items-center mt-4">
                        <p class="text-lg font-semibold text-yellow-800">£${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn bg-yellow-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-900 transition-colors shadow" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>`).join('');

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => addToCart(parseInt(e.target.dataset.id)));
        });
        
        document.getElementById('cart-button').addEventListener('click', openCartModal);
    }
    
    function addToCart(productId) {
        const product = marketplaceData.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) { existingItem.quantity++; } 
            else { cart.push({ ...product, quantity: 1 }); }
            updateCartCount();
            showMessage(`${product.name} added to cart!`);
        }
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    function openCartModal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let contentHTML = `
            <div class="p-6 md:p-8">
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-3xl font-bold font-title text-yellow-900">Your Cart</h2>
                    <button id="close-modal" class="text-3xl font-bold text-stone-500 hover:text-stone-800">&times;</button>
                </div>`;

        if (cart.length === 0) {
            contentHTML += `<p class="text-stone-600 text-center">Your cart is empty.</p>`;
        } else {
            contentHTML += `<div class="space-y-4 mb-6">`;
            cart.forEach((item, index) => {
                contentHTML += `
                    <div class="flex items-center justify-between border-b pb-2">
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-sm text-stone-500">£${item.price.toFixed(2)} x ${item.quantity}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">£${(item.price * item.quantity).toFixed(2)}</p>
                            <button class="remove-from-cart-btn text-red-500 hover:text-red-700 font-bold" data-index="${index}">&times;</button>
                        </div>
                    </div>`;
            });
            contentHTML += `</div>
                <div class="flex justify-between items-center font-bold text-xl border-t pt-4">
                    <p>Total:</p>
                    <p>£${total.toFixed(2)}</p>
                </div>
                <div class="mt-8 text-center">
                    <button id="checkout-btn" class="bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition-colors shadow w-full">Proceed to Checkout</button>
                </div>`;
        }
        
        contentHTML += `</div>`;
        
        const modal = document.getElementById('generic-modal');
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = contentHTML;
        modal.classList.add('flex', 'animate-fade-in');
        modal.classList.remove('hidden');
        
        modal.querySelector('#close-modal').addEventListener('click', () => { modal.classList.add('hidden'); modal.classList.remove('flex', 'animate-fade-in'); });
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => { button.addEventListener('click', (e) => removeFromCart(parseInt(e.target.dataset.index))); });
        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            modal.classList.add('hidden');
            showMessage('Thank you for your order!');
            cart = [];
            updateCartCount();
        });
    }
    
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        openCartModal();
    }

    // --- GENERIC MODAL ---
    function openGenericModal(item) {
        const modal = document.getElementById('generic-modal');
        const modalContent = document.getElementById('modal-content');
        let contentHTML = `
            <div class="p-6 md:p-8">
                <div class="flex justify-between items-start">
                    <h2 class="text-3xl font-bold font-title mb-2 text-yellow-900">${item.name}</h2>
                    <button id="close-modal" class="text-3xl font-bold text-stone-500 hover:text-stone-800">&times;</button>
                </div>`;
        
        if (item.title) { contentHTML += `<p class="text-md text-stone-600 mb-6 italic">${item.title}</p>`; } 
        else if (item.gaelicName) { contentHTML += `<p class="text-md text-stone-600 mb-6 italic">${item.gaelicName}</p>`; }
        if (item.link) { contentHTML += `<p class="text-md text-stone-600 mb-6 italic">"${item.link}"</p>`; }
        if(item.lore) { contentHTML += `<div class="prose max-w-none text-stone-700 space-y-4 mb-8">${item.lore.replace(/\n\n/g, '</p><p>')}</div>`; }
        if(item.ingredients && item.method) {
            contentHTML += `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold border-b-2 border-yellow-700 pb-2 mb-3">Ingredients</h3>
                        <ul class="list-disc list-inside space-y-1 text-stone-700">${item.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold border-b-2 border-yellow-700 pb-2 mb-3">Method</h3>
                        <ol class="list-decimal list-inside space-y-2 text-stone-700">${item.method.map(s => `<li>${s}</li>`).join('')}</ol>
                    </div>
                </div>`;
        } else if (item.recipe) {
             contentHTML += `
                <h3 class="text-2xl font-semibold text-stone-800 mb-2 font-title">${item.recipe.name}</h3>
                <p class="mb-6 text-stone-600 italic">"${item.recipe.link}"</p>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-1">
                        <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Ingredients</h4>
                        <ul class="list-disc list-inside space-y-2 text-stone-600">${item.recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                    <div class="lg:col-span-2">
                        <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Method</h4>
                        <ol class="list-decimal list-inside space-y-3 text-stone-600">${item.recipe.method.map(s => `<li>${s}</li>`).join('')}</ol>
                    </div>
                </div>`;
        }
        contentHTML += `</div>`;
        modalContent.innerHTML = contentHTML;
        modal.classList.add('flex', 'animate-fade-in');
        modal.classList.remove('hidden');
        modal.querySelector('#close-modal').addEventListener('click', () => { modal.classList.add('hidden'); modal.classList.remove('flex', 'animate-fade-in'); });
    }
    
    // --- CLAN FINDER ---
    function initClanFinder() {
        const quizContainer = document.getElementById('quiz-container');
        const resultContainer = document.getElementById('quiz-result');
        if (!quizContainer) return;

        const quizQuestions = [
            { question: "When facing a great challenge, you rely on:", options: { "A": { text: "Careful strategy and political skill.", clan: "campbell" }, "B": { text: "Unwavering loyalty to your allies.", clan: "cameron" }, "C": { text: "Boldness and a willingness to take risks.", clan: "armstrong" }, "D": { text: "Ancient traditions and the strength of your heritage.", clan: "donald" } } },
            { question: "Your ideal home would be:", options: { "A": { text: "A grand castle, a center of power and influence.", clan: "campbell" }, "B": { text: "A remote fortress, guarding your independence.", clan: "macleod" }, "C": { text: "A fortified tower on a wild frontier.", clan: "scott" }, "D": { text: "A coastal stronghold with a fleet of ships at the ready.", clan: "donald" } } },
            { question: "In a dispute, your first instinct is to:", options: { "A": { text: "Use the law and negotiation to your advantage.", clan: "campbell" }, "B": { text: "Gather your allies and prepare for a fight.", clan: "cameron" }, "C": { text: "Launch a pre-emptive strike.", clan: "armstrong" }, "D": { text: "Consult with the elders and follow tradition.", clan: "donald" } } },
            { question: "You value loyalty to:", options: { "A": { text: "The central government and the rule of law.", clan: "campbell" }, "B": { text: "A charismatic leader and a righteous cause.", clan: "cameron" }, "C": { text: "Your immediate family and those who have proven their worth.", clan: "scott" }, "D": { text: "The ancient lineage and heritage of your people.", clan: "donald" } } },
            { question: "Your greatest strength is your:", options: { "A": { text: "Political cunning and strategic mind.", clan: "campbell" }, "B": { text: "Unbreakable spirit and devotion to your cause.", clan: "cameron" }, "C": { text: "Fierce independence and self-reliance.", clan: "armstrong" }, "D": { text: "Deep connection to the past and to the sea.", clan: "donald" } } }
        ];

        let currentQuestion = 0;
        let scores = {};

        function showQuestion(index) {
            const q = quizQuestions[index];
            quizContainer.innerHTML = `
                <div class="quiz-question active animate-fade-in">
                    <h3 class="text-2xl font-semibold text-center mb-6">${q.question}</h3>
                    <div class="space-y-4">
                        ${Object.keys(q.options).map(key => `
                            <button class="quiz-option block w-full text-left p-4 border-2 border-stone-200 rounded-lg" data-clan="${q.options[key].clan}">
                                <span class="font-bold">${key}.</span> ${q.options[key].text}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
            quizContainer.querySelectorAll('.quiz-option').forEach(button => button.addEventListener('click', handleAnswer));
        }

        function handleAnswer(e) {
            const selectedClan = e.currentTarget.dataset.clan;
            scores[selectedClan] = (scores[selectedClan] || 0) + 1;
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                showQuestion(currentQuestion);
            } else {
                showResult();
            }
        }

        function showResult() {
            quizContainer.style.display = 'none';
            const topClanId = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            const resultClan = clanData.find(c => c.id === topClanId);

            resultContainer.innerHTML = `
                <h3 class="text-3xl font-bold font-title text-stone-900">Your Spirit Clan is...</h3>
                <h2 class="text-5xl font-bold font-title text-yellow-800 my-4">${resultClan.name}</h2>
                <p class="text-lg text-stone-700 mb-6">${resultClan.mottoLore}</p>
                <button id="restart-quiz-btn" class="bg-yellow-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-900 transition-colors shadow">Take the Quiz Again</button>
            `;
            resultContainer.classList.remove('hidden');
            resultContainer.classList.add('animate-fade-in');

            document.getElementById('restart-quiz-btn').addEventListener('click', () => {
                currentQuestion = 0;
                scores = {};
                resultContainer.classList.add('hidden');
                quizContainer.style.display = 'block';
                showQuestion(0);
            });
        }
        showQuestion(0);
    }
});
