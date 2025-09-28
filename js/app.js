
import { clanData } from "./data/clanData.js";
import { clanTerritories } from "./data/clanTerritories.js";
import { tartanExamples } from "./data/tartanExamples.js";
import { tartanPatterns } from "./data/tartanPatterns.js";

// Original app code (if any)

    document.addEventListener('DOMContentLoaded', function() {
        // --- DATA ---
        
        
        const legendsData = [
             { 
                name: "The Brahan Seer", 
                title: "Coinneach Odhar, The Gaelic Nostradamus", 
                lore: `In the rich tapestry of Highland folklore, few figures loom as large or as tragically as Coinneach Odhar, the Brahan Seer. Said to have lived in the 17th century, he was the Gaelic Nostradamus, a man whose visions, granted to him by a magical "seeing stone," foretold the great triumphs and calamities of Scotland with uncanny accuracy. While his prophecies spanned the breadth of the nation, his story is inextricably, and fatally, intertwined with that of his patrons, the powerful MacKenzies of Seaforth.\n\nCoinneach's gift was not one of comfort. It was a second sight that saw the blood on the heather at Culloden, the coming of the Highland Clearances ("the day of the great sheep"), and the building of the Caledonian Canal. His visions were often couched in poetic, ambiguous language, their true meaning only becoming clear when the terrible events they described came to pass.\n\nThe Seer's downfall came through the pride of the powerful. While Kenneth MacKenzie, the 3rd Earl of Seaforth, was away in Paris, his wife, Countess Isabella, summoned Coinneach and demanded to know of her husband's activities. Reluctantly, the Seer raised his seeing stone and told her the truth: he saw the Earl with another, more beautiful woman. Enraged, the Countess accused him of witchcraft and had him seized. As he was dragged away, Coinneach uttered his final, terrible prophecy—the Doom of the Seaforths. He foretold that the direct line of the MacKenzie chiefs would end with a deaf-mute heir who would see his four sons die before him. He was then executed by being burned in a barrel of tar. Over the next 150 years, his prophecy came true in every chilling detail, cementing his legend as Scotland's greatest prophet.`,
                recipe: {
                    name: "Seer's Brose with a Dram",
                    link: "A simple, fortifying meal for a man of the people. Brose is a traditional, instant porridge made with oats and water, perfect for a seer needing quick sustenance before a long vision. A splash of whisky warms the soul for the chilling truths to come.",
                    ingredients: ["1/2 cup pinhead or coarse oatmeal", "Pinch of salt", "1 tbsp butter (optional)", "1 tbsp honey or to taste", "Boiling water", "1 tbsp single malt whisky"],
                    method: [
                        "Place the oatmeal and salt in a sturdy bowl.",
                        "Add the butter, if using, and the honey.",
                        "Pour over just enough boiling water to cover the oats. Stir vigorously with a spoon or a spurtle.",
                        "Cover the bowl with a plate and let it stand for 5-10 minutes until the water is absorbed and the oats have softened.",
                        "Stir in the whisky just before eating.",
                        "Enjoy this simple, warming meal by the hearth, perhaps contemplating the future."
                    ]
                }
            },
             { 
                name: "Rob Roy MacGregor", 
                title: "The Highland Rogue", 
                lore: `Robert "Rob Roy" MacGregor (1671–1734) was a real historical figure, a cattleman, and a Jacobite from the fiercely independent but persecuted Clan Gregor. His life as an outlaw and his feud with the powerful Duke of Montrose transformed him into a living legend, a figure often romanticized as the "Scottish Robin Hood."\n\nHis life took a dramatic turn in 1712 when a cattle deal, funded by a loan from the Duke of Montrose, went wrong. When his chief drover absconded with the money, Rob Roy defaulted on the loan. The Duke declared him an outlaw, seized his lands, and burned his home. This act of retribution sparked a personal war. Rob Roy began a campaign of raiding the Duke's lands, stealing his cattle and humiliating his factor, Graham of Killearn. The legends of his exploits celebrate his cunning and audacity, portraying him as a charismatic rogue who outwits the powerful and champions the common man. These stories were popularized in his own lifetime and later immortalized by Sir Walter Scott's 1817 novel, *Rob Roy*, transforming the historical cattle-thief into an enduring symbol of Highland defiance.`,
                recipe: {
                    name: "Whisky-Glazed Stolen Beef",
                    link: "A dish fit for an outlaw. This recipe imagines Rob Roy enjoying the fruits of a successful cattle raid, cooking the beef over an open fire in a hidden glen, with a splash of whisky to celebrate his victory over the Duke's men.",
                    ingredients: ["2 lbs beef steak (sirloin or ribeye), thick-cut", "2 tbsp olive oil", "Salt and freshly ground black pepper", "For the glaze: 1/4 cup Scotch whisky, 2 tbsp brown sugar, 1 tbsp soy sauce, 1 clove garlic, minced"],
                    method: [
                        "Rub the steaks with olive oil and season generously with salt and pepper. Let them come to room temperature.",
                        "In a small bowl, whisk together the whisky, brown sugar, soy sauce, and minced garlic to create the glaze.",
                        "Heat a heavy griddle pan or barbecue to a high heat.",
                        "Sear the steaks for 3-4 minutes per side for medium-rare, or to your liking.",
                        "In the last minute of cooking, brush the glaze generously over both sides of the steak, allowing it to caramelize.",
                        "Remove the steaks from the heat and let them rest for 5-10 minutes before slicing.",
                        "Serve with a dram of the same whisky used in the glaze, and toast to the Highland rogue."
                    ]
                }
            },
             { 
                name: "The Marquess of Montrose", 
                title: "The Poet General", 
                lore: `James Graham, 1st Marquess of Montrose (1612-1650), was a figure of dazzling contradictions: a poet and a brilliant, ruthless general; a signatory of the National Covenant who became the King's champion in Scotland. During the Wars of the Three Kingdoms, he waged a year-long, lightning campaign of victories for King Charles I, a series of stunning successes against the odds that became known as the "Year of Miracles." His eventual defeat, betrayal, and execution were as dramatic as his life. He was hanged in Edinburgh, his body dismembered and his head placed on a spike on the Tolbooth. His story is one of romantic, tragic loyalty to a doomed cause.`,
                recipe: {
                    name: "Covenanter's Clapshot",
                    link: "A humble but hearty dish for a soldier on a long march. Clapshot, a mix of mashed potatoes and turnips (neeps), is a staple of the Scottish diet. It's the kind of food that would have fueled the armies on both sides of the civil war Montrose fought in. A simple meal for a complex man.",
                    ingredients: ["2 lbs potatoes, peeled and chopped", "1 lb turnip (rutabaga), peeled and chopped", "4 tbsp butter", "Splash of milk or cream", "Salt and black pepper", "Chives, chopped, for garnish"],
                    method: [
                        "Boil the potatoes and turnips in separate pots of salted water until very tender.",
                        "Drain both vegetables thoroughly and return them to their pots over a low heat for a minute to drive off any excess steam.",
                        "Combine the potatoes and turnips in one large bowl. Mash them together, leaving it slightly coarse, not perfectly smooth.",
                        "Beat in the butter and enough milk or cream to achieve a creamy consistency.",
                        "Season generously with salt and a good deal of black pepper.",
                        "Stir in the chopped chives and serve hot, perhaps alongside sausages or a meat pie."
                    ]
                }
            },
             { 
                name: "Bonnie Prince Charlie", 
                title: "The Young Pretender", 
                lore: `Charles Edward Stuart (1720-1788), known to history as Bonnie Prince Charlie, is the romantic, tragic hero of the final Jacobite Rising of 1745. Landing in Scotland with just seven men, his charisma and the power of the Stuart name were enough to rally many of the Highland clans to his cause. He led his army on a remarkable invasion of England, reaching as far as Derby before the controversial decision to retreat was made.\n\nHis campaign ended in a brutal and decisive defeat at the Battle of Culloden in 1746. The aftermath saw Charles become a fugitive, with a massive bounty on his head. For five months, he wandered the Highlands and Islands, protected by loyal followers like Flora MacDonald, before finally escaping to France. He would spend the rest of his life in exile, a broken man who never set foot in Scotland again. His story is one of initial triumph, heartbreaking failure, and enduring legend.`,
                recipe: {
                    name: "Drambuie and Raspberry Fool",
                    link: "A dessert that tastes of romance and tragedy. Drambuie is a whisky liqueur famously associated with Bonnie Prince Charlie; legend says he gave the secret recipe to a MacKinnon clansman as a reward for his loyalty after Culloden. This simple dessert combines that legendary liqueur with the sharp sweetness of Scottish raspberries.",
                    ingredients: ["1 pint heavy (double) cream", "1 pint fresh raspberries", "3 tbsp Drambuie liqueur", "2 tbsp powdered sugar", "Toasted oatmeal or crushed shortbread for topping"],
                    method: [
                        "In a bowl, gently crush about three-quarters of the raspberries with a fork, leaving some texture.",
                        "In a separate, chilled bowl, whip the heavy cream and powdered sugar until it forms soft peaks.",
                        "Gently fold the Drambuie and the crushed raspberries into the whipped cream, creating a marbled effect.",
                        "Spoon the mixture into serving glasses, layering it with the remaining whole raspberries.",
                        "Chill for at least an hour before serving.",
                        "Top with a sprinkle of toasted oatmeal or crushed shortbread just before serving."
                    ]
                }
            }
        ];

        // --- INITIALIZATION ---
        initNav();
        setupDossierPage({
            sectionId: 'clans-section',
            mainContentId: 'clans-main-content',
            listData: [{ title: 'The Great Clans', data: clanData, type: 'clan', displayFn: displayClan }]
        });
        setupDossierPage({
            sectionId: 'legends-section',
            mainContentId: 'legends-main-content',
            listData: [{ title: 'Legendary Figures', data: legendsData, type: 'figure', displayFn: displayFigure }]
        });
        initTartanBuilder(); 
        initRecipeBook();

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
                    
                    if (targetId.includes('clans') || targetId.includes('legends') || targetId.includes('tartan')) {
                         setTimeout(() => {
                            window.dispatchEvent(new Event('resize'));
                        }, 50);
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

        // --- DOSSIER PAGE SETUP (CLANS & LEGENDS) ---
        function setupDossierPage(config) {
            const sectionEl = document.getElementById(config.sectionId);
            if (!sectionEl) return;

            const mainContentEl = document.getElementById(config.mainContentId);
            const sidebarContentEl = sectionEl.querySelector('.sidebar-scroll');

            sidebarContentEl.innerHTML = ''; // Clear existing content
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

            // Display the first item by default
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
            if (activeItem) {
                activeItem.classList.add('active-item');
            }
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

        function generateTartanHTML(colors) {
            if (!colors || colors.length < 2) return '<div class="w-full h-32 bg-stone-200 flex items-center justify-center rounded-md"><span class="text-stone-500">Tartan not available</span></div>';
            const [c1, c2, c3, c4] = colors;
            const pattern = `
                linear-gradient(90deg, ${c2}80 20%, transparent 20%),
                linear-gradient(${c3 || c2}80 20%, transparent 20%),
                linear-gradient(90deg, ${c4 || c1}40 50%, transparent 50%),
                linear-gradient(${c4 || c1}40 50%, transparent 50%)
            `;
            return `<div class="w-full h-32 rounded-md overflow-hidden" style="background-color: ${c1}; background-image: ${pattern}; background-size: 25px 25px;"></div>`;
        }

        function displayClan(clanName, mainContentEl, sidebarEl) {
            const clan = clanData.find(c => c.name === clanName);
            if (!clan) return;

            mainContentEl.innerHTML = `
                <div class="mb-6 animate-fade-in">
                    <h1 class="text-4xl font-bold text-stone-900 font-title">${clan.name}</h1>
                    <p class="text-lg text-stone-500 mt-1">${clan.gaelicName}</p>
                </div>
                <div class="border-b border-stone-300 mb-6">
                    <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        <button class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="lore">Lore & History</button>
                        <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300" data-tab="symbols">Symbols</button>
                        <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300" data-tab="figures">Figures</button>
                        <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300" data-tab="recipe">Recipe</button>
                    </nav>
                </div>
                <div class="tab-content-container animate-fade-in">
                    <div id="lore-content" class="tab-content active space-y-8">
                        <div>
                            <h3 class="text-2xl font-semibold text-stone-800 mb-4 font-title">Historical Lore</h3>
                            <div class="prose max-w-none text-stone-700 space-y-4">${clan.lore.replace(/\n\n/g, '</p><p>')}</div>
                        </div>
                        <div>
                            <h3 class="text-2xl font-semibold text-stone-800 mb-6 font-title">Chronicle</h3>
                            <div class="relative border-l-2 border-stone-300 ml-10 pl-10">${clan.events.map(e => `<div class="timeline-item mb-8"><p class="font-semibold text-yellow-800">${e.year}</p><p class="text-stone-600">${e.event}</p></div>`).join('')}</div>
                        </div>
                    </div>
                    <div id="symbols-content" class="tab-content">
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                 <h3 class="text-2xl font-semibold text-stone-800 mb-4 font-title">Heraldry & Symbols</h3>
                                 <dl class="space-y-4">
                                     <div class="grid grid-cols-3 gap-4"><dt class="font-semibold text-stone-500">Motto</dt><dd class="col-span-2 text-stone-900">${clan.motto}</dd></div>
                                     <div class="grid grid-cols-3 gap-4"><dt class="font-semibold text-stone-500">Crest</dt><dd class="col-span-2 text-stone-900">${clan.crest}</dd></div>
                                     <div class="grid grid-cols-3 gap-4"><dt class="font-semibold text-stone-500">Plant Badge</dt><dd class="col-span-2 text-stone-900">${clan.plantBadge}</dd></div>
                                     <div class="grid grid-cols-3 gap-4"><dt class="font-semibold text-stone-500">War Cry</dt><dd class="col-span-2 text-stone-900">${clan.warCry}</dd></div>
                                 </dl>
                                 <p class="mt-6 text-sm italic text-stone-500">"${clan.mottoLore}"</p>
                             </div>
                             <div>
                                 <h3 class="text-2xl font-semibold text-stone-800 mb-4 font-title">Tartan</h3>
                                 ${generateTartanHTML(clan.tartan.colors)}
                                 <p class="mt-4 text-stone-600">${clan.tartan.description}</p>
                             </div>
                         </div>
                    </div>
                    <div id="figures-content" class="tab-content">
                        <h3 class="text-2xl font-semibold text-stone-800 mb-4 font-title">Famous Names</h3>
                        <ul class="space-y-4">${clan.famousNames.map(f => `<li class="p-4 bg-stone-50 rounded-lg border border-stone-200"><p class="font-semibold text-stone-800">${f.name}</p><p class="text-stone-600 mt-1">${f.desc}</p></li>`).join('')}</ul>
                    </div>
                    <div id="recipe-content" class="tab-content">
                        <h3 class="text-2xl font-semibold text-stone-800 mb-2 font-title">${clan.recipe.name}</h3>
                        <p class="mb-6 text-stone-600 italic">"${clan.recipe.link}"</p>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div class="lg:col-span-1">
                                <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Ingredients</h4>
                                <ul class="list-disc list-inside space-y-2 text-stone-600">${clan.recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                            </div>
                            <div class="lg:col-span-2">
                                <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Method</h4>
                                <ol class="list-decimal list-inside space-y-3 text-stone-600">${clan.recipe.method.map(s => `<li>${s}</li>`).join('')}</ol>
                            </div>
                        </div>
                    </div>
                </div>`;
            
            updateActiveItem(clanName, 'clan', sidebarEl);
            setupTabs(mainContentEl);
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
                "Royal Stewart": [
                    { color: '#C41E3A', threads: 72 }, { color: '#0072B2', threads: 12 },
                    { color: '#FFFFFF', threads: 4 }, { color: '#FFD700', threads: 12 },
                    { color: '#004225', threads: 18 }, { color: '#36454F', threads: 4 },
                ],
                "Black Watch": [
                    { color: '#1a2d57', threads: 48 }, { color: '#004225', threads: 48 },
                    { color: '#36454F', threads: 24 },
                ],
                "MacLeod of Harris": [
                    { color: '#FFD700', threads: 24 }, { color: '#36454F', threads: 12 },
                    { color: '#C41E3A', threads: 4 },
                ]
            };

            function setup() {
                setupColorPalette();
                populateTartanExamples();
                loadPatternFromURL();
                if (sett.length === 0) {
                    loadDefaultPattern();
                }
                updatePatternList();
                
                setTimeout(() => {
                    resizeCanvas();
                    drawTartan();
                }, 50);

                addStripeBtn.addEventListener('click', addStripe);
                clearPatternBtn.addEventListener('click', clearPattern);
                saveBtn.addEventListener('click', saveTartanAsImage);
                shareBtn.addEventListener('click', shareTartanLink);
                threadCountInput.addEventListener('input', previewTartan);

                window.addEventListener('resize', () => { 
                    if(document.getElementById('tartan-designer-section').classList.contains('active')) { 
                        resizeCanvas(); 
                        drawTartan(); 
                    } 
                });
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

                    card.addEventListener('click', () => {
                        loadExampleTartan(name);
                    });
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
                        previewTartan(); // Live preview on color change
                    });
                    colorPalette.appendChild(colorEl);
                });
            }

            function updatePatternList() {
                if (!patternList) return;
                if (sett.length === 0) {
                    patternList.innerHTML = '<p class="text-stone-500 text-center">Your stripes will appear here...</p>';
                    return;
                }
                patternList.innerHTML = '';
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
            
            function showMessage(text, isError = false) {
                const messageBox = document.getElementById('message-box');
                const messageText = document.getElementById('message-text');
                messageText.textContent = text;
                messageBox.className = 'fixed top-20 right-5 py-2 px-4 rounded-lg shadow-lg transition-all duration-300 z-50';
                messageBox.classList.add(isError ? 'bg-red-600' : 'bg-green-600', 'text-white', 'opacity-100');
                
                setTimeout(() => {
                    messageBox.classList.remove('opacity-100');
                    messageBox.classList.add('opacity-0');
                }, 3000);
            }

            function loadDefaultPattern() {
                loadExampleTartan("Royal Stewart");
            }
            
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
                if (!threads || threads < 2) {
                    drawTartan();
                    return;
                }
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

            // Create a unified list of all recipes from both clans and legends
            const allRecipes = [];
            clanData.forEach(clan => {
                if (clan.recipe) {
                    allRecipes.push({
                        ...clan.recipe,
                        context: `From the lands of ${clan.name}`
                    });
                }
            });
            legendsData.forEach(legend => {
                if (legend.recipe) {
                    allRecipes.push({
                        ...legend.recipe,
                        context: `A dish for ${legend.name}`
                    });
                }
            });

            // Populate the main recipe grid
            recipeGrid.innerHTML = allRecipes.map((recipe, index) => `
                <div class="content-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" data-index="${index}">
                    <div class="p-6">
                        <h2 class="text-2xl font-bold font-title text-stone-900">${recipe.name}</h2>
                        <p class="text-stone-600 mt-2 text-sm h-12 overflow-hidden">${recipe.link}</p>
                        <p class="text-xs text-yellow-800 font-semibold mt-3">${recipe.context}</p>
                    </div>
                </div>
            `).join('');

            // Sort recipes alphabetically for the glossary
            const sortedRecipes = [...allRecipes].sort((a, b) => a.name.localeCompare(b.name));

            // Populate the glossary
            recipeIndexList.innerHTML = sortedRecipes.map(recipe => {
                // Find the original index to link to the correct data in the unsorted 'allRecipes' array
                const originalIndex = allRecipes.findIndex(r => r.name === recipe.name && r.context === recipe.context);
                return `<button class="text-stone-700 hover:text-yellow-800 hover:underline transition-colors text-left" data-index="${originalIndex}">${recipe.name}</button>`;
            }).join('');

            // Shared click handler for both grid and glossary
            const handleRecipeClick = (index) => {
                const recipe = allRecipes[index];
                if (recipe) {
                    openGenericModal(recipe);
                }
            };

            recipeGrid.addEventListener('click', e => {
                const card = e.target.closest('.content-card');
                if (card && card.dataset.index) {
                    handleRecipeClick(card.dataset.index);
                }
            });

            recipeIndexList.addEventListener('click', e => {
                const button = e.target.closest('button');
                if (button && button.dataset.index) {
                    handleRecipeClick(button.dataset.index);
                }
            });
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
            
            if (item.title) { // For Legends
                 contentHTML += `<p class="text-md text-stone-600 mb-6 italic">${item.title}</p>`;
            }
            if (item.link) { // For Recipes
                 contentHTML += `<p class="text-md text-stone-600 mb-6 italic">"${item.link}"</p>`;
            }

            if(item.lore) { // For Legends
                contentHTML += `<div class="prose max-w-none text-stone-700 space-y-4 mb-8">${item.lore.replace(/\n\n/g, '</p><p>')}</div>`;
            }

            if(item.ingredients && item.method) { // For Recipes
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
            } else if (item.recipe) { // For Legends in the modal
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
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'animate-fade-in');
            
            modal.querySelector('#close-modal').addEventListener('click', () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex', 'animate-fade-in');
            });
        }
    });
    

