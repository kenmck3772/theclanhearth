// Recipes Module
function initRecipes() {
    console.log('Initializing recipes module...');
    // Add your recipes-specific code here
}

// Make it globally available
if (typeof window !== 'undefined') {
    window.initRecipes = initRecipes;
}
