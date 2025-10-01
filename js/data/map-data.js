const clanTerritories = {
    sinclair: {
        name: 'Sinclair (Norse)',
        coords: [[[60.8, -1.5], [60.1, -1.8], [59.8, -1.2], [60.5, -0.8]], [[59.2, -3.5], [58.8, -2.8], [59.3, -3.0]]],
        color: '#FFD700',
        info: '<strong>Clan Sinclair:</strong> The Norse Earls of Orkney and Shetland, their power base was in the Northern Isles and Caithness.'
    },
    donald: {
        name: 'Donald (Highland)',
        coords: [[57.2, -6.3], [57.0, -6.0], [56.8, -6.2], [55.8, -6.2], [55.6, -5.8], [56.5, -5.5], [57.4, -5.8]],
        color: '#8C4843',
        info: '<strong>Clan Donald:</strong> The Lords of the Isles. Their power base was maritime, controlling the Hebrides and the western seaboard.'
    },
    campbell: {
        name: 'Campbell (Highland)',
        coords: [[56.5, -5.5], [56.0, -5.0], [56.3, -4.5], [56.6, -5.0]],
        color: '#3D4F45',
        info: '<strong>Clan Campbell:</strong> Masters of Argyll. Their power was land-based, consolidated through political alignment with the Crown.'
    },
    macleod: {
        name: 'MacLeod (Highland)',
        coords: [[57.4, -6.8], [58.2, -6.9], [58.3, -6.2], [57.5, -6.2]],
        color: '#A57C00',
        info: '<strong>Clan MacLeod:</strong> Rulers of Skye and Harris. Their strength came from their island strongholds like Dunvegan Castle.'
    },
    mackenzie: {
        name: 'MacKenzie (Highland)',
        coords: [[57.3, -5.5], [57.8, -5.0], [57.6, -4.0], [57.2, -4.5]],
        color: '#5A7165',
        info: '<strong>Clan MacKenzie:</strong> Power in the North. They controlled a vast territory from Kintail to the Black Isle.'
    },
    gordon: {
        name: 'Gordon (North East)',
        coords: [[57.6, -3.5], [57.2, -2.5], [57.0, -3.0], [57.3, -3.8]],
        color: '#6B4226',
        info: '<strong>Clan Gordon:</strong> Dominant in the Northeast, the Gordons were a powerful feudal family whose influence often rivaled that of the Crown.'
    },
    forbes: {
        name: 'Forbes (North East)',
        coords: [[57.4, -3.0], [57.1, -2.8], [57.2, -3.4]],
        color: '#9E5B41',
        info: '<strong>Clan Forbes:</strong> A powerful North East family and the great rivals of the Gordons, with whom they fought a centuries-long feud.'
    },
    leslie: {
        name: 'Leslie (North East)',
        coords: [[57.5, -2.8], [57.3, -2.4], [57.2, -2.9]],
        color: '#4B0082',
        info: '<strong>Clan Leslie:</strong> A noble house holding the Earldom of Rothes, they were a powerful force in Aberdeenshire and Fife.'
    },
    irvine: {
        name: 'Irvine (North East)',
        coords: [[57.1, -2.4], [57.0, -2.2], [56.9, -2.6]],
        color: '#008080',
        info: '<strong>Clan Irvine of Drum:</strong> An ancient family whose lands near Aberdeen were a gift from Robert the Bruce.'
    },
    keith: {
        name: 'Keith (North East)',
        coords: [[56.9, -2.3], [57.1, -2.1], [56.8, -2.5]],
        color: '#B5651D',
        info: '<strong>Clan Keith:</strong> Hereditary Earls Marischal of Scotland, their power was based in the North East, with Dunnottar Castle as their seat.'
    },
    fraser: {
        name: 'Fraser (Highland)',
        coords: [[57.5, -4.8], [57.6, -4.2], [57.3, -4.3], [57.2, -4.9]],
        color: '#465C69',
        info: '<strong>Clan Fraser:</strong> Masters of the Aird, their lands surrounded the Beauly Firth near Inverness, giving them immense influence.'
    },
    grant: {
        name: 'Grant (Highland)',
        coords: [[57.3, -3.6], [57.1, -3.2], [57.4, -3.8]],
        color: '#2E8B57',
        info: '<strong>Clan Grant:</strong> A powerful Speyside clan, their lands centered on the River Spey. Known for their motto "Stand Fast".'
    },
    maclean: {
        name: 'Maclean (Highland)',
        coords: [[56.5, -6.1], [56.3, -5.8], [56.6, -6.3]],
        color: '#C71585',
        info: '<strong>Clan Maclean:</strong> A formidable clan of the Inner Hebrides, with their main seat at Duart Castle on the Isle of Mull.'
    },
    macdougall: {
        name: 'MacDougall (Highland)',
        coords: [[56.45, -5.6], [56.3, -5.4], [56.5, -5.7]],
        color: '#000000',
        info: '<strong>Clan MacDougall:</strong> An ancient clan descended from Somerled, they were Lords of Lorn with their seat at Dunollie Castle.'
    },
    stewart: {
        name: 'Stewart of Appin (Highland)',
        coords: [[56.6, -5.4], [56.7, -5.1], [56.5, -5.1], [56.4, -5.4]],
        color: '#B5A696',
        info: '<strong>Clan Stewart of Appin:</strong> A staunchly Jacobite clan, their lands were situated in a strategic coastal area of Argyll.'
    },
    chattan: {
        name: 'Clan Chattan (Highland)',
        coords: [[57.1, -4.3], [56.9, -3.9], [57.2, -4.5]],
        color: '#800000',
        info: '<strong>Clan Chattan:</strong> A powerful confederation of clans, including Mackintoshes and Macphersons, who controlled Badenoch.'
    },
    mackintosh: {
        name: 'Mackintosh (Highland)',
        coords: [[57.2, -4.2], [57.0, -3.8], [57.3, -4.4]],
        color: '#800000',
        info: '<strong>Clan Mackintosh:</strong> The principal chiefs of the Clan Chattan confederation, their heartland was in Badenoch and Strathnairn.'
    },
    macgregor: {
        name: 'MacGregor (Highland)',
        coords: [[56.4, -4.8], [56.6, -4.5], [56.3, -4.9]],
        color: '#A52A2A',
        info: '<strong>Clan MacGregor:</strong> The "Children of the Mist," a famously persecuted clan whose name was outlawed for nearly 200 years.'
    },
    cameron: {
        name: 'Cameron (Highland)',
        coords: [[56.8, -5.4], [57.0, -4.8], [56.7, -4.9], [56.6, -5.3]],
        color: '#6C5B7B',
        info: '<strong>Clan Cameron:</strong> Fierce warriors from Lochaber, their territory was rugged and mountainous. Staunchly Jacobite.'
    },
    macpherson: {
        name: 'Macpherson (Highland)',
        coords: [[57.0, -4.4], [56.8, -4.0], [57.1, -4.6]],
        color: '#F4A460',
        info: '<strong>Clan Macpherson:</strong> A key part of the Clan Chattan Confederation, their heartland was in Badenoch. Staunch Jacobites.'
    },
    murray: {
        name: 'Murray (Highland/Lowland)',
        coords: [[56.7, -4.2], [56.5, -3.7], [56.8, -3.9]],
        color: '#8A2BE2',
        info: '<strong>Clan Murray:</strong> A ducal family with immense power in Perthshire, straddling the Highland line. The Dukes of Atholl command Europe\'s only private army.'
    },
    lindsay: {
        name: 'Lindsay (Lowland)',
        coords: [[56.6, -2.8], [56.4, -2.5], [56.7, -3.0]],
        color: '#00008B',
        info: '<strong>Clan Lindsay:</strong> An ancient Lowland house, the Earls of Crawford, with power centered in Angus and Fife.'
    },
    douglas: {
        name: 'Douglas (Lowland)',
        coords: [[55.6, -4.0], [55.3, -3.5], [55.7, -3.8]],
        color: '#4682B4',
        info: '<strong>House of Douglas:</strong> An immensely powerful Lowland family whose influence in the south often rivaled that of the monarchy.'
    },
    cunningham: {
        name: 'Cunningham (Lowland)',
        coords: [[55.6, -4.8], [55.4, -4.5], [55.7, -4.9]],
        color: '#DEB887',
        info: '<strong>Clan Cunningham:</strong> A powerful Ayrshire family known for their long and bloody feud with the Montgomeries.'
    },
    scott: {
        name: 'Scott (Border)',
        coords: [[55.5, -3.2], [55.2, -2.8], [55.3, -3.4]],
        color: '#004225',
        info: '<strong>Clan Scott:</strong> One of the most powerful Border Reiver clans, controlling large parts of the turbulent frontier with England.'
    },
     kerr: {
        name: 'Kerr (Border)',
        coords: [[55.45, -2.7], [55.25, -2.4], [55.35, -2.9]],
        color: '#A0522D',
        info: '<strong>Clan Kerr:</strong> A powerful Border Reiver clan known for their left-handed warriors and their feud with the Scotts.'
    },
    armstrong: {
        name: 'Armstrong (Border)',
        coords: [[55.2, -2.8], [55.0, -2.5], [55.1, -3.1]],
        color: '#587445',
        info: '<strong>Clan Armstrong:</strong> A famously lawless and formidable Border Reiver clan, so powerful they were seen as a threat by the Scottish Crown.'
    },
    elliot: {
        name: 'Elliot (Border)',
        coords: [[55.3, -2.9], [55.1, -2.6], [55.2, -3.2]],
        color: '#BDB76B',
        info: '<strong>Clan Elliot:</strong> A tough and resilient Border Reiver clan, known for their skill in the saddle and constant feuding.'
    }
};