// __CLAN_HEARTH_NAV_LOCK__
(function() {
  const CANON = ["home","clan-finder","tartan-designer","recipes","myths","map","about"];
  const ALIAS = { clans: "clan-finder", legends: "myths" };
  const normalize = (id) => ALIAS[id] || id;
  const SELECTORS = {
    "home": ["#home","#hero","section[id*='home' i]","main > section:first-of-type"],
    "clan-finder": ["#clan-finder","#clanFinder","#clans","section[id*='clan' i]"],
    "tartan-designer": ["#tartan-designer","#tartanDesigner","section[id*='tartan' i]"],
    "recipes": ["#recipes","section[id*='recipe' i]"],
    "myths": ["#myths","#legends","section[id*='legend' i]","section[id*='myth' i]"],
    "map": ["#clan-map","#map","section[id*='map' i]"],
    "about": ["#about","section[id*='about' i]"]
  };

  const qs  = (s) => document.querySelector(s);
  const qsa = (s) => Array.from(document.querySelectorAll(s));
  const ensureDataSection = (id, el) => el && el.setAttribute("data-section", id);

  function wireSections(){
    CANON.forEach(id => ensureDataSection(id, SELECTORS[id].map(qs).find(Boolean)));
    if (!qsa('[data-section="home"]').length) {
      const hero = qs("#hero") || qsa("main section, body > section")[0];
      if (hero) ensureDataSection("home", hero);
    }
  }
  const hideAll = () => qsa("[data-section]").forEach(s => s.classList.add("hidden"));
  function show(id){
    qs(`[data-section="${id}"]`)?.classList.remove("hidden");
    qsa("#topNav .nav-link, #topNav [data-nav]").forEach(a => a.classList.remove("text-amber-400","font-semibold"));
    qs(`#topNav [data-nav="${id}"]`)?.classList.add("text-amber-400","font-semibold");
  }
  function initialSection(){
    const raw = location.hash.replace("#","");
    const id = normalize(raw);
    return CANON.includes(id) ? id : "home";
  }

  document.addEventListener("DOMContentLoaded", () => { wireSections(); hideAll(); show(initialSection()); });
  window.addEventListener("hashchange", () => {
    const id = normalize(location.hash.replace("#",""));
    if (!id) return;
    if (CANON.includes(id)) { hideAll(); show(id); }
  });
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]"); if (!nav) return;
    e.preventDefault();
    const id = normalize(nav.dataset.nav);
    history.replaceState(null, "", "#" + id);
    hideAll(); show(id);
    document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

// __CLAN_HEARTH_ENHANCEMENTS__
(function() {
  document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("hero");
    if (hero) {
      const hasBg = getComputedStyle(hero).backgroundImage && getComputedStyle(hero).backgroundImage !== "none";
      if (!hasBg) {
        hero.style.backgroundImage = "url('./assets/images/castlehome.jpg')";
        hero.classList.add("bg-cover","bg-center","bg-no-repeat","relative");
        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-black/40 pointer-events-none";
        hero.prepend(overlay);
      }
    }
    const logoEl = document.querySelector("#siteLogo") ||
                   document.querySelector("header img[alt*='Clan Hearth' i]") ||
                   document.querySelector("header img");
    if (logoEl) {
      logoEl.src = "./assets/images/hearth-crest.png";
      if (!logoEl.alt) logoEl.alt = "The Clan Hearth";
      logoEl.referrerPolicy = "no-referrer";
    }
  });
})();

