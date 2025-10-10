// Planner Module
function initPlanner() {
    console.log('Initializing planner module...');
    // Add your planner-specific code here
    // This will be called when planner view is activated
}

// Make it globally available
if (typeof window !== 'undefined') {
    window.initPlanner = initPlanner;
}
