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
    if (activeItem) {
        activeItem.classList.add('active-item');
    }
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
                     ${figure.recipes ? `<button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300" data-tab="recipes">Recipes</button>` : ''}
                 </nav>
             </div>
             <div class="tab-content-container">
                 <div id="lore-content" class="tab-content active">
                     <div class="prose max-w-none text-stone-700 space-y-4">${figure.lore}</div>
                 </div>
                 ${figure.recipes ? `
                 <div id="recipes-content" class="tab-content">
                    ${figure.recipes.map(recipe => `
                        <div class="mb-8">
                            <h3 class="text-2xl font-semibold text-stone-800 mb-2 font-title">${recipe.name}</h3>
                            <p class="mb-6 text-stone-600 italic">"${recipe.link}"</p>
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div class="lg:col-span-1">
                                    <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Ingredients</h4>
                                    <ul class="list-disc list-inside space-y-2 text-stone-600">${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                                </div>
                                <div class="lg:col-span-2">
                                    <h4 class="font-semibold text-stone-700 mb-3 border-b-2 border-yellow-700 pb-2">Method</h4>
                                    <ol class="list-decimal list-inside space-y-3 text-stone-600">${recipe.method.map(s => `<li>${s}</li>`).join('')}</ol>
                                </div>
                            </div>
                        </div>
                    `).join('<hr class="my-8 border-stone-300">')}
                 </div>` : ''}
             </div>
        </div>`;
    updateActiveItem(figureName, 'figure', sidebarEl);
    setupTabs(mainContentEl);
}