// __CLAN_HEARTH_MAP__
(function() {
  function initMap() {
    if (window.__clanMap) return;
    const el = document.getElementById("clanMap");
    if (!el || typeof L === "undefined") return;
    const map = L.map(el).setView([56.818, -4.182], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    [{ name: "Edinburgh Castle", coords: [55.9486, -3.1999] },{ name: "Stirling Castle", coords: [56.1239, -3.9469] },{ name: "Eilean Donan", coords: [57.2740, -5.5169] }]
      .forEach(s => L.marker(s.coords).addTo(map).bindPopup(s.name));
    window.__clanMap = map;
  }
  document.addEventListener("DOMContentLoaded", () => { const s = document.querySelector('[data-section="map"]'); if (s && !s.classList.contains("hidden")) initMap(); });
  window.addEventListener("hashchange", () => { if (location.hash.replace("#","") === "map") initMap(); });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-nav='map']")) setTimeout(initMap, 0); });
})();

// __CLAN_HEARTH_TARTAN__
(function() {
  function setPreview(src) {
    const img = document.getElementById("tartanPreview"); if (img) img.src = src;
    const a = document.getElementById("btnDownloadTartan"); if (a) a.href = src;
  }
  function cycle() {
    const img = document.getElementById("tartanPreview"); if (!img) return;
    const arr = tartanExamples.map(t => t.image);
    const next = arr[(arr.indexOf(img.src.split('/').slice(-2).join('/')) + 1 + arr.length) % arr.length];
    setPreview(next);
  }
  function drawCanvasBasic() {
    const c = document.getElementById("tartanCanvas"); if (!c) return;
    const ctx = c.getContext("2d"); const w = c.width, h = c.height;
    ctx.fillStyle = "#7a2e2e"; ctx.fillRect(0,0,w,h);
    for (let x=0; x<w; x+=40) { ctx.fillStyle = "#eacb8a"; ctx.fillRect(x,0,10,h); ctx.fillStyle = "#1e5028"; ctx.fillRect(x+20,0,4,h); }
    for (let y=0; y<h; y+=40) { ctx.fillStyle = "#eacb8a"; ctx.fillRect(0,y,w,10); ctx.fillStyle = "#1e5028"; ctx.fillRect(0,y+20,w,4); }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("tartanPreview");
    if (img && (!img.getAttribute("src") || img.getAttribute("src")==="")) setPreview("./assets/images/tartans/tartan-placeholder.png");
    document.getElementById("btnUsePlaceholder")?.addEventListener("click", () => setPreview("./assets/images/tartans/tartan-placeholder.png"));
    document.getElementById("btnCycleTartan")?.addEventListener("click", cycle);
    drawCanvasBasic();
  });
})();

