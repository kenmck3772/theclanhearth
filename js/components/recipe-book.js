function initRecipeBook() {
    const recipeGrid = document.getElementById('recipe-grid');
    const recipeIndexList = document.getElementById('recipe-index-list');
    if (!recipeGrid || !recipeIndexList) return;

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
        if (legend.recipes) {
            legend.recipes.forEach(recipe => {
                allRecipes.push({
                    ...recipe,
                    context: `A dish for ${legend.name}`
                });
            });
        }
    });

    recipeGrid.innerHTML = allRecipes.map((recipe, index) => `
        <div class="content-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" data-index="${index}">
            <div class="p-6">
                <h2 class="text-2xl font-bold font-title text-stone-900">${recipe.name}</h2>
                <p class="text-stone-600 mt-2 text-sm h-12 overflow-hidden">${recipe.link}</p>
                <p class="text-xs text-yellow-800 font-semibold mt-3">${recipe.context}</p>
            </div>
        </div>
    `).join('');

    const sortedRecipes = [...allRecipes].sort((a, b) => a.name.localeCompare(b.name));

    recipeIndexList.innerHTML = sortedRecipes.map(recipe => {
        const originalIndex = allRecipes.findIndex(r => r.name === recipe.name && r.context === recipe.context);
        return `<button class="text-stone-700 hover:text-yellow-800 hover:underline transition-colors text-left" data-index="${originalIndex}">${recipe.name}</button>`;
    }).join('');

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
