// Finder Module
function initFinder() {
    console.log('Initializing finder module...');
    // Add your finder-specific code here
}

// Make it globally available
if (typeof window !== 'undefined') {
    window.initFinder = initFinder;
}