// __CLAN_HEARTH_TARTAN_ENGINE__
(function() {
  function buildStripePlan(sett) { const total = sett.reduce((s,[,w]) => s+w,0); let acc=0; return { total, plan: sett.map(([code,w]) => ({code,start:(acc),width:w,end:(acc+=w)})) }; }
  function drawTartanToCanvas(canvas, patternName, scale=8) {
    const ctx = canvas.getContext("2d"); const p = tartanPatterns[patternName]; if (!p) return;
    const { total, plan } = buildStripePlan(p.sett); const W=canvas.width,H=canvas.height; ctx.clearRect(0,0,W,H);
    for (let x=0;x<W;x++) { const pos=(x/scale)%total; const seg=plan.find(s=>pos>=s.start&&pos<s.end)||plan[plan.length-1]; ctx.fillStyle=p.palette[seg.code]||"#444"; ctx.fillRect(x,0,1,H);}
    ctx.globalAlpha=0.5;
    for (let y=0;y<H;y++) { const pos=(y/scale)%total; const seg=plan.find(s=>pos>=s.start&&pos<s.end)||plan[plan.length-1]; ctx.fillStyle=p.palette[seg.code]||"#444"; ctx.fillRect(0,y,W,1);}
    ctx.globalAlpha=1;
  }
  function applySelectedTartan() {
    const sel=document.getElementById("tartanSelect"); const name=sel?.value; const c=document.getElementById("tartanCanvas"); if (!name||!c) return;
    drawTartanToCanvas(c,name,8); const url=c.toDataURL("image/png"); const prev=document.getElementById("tartanPreview"); if(prev) prev.src=url; const a=document.getElementById("btnDownloadTartan"); if(a) a.href=url;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const sel=document.getElementById("tartanSelect"); if (sel) sel.innerHTML=Object.keys(tartanPatterns).map(n=>`<option value="${n}">${n}</option>`).join("");
    document.getElementById("btnApplyTartan")?.addEventListener("click", applySelectedTartan);
  });
  window.__drawTartan=(name,scale=8)=>{ const c=document.getElementById("tartanCanvas"); drawTartanToCanvas(c,name,scale); };
})();