const regionData = {
    highlands: {
        coords: [[58.6, -4.0], [57.0, -6.5], [56.2, -5.0], [56.5, -3.5], [57.8, -3.5]],
        color: '#8C4843' // Muted Red
    },
    northeast: {
        coords: [[57.8, -3.5], [57.0, -1.8], [56.8, -2.8], [57.6, -3.5]],
        color: '#6B4226' // Brown
    },
    lowlands: {
        coords: [[56.5, -3.5], [56.2, -5.0], [55.0, -4.5], [55.5, -2.0], [56.3, -2.5]],
        color: '#4682B4' // Steel Blue
    },
    borders: {
        coords: [[55.5, -2.0], [55.0, -4.5], [54.8, -2.0]],
        color: '#004225' // Dark Green
    },
    isles: {
        coords: [[[60.8, -1.5], [60.1, -1.8], [59.8, -1.2], [60.5, -0.8]], [[59.2, -3.5], [58.8, -2.8], [59.3, -3.0]]],
        color: '#FFD700' // Gold
    }
};
const clanTerritories = {
    sinclair: {
        name: 'Sinclair (Norse)',
        coords: [[[60.8, -1.5], [60.1, -1.8], [59.8, -1.2], [60.5, -0.8]], [[59.2, -3.5], [58.8, -2.8], [59.3, -3.0]]],
        color: '#FFD700',
        info: '<strong>Clan Sinclair:</strong> The Norse Earls of Orkney and Shetland, their power base was in the Northern Isles and Caithness.'
    },
    donald: {
        name: 'Donald (Highland)',
        coords: [[57.2, -6.3], [57.0, -6.0], [56.8, -6.2], [55.8, -6.2], [55.6, -5.8], [56.5, -5.5], [57.4, -5.8]],
        color: '#8C4843',
        info: '<strong>Clan Donald:</strong> The Lords of the Isles. Their power base was maritime, controlling the Hebrides and the western seaboard.'
    },
    campbell: {
        name: 'Campbell (Highland)',
        coords: [[56.5, -5.5], [56.0, -5.0], [56.3, -4.5], [56.6, -5.0]],
        color: '#3D4F45',
        info: '<strong>Clan Campbell:</strong> Masters of Argyll. Their power was land-based, consolidated through political alignment with the Crown.'
    },
    macleod: {
        name: 'MacLeod (Highland)',
        coords: [[57.4, -6.8], [58.2, -6.9], [58.3, -6.2], [57.5, -6.2]],
        color: '#A57C00',
        info: '<strong>Clan MacLeod:</strong> Rulers of Skye and Harris. Their strength came from their island strongholds like Dunvegan Castle.'
    },
    mackenzie: {
        name: 'MacKenzie (Highland)',
        coords: [[57.3, -5.5], [57.8, -5.0], [57.6, -4.0], [57.2, -4.5]],
        color: '#5A7165',
        info: '<strong>Clan MacKenzie:</strong> Power in the North. They controlled a vast territory from Kintail to the Black Isle.'
    },
    gordon: {
        name: 'Gordon (North East)',
        coords: [[57.6, -3.5], [57.2, -2.5], [57.0, -3.0], [57.3, -3.8]],
        color: '#6B4226',
        info: '<strong>Clan Gordon:</strong> Dominant in the Northeast, the Gordons were a powerful feudal family whose influence often rivaled that of the Crown.'
    },
    forbes: {
        name: 'Forbes (North East)',
        coords: [[57.4, -3.0], [57.1, -2.8], [57.2, -3.4]],
        color: '#9E5B41',
        info: '<strong>Clan Forbes:</strong> A powerful North East family and the great rivals of the Gordons, with whom they fought a centuries-long feud.'
    },
    leslie: {
        name: 'Leslie (North East)',
        coords: [[57.5, -2.8], [57.3, -2.4], [57.2, -2.9]],
        color: '#4B0082',
        info: '<strong>Clan Leslie:</strong> A noble house holding the Earldom of Rothes, they were a powerful force in Aberdeenshire and Fife.'
    },
    irvine: {
        name: 'Irvine (North East)',
        coords: [[57.1, -2.4], [57.0, -2.2], [56.9, -2.6]],
        color: '#008080',
        info: '<strong>Clan Irvine of Drum:</strong> An ancient family whose lands near Aberdeen were a gift from Robert the Bruce.'
    },
    keith: {
        name: 'Keith (North East)',
        coords: [[56.9, -2.3], [57.1, -2.1], [56.8, -2.5]],
        color: '#B5651D',
        info: '<strong>Clan Keith:</strong> Hereditary Earls Marischal of Scotland, their power was based in the North East, with Dunnottar Castle as their seat.'
    },
    fraser: {
        name: 'Fraser (Highland)',
        coords: [[57.5, -4.8], [57.6, -4.2], [57.3, -4.3], [57.2, -4.9]],
        color: '#465C69',
        info: '<strong>Clan Fraser:</strong> Masters of the Aird, their lands surrounded the Beauly Firth near Inverness, giving them immense influence.'
    },
    grant: {
        name: 'Grant (Highland)',
        coords: [[57.3, -3.6], [57.1, -3.2], [57.4, -3.8]],
        color: '#2E8B57',
        info: '<strong>Clan Grant:</strong> A powerful Speyside clan, their lands centered on the River Spey. Known for their motto "Stand Fast".'
    },
    maclean: {
        name: 'Maclean (Highland)',
        coords: [[56.5, -6.1], [56.3, -5.8], [56.6, -6.3]],
        color: '#C71585',
        info: '<strong>Clan Maclean:</strong> A formidable clan of the Inner Hebrides, with their main seat at Duart Castle on the Isle of Mull.'
    },
    macdougall: {
        name: 'MacDougall (Highland)',
        coords: [[56.45, -5.6], [56.3, -5.4], [56.5, -5.7]],
        color: '#000000',
        info: '<strong>Clan MacDougall:</strong> An ancient clan descended from Somerled, they were Lords of Lorn with their seat at Dunollie Castle.'
    },
    stewart: {
        name: 'Stewart of Appin (Highland)',
        coords: [[56.6, -5.4], [56.7, -5.1], [56.5, -5.1], [56.4, -5.4]],
        color: '#B5A696',
        info: '<strong>Clan Stewart of Appin:</strong> A staunchly Jacobite clan, their lands were situated in a strategic coastal area of Argyll.'
    },
    chattan: {
        name: 'Clan Chattan (Highland)',
        coords: [[57.1, -4.3], [56.9, -3.9], [57.2, -4.5]],
        color: '#800000',
        info: '<strong>Clan Chattan:</strong> A powerful confederation of clans, including Mackintoshes and Macphersons, who controlled Badenoch.'
    },
    mackintosh: {
        name: 'Mackintosh (Highland)',
        coords: [[57.2, -4.2], [57.0, -3.8], [57.3, -4.4]],
        color: '#800000',
        info: '<strong>Clan Mackintosh:</strong> The principal chiefs of the Clan Chattan confederation, their heartland was in Badenoch and Strathnairn.'
    },
    macgregor: {
        name: 'MacGregor (Highland)',
        coords: [[56.4, -4.8], [56.6, -4.5], [56.3, -4.9]],
        color: '#A52A2A',
        info: '<strong>Clan MacGregor:</strong> The "Children of the Mist," a famously persecuted clan whose name was outlawed for nearly 200 years.'
    },
    cameron: {
        name: 'Cameron (Highland)',
        coords: [[56.8, -5.4], [57.0, -4.8], [56.7, -4.9], [56.6, -5.3]],
        color: '#6C5B7B',
        info: '<strong>Clan Cameron:</strong> Fierce warriors from Lochaber, their territory was rugged and mountainous. Staunchly Jacobite.'
    },
    macpherson: {
        name: 'Macpherson (Highland)',
        coords: [[57.0, -4.4], [56.8, -4.0], [57.1, -4.6]],
        color: '#F4A460',
        info: '<strong>Clan Macpherson:</strong> A key part of the Clan Chattan Confederation, their heartland was in Badenoch. Staunch Jacobites.'
    },
    murray: {
        name: 'Murray (Highland/Lowland)',
        coords: [[56.7, -4.2], [56.5, -3.7], [56.8, -3.9]],
        color: '#8A2BE2',
        info: '<strong>Clan Murray:</strong> A ducal family with immense power in Perthshire, straddling the Highland line. The Dukes of Atholl command Europe\'s only private army.'
    },
    lindsay: {
        name: 'Lindsay (Lowland)',
        coords: [[56.6, -2.8], [56.4, -2.5], [56.7, -3.0]],
        color: '#00008B',
        info: '<strong>Clan Lindsay:</strong> An ancient Lowland house, the Earls of Crawford, with power centered in Angus and Fife.'
    },
    douglas: {
        name: 'Douglas (Lowland)',
        coords: [[55.6, -4.0], [55.3, -3.5], [55.7, -3.8]],
        color: '#4682B4',
        info: '<strong>House of Douglas:</strong> An immensely powerful Lowland family whose influence in the south often rivaled that of the monarchy.'
    },
    cunningham: {
        name: 'Cunningham (Lowland)',
        coords: [[55.6, -4.8], [55.4, -4.5], [55.7, -4.9]],
        color: '#DEB887',
        info: '<strong>Clan Cunningham:</strong> A powerful Ayrshire family known for their long and bloody feud with the Montgomeries.'
    },
    scott: {
        name: 'Scott (Border)',
        coords: [[55.5, -3.2], [55.2, -2.8], [55.3, -3.4]],
        color: '#004225',
        info: '<strong>Clan Scott:</strong> One of the most powerful Border Reiver clans, controlling large parts of the turbulent frontier with England.'
    },
     kerr: {
        name: 'Kerr (Border)',
        coords: [[55.45, -2.7], [55.25, -2.4], [55.35, -2.9]],
        color: '#A0522D',
        info: '<strong>Clan Kerr:</strong> A powerful Border Reiver clan known for their left-handed warriors and their feud with the Scotts.'
    },
    armstrong: {
        name: 'Armstrong (Border)',
        coords: [[55.2, -2.8], [55.0, -2.5], [55.1, -3.1]],
        color: '#587445',
        info: '<strong>Clan Armstrong:</strong> A famously lawless and formidable Border Reiver clan, so powerful they were seen as a threat by the Scottish Crown.'
    },
    elliot: {
        name: 'Elliot (Border)',
        coords: [[55.3, -2.9], [55.1, -2.6], [55.2, -3.2]],
        color: '#BDB76B',
        info: '<strong>Clan Elliot:</strong> A tough and resilient Border Reiver clan, known for their skill in the saddle and constant feuding.'
    }
};

const regionData = {
    highlands: {
        coords: [[58.6, -4.0], [57.0, -6.5], [56.2, -5.0], [56.5, -3.5], [57.8, -3.5]],
        color: '#8C4843' // Muted Red
    },
    northeast: {
        coords: [[57.8, -3.5], [57.0, -1.8], [56.8, -2.8], [57.6, -3.5]],
        color: '#6B4226' // Brown
    },
    lowlands: {
        coords: [[56.5, -3.5], [56.2, -5.0], [55.0, -4.5], [55.5, -2.0], [56.3, -2.5]],
        color: '#4682B4' // Steel Blue
    },
    borders: {
        coords: [[55.5, -2.0], [55.0, -4.5], [54.8, -2.0]],
        color: '#004225' // Dark Green
    },
    isles: {
        coords: [[[60.8, -1.5], [60.1, -1.8], [59.8, -1.2], [60.5, -0.8]], [[59.2, -3.5], [58.8, -2.8], [59.3, -3.0]]],
        color: '#FFD700' // Gold
    }
};
