document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // App state
    const appState = {
        currentView: 'home',
        maps: {},
        tripItinerary: [],
        favorites: JSON.parse(localStorage.getItem('favorites')) || []
    };
    
    // Initialize the application
    function initApp() {
        initNavigation();
        initEventListeners();
        showView('home');
    }
    
    // Navigation initialization
    function initNavigation() {
        // Handle navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.dataset.target;
                showView(target);
            });
        });
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            const isOpen = menu.classList.toggle('menu-open');
            document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', isOpen);
        });
        
        // Search toggle
        document.getElementById('search-toggle').addEventListener('click', () => {
            document.getElementById('search-bar').classList.toggle('hidden');
        });
    }
    
    // Show a specific view
    function showView(viewName) {
        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show the requested section
        const targetSection = document.getElementById(`${viewName}-section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            appState.currentView = viewName;
            updateBreadcrumb(viewName);
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelectorAll(`.nav-link[data-target="${viewName}"]`).forEach(link => {
            link.classList.add('active');
        });
        
        // Initialize view-specific functionality
        initializeView(viewName);
    }
    
    // Initialize view-specific functionality
    function initializeView(viewName) {
        switch(viewName) {
            case 'planner':
                initPlanner();
                break;
            case 'clans':
                initClans();
                break;
            case 'finder':
                initFinder();
                break;
            case 'tartan-designer':
                initTartanDesigner();
                break;
            case 'recipes':
                initRecipes();
                break;
            case 'legends':
                initLegends();
                break;
        }
    }
    
    // Update breadcrumb navigation
    function updateBreadcrumb(viewName) {
        const breadcrumbNames = {
            'home': 'Home',
            'clans': 'Clans',
            'planner': 'Trip Planner',
            'finder': 'Clan Finder & Creator',
            'legends': 'Legends',
            'recipes': 'Recipes',
            'tartan-designer': 'Tartan Designer'
        };
        
        const breadcrumb = document.getElementById('breadcrumb');
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');
        
        if (viewName === 'home') {
            breadcrumb.classList.add('hidden');
        } else {
            breadcrumbCurrent.textContent = breadcrumbNames[viewName] || viewName;
            breadcrumb.classList.remove('hidden');
        }
    }
    
    // Initialize event listeners
    function initEventListeners() {
        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Modal close functionality
        document.getElementById('generic-modal').addEventListener('click', (e) => {
            if (e.target.id === 'generic-modal') {
                closeModal();
            }
        });
        
        // Region buttons
        document.getElementById('region-buttons').addEventListener('click', (e) => {
            const button = e.target.closest('.region-card');
            if (button) {
                const region = button.dataset.region;
                showView('planner');
                // Here you would center the map on the selected region
            }
        });
    }
    
    // Modal functions
    function showModal(content) {
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = `
            <div class="relative p-6 sm:p-8">
                <button class="modal-close absolute top-4 right-4 text-stone-600 hover:text-stone-900 text-3xl font-bold" aria-label="Close modal">&times;</button>
                ${content}
            </div>
        `;
        document.getElementById('generic-modal').classList.remove('hidden');
        document.getElementById('generic-modal').classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Close button event
        document.querySelector('.modal-close').addEventListener('click', closeModal);
    }
    
    function closeModal() {
        document.getElementById('generic-modal').classList.add('hidden');
        document.getElementById('generic-modal').classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
    
    // Toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        const toastIcon = document.getElementById('toast-icon');
        
        toastMessage.textContent = message;
        toast.className = 'toast';
        toast.classList.add(type);
        
        if (type === 'success') {
            toastIcon.className = 'fas fa-check-circle';
        } else if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle';
        } else {
            toastIcon.className = 'fas fa-info-circle';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // View initialization functions (to be implemented in separate files)
    function initPlanner() {
        // Planner initialization code
        console.log('Initializing planner...');
    }
    
    function initClans() {
        // Clans initialization code
        console.log('Initializing clans...');
    }
    
    function initFinder() {
        // Finder initialization code
        console.log('Initializing finder...');
    }
    
    function initTartanDesigner() {
        // Tartan designer initialization code
        console.log('Initializing tartan designer...');
    }
    
    function initRecipes() {
        // Recipes initialization code
        console.log('Initializing recipes...');
    }
    
    function initLegends() {
        // Legends initialization code
        console.log('Initializing legends...');
    }
    
    // Initialize the app
    initApp();
});
