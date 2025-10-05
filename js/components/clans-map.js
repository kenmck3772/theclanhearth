<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v15 - Well-Tegra Data Solutions | Integrated Well Delivery Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono&display=swap" rel="stylesheet">
    <style>
        /* --- Base & Theme Setup --- */
        body { font-family: 'Inter', sans-serif; font-weight: 500; }
        h1, h2, h3, h4, h5, h6 { font-weight: 800; } /* Bolder headings */
        .theme-light { background-color: #f8fafc; }
        .theme-dark { background-color: #0f172a; color: #e2e8f0; }

        /* --- Watermark Background --- */
        #main-content {
            position: relative;
            z-index: 1;
        }
        .theme-light #main-content::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('https://welltegra.network/assets/watermark.png');
            background-repeat: repeat;
            background-position: center;
            background-size: 350px;
            opacity: 0.02;
            z-index: -1;
            pointer-events: none;
        }
        .theme-dark #main-content::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('https://welltegra.network/assets/watermark.png');
            background-repeat: repeat;
            background-position: center;
            background-size: 350px;
            opacity: 0.04;
            filter: invert(1);
            z-index: -1;
            pointer-events: none;
        }

        .gradient-text {
            background: linear-gradient(to right, #60a5fa, #5eead4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* --- Light & Dark Theme Specific Styles --- */
        .theme-light .light-card { background-color: white; }
        .theme-dark .light-card { background-color: #1e293b; border: 1px solid #334155; }
        .theme-light .header { background-color: white; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); }
        .theme-dark .header { background-color: #0f172a; border-bottom: 1px solid #1e293b; }
        .theme-light .nav-link { color: #475569; }
        .theme-dark .nav-link { color: #94a3b8; }
        .theme-light .nav-link.active { color: #2563eb; border-bottom-color: #2563eb; }
        .theme-dark .nav-link.active { color: #60a5fa; border-bottom-color: #60a5fa; }
        
        .theme-light h1, .theme-light h2, .theme-light h3, .theme-light h4 { color: #111827; } 
        .theme-dark h1, .theme-dark h2, .theme-dark h3, .theme-dark h4 { color: #f8fafc; }
        
        /* Set base paragraph color to black for light theme for max contrast */
        .theme-light p, .theme-light span, .theme-light label, .theme-light td, .theme-light li { color: #1f2937; line-height: 1.65; }
        .theme-dark p, .theme-dark span, .theme-dark label, .theme-dark td, .theme-dark li { color: #e2e8f0; line-height: 1.65; }

        .theme-light .table-header { background-color: #f1f5f9; }
        .theme-dark .table-header { background-color: #334155; }
        .theme-light .table-row-alt { background-color: #f8fafc; }
        .theme-dark .table-row-alt { background-color: #1e293b/50; }
        .theme-light .modal-container { background-color: white; }
        .theme-dark .modal-container { background-color: #1e293b; }
        .theme-light .modal-tab { color: #6b7280; }
        .theme-dark .modal-tab { color: #9ca3af; }
        .theme-light .modal-tab.active { color: #2563eb; border-bottom-color: #2563eb; }
        .theme-dark .modal-tab.active { color: #60a5fa; border-bottom-color: #60a5fa; }
        .theme-light input, .theme-light textarea { background-color: white; border-color: #d1d5db; color: #111827; }
        .theme-dark input, .theme-dark textarea { background-color: #334155; border-color: #4b5563; color: #f3f4f6; }
        .theme-light .objective-label, .theme-light .problem-label { border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s ease-in-out; }
        .theme-dark .objective-label, .theme-dark .problem-label { border: 1px solid #475569; cursor: pointer; transition: all 0.2s ease-in-out; }
        .theme-light input[type="radio"]:checked + .objective-label, .theme-light input[type="radio"]:checked + .problem-label { border-color: #2563eb; background-color: #eff6ff; }
        .theme-dark input[type="radio"]:checked + .objective-label, .theme-dark input[type="radio"]:checked + .problem-label { border-color: #60a5fa; background-color: #0f172a; }
        .theme-light .ai-recommendation-card.selected { border-color: #2563eb; background-color: #eff6ff; }
        .theme-dark .ai-recommendation-card.selected { border-color: #60a5fa; background-color: #0f172a; }
        .theme-light .bg-gray-50 { background-color: #f9fafb; }
        .theme-dark .bg-gray-50 { background-color: #334155; }
        .theme-light #theme-icon-dark { display: none; }
        .theme-light #theme-icon-light { display: block; }
        .theme-dark #theme-icon-dark { display: block; }
        .theme-dark #theme-icon-light { display: none; }

        /* --- Global Component Styles --- */
        .planner-card { transition: all 0.2s ease-in-out; }
        .planner-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
        .planner-card.selected { border-color: #2563eb; transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); border-width: 2px; }
        .planner-card[data-well-id="W666"].selected { border-color: #16a34a; box-shadow: 0 10px 15px -3px rgb(22 163 74 / 0.2), 0 4px 6px -4px rgb(22 163 74 / 0.2); }
        .step-indicator { transition: background-color 0.3s, color 0.3s; }
        .step-indicator.active { background-color: #2563eb; color: white; }
        .step-indicator.completed { background-color: #1d4ed8; color: white; }
        .risk-low { background-color: #dcfce7; color: #166534; }
        .risk-medium { background-color: #fef9c3; color: #854d0e; }
        .risk-high { background-color: #fee2e2; color: #991b1b; }
        .status-available, .status-active-underperforming, .status-active-lowinjectivity, .status-approved, .status-mustered, .status-passed, .status-active-restoredproduction { background-color: #dcfce7; color: #166534; }
        .status-maintenance, .status-pending, .status-intransit { background-color: #fef9c3; color: #854d0e; }
        .status-unavailable, .status-onjob, .status-expired, .status-unaccounted, .status-failed, .status-drilling-criticalsection, .status-shut-in, .status-shut-in-wellintegrityissues, .status-pacandidate { background-color: #fee2e2; color: #991b1b; }
        .status-onboard { background-color: #cffafe; color: #0e7490; }

        /* --- Performer View Styles --- */
        .performer-view .dashboard-grid { display: grid; grid-template-columns: 2fr 5fr 3fr; gap: 1.5rem; height: calc(100vh - 80px); }
        .performer-view .kpi-card { background-color: #334155; border-radius: 0.5rem; border: 1px solid #475569; color: #f8fafc; }
        .performer-view .procedure-step { border-left: 4px solid #475569; transition: all 0.3s; cursor: pointer; }
        .performer-view .procedure-step.active { background-color: rgba(96, 165, 250, 0.1); border-left-color: #60a5fa; }
        .performer-view .procedure-step.completed { border-left-color: #64748b; opacity: 0.6; }
        .performer-view .log-entry { border-bottom: 1px solid #475569; }
        .performer-view .alarm, .emergency-header { animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        
        /* --- General UI Transitions & Styles --- */
        .nav-link { transition: color 0.3s, border-bottom-color 0.3s; border-bottom: 2px solid transparent; padding: 0.5rem 0.25rem; font-size: 0.875rem; font-weight: 500; cursor: pointer; }
        .ai-recommendation-card { border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s ease-in-out; }
        .ai-recommendation-card:hover { border-color: #2563eb; transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .ai-recommendation-card.selected { border-width: 2px; }
        .modal-overlay { transition: opacity 0.3s ease; }
        .modal-container { transition: transform 0.3s ease; }
        .schematic-label { font-family: 'Roboto Mono', monospace; font-size: 10px; fill: #4b5563; }
        .schematic-depth-marker { font-size: 9px; font-family: 'Roboto Mono', monospace; fill: #1d4ed8; }
        .modal-tab { border-bottom: 2px solid transparent; }
        
        /* --- Home Page Specific Styles --- */
        .hero-section { position: relative; overflow: hidden; }
        #hero-video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            z-index: -100;
            transform: translateX(-50%) translateY(-50%);
            background-size: cover;
        }
        .hero-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(15, 23, 42, 0.8); /* Darker overlay for better contrast */
            z-index: -50;
        }
        .hero-section h1 { text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); }
        .hero-section p { text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5); }

        .section-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.025em; }
        .accent-text { color: #2563eb; }
        .dark .accent-text { color: #60a5fa; }
        .roi-calculator { background-color: #f0f9ff; }
        .dark .roi-calculator { background-color: #1e293b; }
        .chart-container { position: relative; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; height: 350px; max-height: 400px; }
        @media (min-width: 768px) { .chart-container { height: 400px; } }

        /* --- FAQ & About Page Styles --- */
        .faq-question {
            width: 100%;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            cursor: pointer;
            border-bottom: 1px solid #e5e7eb;
        }
        .theme-dark .faq-question { border-bottom-color: #374151; }
        .faq-answer {
            display: none;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .theme-dark .faq-answer { border-bottom-color: #374151; }
        .faq-answer p, .faq-answer ul { margin-bottom: 1rem; }
        .faq-answer li { margin-left: 1.5rem; list-style-type: disc; }
        .faq-question.active + .faq-answer {
            display: block;
        }
        .faq-question .icon {
            transition: transform 0.3s ease;
        }
        .faq-question.active .icon {
            transform: rotate(180deg);
        }
        .about-view h3, .about-view h4 {
             margin-bottom: 0.75rem;
        }

    </style>
</head>
<body class="theme-dark">

<div id="welcome-screen" class="fixed inset-0 bg-slate-900 flex items-center justify-center z-50 transition-opacity duration-500">
    <div class="text-center">
        <img src="https://welltegra.network/assets/logo.png" alt="Well-Tegra Data Solutions Logo" class="h-24 w-auto mx-auto mb-8 animate-pulse">
        <div class="bg-slate-800 p-8 rounded-lg shadow-2xl w-80">
            <h2 class="text-2xl font-bold text-white mb-6">Platform Login</h2>
            <div class="space-y-4">
                <input type="text" id="username" placeholder="Username" value="demo@welltegra.com" class="w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <input type="password" id="password" placeholder="Password" value="password" class="w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
            </div>
            <button id="login-btn" class="mt-6 w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-md transition-colors">
                Login
            </button>
        </div>
    </div>
</div>

<div id="app-container" class="min-h-screen flex-col hidden">
    <!-- Header -->
    <header id="app-header" class="header sticky top-0 z-30 transition-colors">
        <div class="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src="https://welltegra.network/assets/logo.png" alt="Well-Tegra Data Solutions Logo" class="h-12 w-auto mr-3" onerror="this.onerror=null;this.src='https://placehold.co/100x100/0f172a/ffffff?text=Logo';">
                    <h1 id="header-title" class="text-xl font-bold hidden md:block">Well-Tegra Data Solutions</h1>
                </div>
                <div id="header-nav" class="flex-1 flex items-center justify-center space-x-1 md:space-x-4">
                    <a id="home-nav-link" title="Return to the Home Page" class="nav-link active flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <span>Home</span>
                    </a>
                    <a id="planner-nav-link" title="Go to the Well Intervention Planner" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                        <span>Planner</span>
                    </a>
                    <a id="logistics-nav-link" title="Manage Equipment and Personnel" class="nav-link flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4h-8v-4h-4V9Z"/><path d="M18 18h-1.3c-.5 0-.9-.3-1.1-.7l-2.6-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                        <span>Logistics</span>
                    </a>
                    <a id="commercial-nav-link" title="View Financial Dashboards" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        <span>Commercial</span>
                    </a>
                    <a id="hse-nav-link" title="View Health, Safety, and Environment Data" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>HSE & Risk</span>
                    </a>
                    <a id="pob-nav-link" title="View Personnel on Board and Emergency Response" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span>POB & ER</span>
                    </a>
                    <a id="whitepaper-nav-link" title="Download the White Paper" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        <span>White Paper</span>
                    </a>
                     <a id="faq-nav-link" title="Frequently Asked Questions" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                        <span>FAQ</span>
                    </a>
                    <a id="about-nav-link" title="About the Founder" class="nav-link flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        <span>About</span>
                    </a>
                </div>
                <div id="header-details" class="flex items-center space-x-4">
                    <button id="theme-toggle-btn" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                        <svg id="theme-icon-light" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        <svg id="theme-icon-dark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Area -->
    <main id="main-content" class="flex-1">
        <!-- Home View -->
        <div id="home-view" class="view-container">
            <section class="hero-section py-20 px-4 relative">
                <video autoplay loop muted playsinline id="hero-video" poster="https://welltegra.network/assets/thumbnail.png">
                    <source src="https://welltegra.network/assets/thumbnail.mp4" type="video/mp4">
                </video>
                <div class="hero-overlay"></div>
                <div class="max-w-4xl mx-auto text-center relative z-10">
                    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white">From Data Chaos to Predictive Clarity.</h1>
                    <p class="mt-6 text-lg md:text-xl text-slate-100">The oil and gas industry loses over $38 million per asset annually to unplanned downtime. Your engineers spend more than 50% of their time wrangling data. The cause? A disconnected digital ecosystem.</p>
                    <p class="mt-4 text-lg md:text-xl font-semibold text-white">Well-Tegra: Engineering Insight, Amplified by Data.</p>
                </div>
            </section>
            <section class="py-20 px-4 bg-white dark:bg-transparent">
                <div class="max-w-7xl mx-auto relative z-10">
                    <div class="text-center">
                        <h2 class="section-title">Are You Paying the Hidden Taxes of Inefficiency?</h2>
                        <p class="mt-4 text-lg">Your operations are being taxed by disconnected workflows you can't see on a balance sheet.</p>
                    </div>
                    <div class="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="feature-card light-card p-6 rounded-lg shadow"><h3 class="text-xl font-bold">The Data Wrangling Tax</h3><p class="mt-2">Unlock Your Data. Your most valuable assets—your engineers—are forced to act as data clerks, wasting countless hours hunting for information in emails, correcting spreadsheet errors, and re-entering data from PDFs.</p></div>
                        <div class="feature-card light-card p-6 rounded-lg shadow"><h3 class="text-xl font-bold">The NPT Tax</h3><p class="mt-2">Every moment of Non-Productive Time is a direct hit to your bottom line. Plans based on poor data lead to equipment failures, procedural errors, and costly downtime.</p></div>
                        <div class="feature-card light-card p-6 rounded-lg shadow"><h3 class="text-xl font-bold">The Collaboration Tax</h3><p class="mt-2">The critical gap between your team and service partners is where value is lost. Static PDF handoffs create slow, error-prone workflows that prevent true, real-time collaboration.</p></div>
                        <div class="feature-card light-card p-6 rounded-lg shadow"><h3 class="text-xl font-bold">The Energy & Emissions Tax</h3><p class="mt-2">Inefficient operations don't just waste money—they waste energy. Extended run times and unnecessary flaring contribute to higher operational costs and a larger carbon footprint.</p></div>
                    </div>
                </div>
            </section>
            <section class="py-20 px-4 roi-calculator dark:bg-slate-900/50">
                <div class="max-w-6xl mx-auto relative z-10">
                    <div class="text-center"><h2 class="section-title">The Platform That Pays for Itself</h2><p class="mt-4 text-lg">Unlock Your Reservoir's True Potential. Use our interactive calculator to estimate your potential annual savings with Well-Tegra.</p></div>
                    <div class="mt-12 grid lg:grid-cols-2 gap-12 items-center">
                        <div class="light-card p-8 rounded-lg shadow-lg">
                            <div class="space-y-6">
                                <div><label for="engineerCount" class="font-semibold">Number of Well Engineers</label><div class="flex items-center space-x-4"><input type="range" id="engineerCount" min="5" max="100" value="20" class="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"><span id="engineerCountValue" class="font-bold text-lg w-12 text-center">20</span></div></div>
                                <div><label for="nptReduction" class="font-semibold">Projected NPT Reduction</label><div class="flex items-center space-x-4"><input type="range" id="nptReduction" min="5" max="40" value="20" class="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"><span id="nptReductionValue" class="font-bold text-lg w-12 text-center">20%</span></div></div>
                                <div><label for="timeSavings" class="font-semibold">Engineering Time Reclaimed</label><div class="flex items-center space-x-4"><input type="range" id="timeSavings" min="10" max="50" value="40" class="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"><span id="timeSavingsValue" class="font-bold text-lg w-12 text-center">40%</span></div></div>
                            </div>
                            <div class="mt-8 pt-6 border-t border-slate-300 dark:border-slate-600 text-center"><p class="text-xl font-semibold">Total Estimated Annual Savings:</p><p id="totalSavings" class="text-5xl font-extrabold accent-text mt-2">$2,168,000</p></div>
                        </div>
                        <div class="chart-container"><canvas id="savingsChart"></canvas></div>
                    </div>
                </div>
            </section>
        </div>
        
        <div id="planner-view" class="view-container hidden max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold tracking-tight">Well Intervention Planner</h2>
                <p class="mt-2 max-w-2xl mx-auto text-lg">The Single Source of Truth for Your Entire Well Portfolio.</p>
            </div>
            <div class="mb-12 flex items-center justify-center space-x-4"><div id="step-1-indicator" class="step-indicator w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div><div class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div><div id="step-2-indicator" class="step-indicator bg-gray-200 dark:bg-gray-700 text-gray-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div><div class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div><div id="step-3-indicator" class="step-indicator bg-gray-200 dark:bg-gray-700 text-gray-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div></div>
            <section id="step-1">
                <div class="text-center">
                    <h3 class="text-2xl font-bold tracking-tight">Step 1: Select a Well</h3>
                    <p class="mt-4 max-w-3xl mx-auto text-sm">Welcome to the Well Intervention Planner. This process begins by selecting a candidate well from the available assets. Each card represents a well with key status indicators and known issues. Click 'View Details' to explore a well's full history, including past operations, schematics, and legacy reports. Once you've identified a suitable candidate, click on the card to select it and proceed to the next step.</p>
                </div>
                <div id="well-selection-grid" class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"></div>
            </section>
            <section id="step-2" class="hidden">
                <div class="text-center">
                    <h3 class="text-2xl font-bold tracking-tight">Step 2: Define Intervention Plan</h3>
                    <p class="mt-4 max-w-3xl mx-auto text-lg">Now that you've selected a well, it's time to define the objective of the intervention. You can either use the Manual Planning mode to select a primary objective directly, or switch to the AI Advisor. The AI will analyze the well's known problems and historical data to recommend the most effective intervention strategies, complete with confidence scores and projected outcomes. Your choice here will determine the baseline procedure and resources for the plan.</p>
                </div>
                <div class="mt-8 max-w-4xl mx-auto">
                    <div class="flex items-center justify-center mb-6"><span class="text-sm font-medium mr-3">Manual Planning</span><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="ai-toggle" class="sr-only peer"><div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div></label><span class="text-sm font-medium ml-3">AI Advisor</span></div>
                    <div id="manual-planning-view"><fieldset id="objectives-fieldset" class="space-y-4"></fieldset><div class="mt-8 flex justify-center"><button id="generate-plan-btn-manual" class="rounded-md bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-500 disabled:bg-gray-400" disabled>Generate Plan</button></div></div>
                    <div id="ai-advisor-view" class="hidden">
                        <div class="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg text-center mb-6">
                            <p class="text-sm text-blue-800 dark:text-blue-200">Our AI analyzes anonymized operational patterns from all community data providers to find optimal solutions. Your raw well data is never shared, and Well-Tegra cannot access it. This process is secured by smart contracts.</p>
                        </div>
                        <div id="problem-selection"><h3 class="text-lg font-semibold text-center mb-4">What is the primary problem with this well?</h3><fieldset id="problems-fieldset" class="space-y-4"></fieldset></div><div id="ai-recommendations" class="hidden mt-8"></div><div class="mt-8 flex justify-center"><button id="generate-plan-btn-ai" class="rounded-md bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-500 disabled:bg-gray-400" disabled>Generate Plan from Recommendation</button></div>
                    </div>
                </div>
            </section>
            <section id="step-3" class="hidden">
                <div class="text-center">
                    <h3 class="text-2xl font-bold tracking-tight">Step 3: Review the Generated Plan</h3>
                    <p class="mt-4 max-w-3xl mx-auto text-lg">This is the final review stage. Based on your selections, the platform has generated a comprehensive, data-driven intervention plan. This includes the baseline procedure, a list of required equipment and personnel, and an initial risk assessment. Please review all sections carefully. If everything is in order, you can proceed to the 'Live Operation' view, which simulates the execution of this plan in real-time. If you need to make changes, you can 'Start Over'.</p>
                </div>
                <div id="plan-output" class="mt-10 light-card p-6 md:p-8 space-y-8 rounded-lg"></div>
                <div class="mt-8 flex justify-center space-x-4"><button id="start-over-btn" class="rounded-md bg-gray-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-500">Start Over</button><button id="begin-op-btn" class="rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500">Begin Live Operation</button></div>
            </section>
        </div>

        <div id="logistics-view" class="view-container hidden max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">Logistics & Asset Management</h2><p class="mt-2 max-w-2xl mx-auto text-lg">Manage equipment and personnel availability, certifications, and maintenance schedules.</p></div>
            <div class="mt-10 grid gap-12 lg:grid-cols-2">
                <div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Equipment Hub</h3><input type="text" id="equipment-search" placeholder="Search equipment..." class="w-full p-2 rounded-md mb-4"><div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="table-header"><tr><th class="p-2">Asset ID</th><th>Type</th><th>Location</th><th>Test Status</th><th>Actions</th></tr></thead><tbody id="equipment-table-body"></tbody></table></div></div>
                <div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Personnel Roster</h3><input type="text" id="personnel-search" placeholder="Search personnel..." class="w-full p-2 rounded-md mb-4"><div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="table-header"><tr><th class="p-2">Name</th><th>Role</th><th>Status</th><th>Certs Valid</th></tr></thead><tbody id="personnel-table-body"></tbody></table></div></div>
            </div>
        </div>
        
        <div id="commercial-view" class="view-container hidden max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">Commercial Dashboard</h2><p id="commercial-subtitle" class="mt-2 max-w-2xl mx-auto text-lg">Live financial tracking for the selected operation.</p></div>
            <div id="commercial-content" class="mt-10"></div>
        </div>

        <div id="hse-view" class="view-container hidden max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">HSE & Risk Dashboard</h2><p id="hse-subtitle" class="mt-2 max-w-2xl mx-auto text-lg">Centralized risk register and permit to work status.</p></div>
            <div id="hse-content" class="mt-10"></div>
        </div>

        <div id="pob-view" class="view-container hidden max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">Personnel on Board & Emergency Response</h2><p id="pob-subtitle" class="mt-2 max-w-2xl mx-auto text-lg">Live POB manifest and emergency muster status.</p></div>
            <div id="pob-content" class="mt-10"></div>
        </div>

        <div id="whitepaper-view" class="view-container hidden max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold tracking-tight">Well-Tegra White Paper</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg">Dive deeper into the technical architecture and strategic vision behind the Well-Tegra platform. Our white paper provides a comprehensive overview of the privacy-preserving AI, enterprise blockchain, and data unification strategies that power our solution.</p>
                <a href="https://welltegra.network/assets/Well-Tegra_White_Paper.pdf" target="_blank" download class="mt-8 inline-block rounded-md bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 transition">
                    Download the White Paper
                </a>
            </div>
        </div>

        <div id="faq-view" class="view-container hidden max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2><p class="mt-2 max-w-2xl mx-auto text-lg">Find answers to common questions about the Well-Tegra platform.</p></div>
            <div id="faq-accordion" class="mt-10 light-card rounded-lg shadow-md overflow-hidden">
                </div>
        </div>

        <div id="about-view" class="view-container hidden max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">About Me & The Mission</h2></div>
            <div class="mt-10 light-card p-8 rounded-lg space-y-8">
                <div>
                    <h3 class="text-2xl font-bold">From the Wellsite to the Web</h3>
                    <p class="text-lg italic">"I built Well-Tegra because I've lived the problems it's designed to solve." - Kenneth McKenzie</p>
                </div>
                <div>
                    <h4 class="text-xl font-semibold">My Perspective</h4>
                    <p>I'm not a software developer who decided to get into oil and gas. I'm a well services guy who learned to code. My career started at the sharp end with Tristar Oilfield Services and took me around the world, working with service leaders like Expro and Wellserv, and later supervising operations for major operators like BG Group, CNR, and Woodside. I've been on both sides of the fence—I know the service company's challenges and the operator's objectives. That's the insight Well-Tegra is built on.</p>
                </div>
                 <div>
                    <h4 class="text-xl font-semibold">Why I Built This</h4>
                    <p>I've seen first-hand how much time, money, and energy we waste because our data is a mess. It's locked in different systems, buried in old reports, and stuck in spreadsheets. We repeat the same mistakes because the lessons learned from one job are never available for the next. The "Well From Hell" in this demo isn't an exaggeration; it's a sanitized version of the real-world train wrecks I've witnessed—and helped clean up.</p>
                    <p class="mt-2">Well-Tegra is my answer to that chaos. It's a platform designed from an operator's perspective, focused on a single source of truth that connects planning, execution, and analysis.</p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <h4 class="font-bold text-blue-800 dark:text-blue-300">The Path Forward</h4>
                    <p class="mt-2 text-blue-700 dark:text-blue-200">This demo is the blueprint. It was built on a Chromebook with a lot of determination, but to bring it to life, it needs the power of real, collective data. The next step is to partner with operators and service companies to build out the anonymized data pool that will drive the predictive AI. The platform is ready to scale, and I'm actively seeking the right partners to help build the future of well operations.</p>
                </div>
            </div>
        </div>

        <div id="performer-view" class="view-container hidden performer-view p-4 lg:p-6 h-full">
            <div class="h-full dashboard-grid">
                <div id="procedure-panel" class="bg-slate-800/50 rounded-lg p-4 flex flex-col">
                    <h2 class="text-lg font-semibold mb-2 border-b border-slate-700 pb-2">Operational Procedure</h2>
                    <p class="text-xs text-slate-400 mb-3">Simulation is running. Click a future step to jump ahead.</p>
                    <div id="procedure-steps" class="flex-1 space-y-3 overflow-y-auto pr-2"></div>
                    <div id="performer-controls" class="hidden mt-4">
                        <button id="view-analysis-btn" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition">View Post-Job Analysis</button>
                    </div>
                </div>
                <div class="flex flex-col gap-4 lg:gap-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                        <div class="kpi-card p-4">
                            <p id="kpi-label-1" class="text-sm">Hookload (klbf)</p>
                            <p id="kpi-hookload" class="text-3xl font-bold">0.0</p>
                        </div>
                        <div id="kpi-card-pressure" class="kpi-card p-4">
                            <p id="kpi-label-2" class="text-sm">Pump Pressure (psi)</p>
                            <p id="kpi-pressure" class="text-3xl font-bold">0</p>
                        </div>
                        <div class="kpi-card p-4">
                            <p id="kpi-label-3" class="text-sm">CT Speed (ft/min)</p>
                            <p id="kpi-speed" class="text-3xl font-bold">0</p>
                        </div>
                        <div class="kpi-card p-4">
                            <p class="text-sm">Depth (ft)</p>
                            <p id="kpi-depth" class="text-3xl font-bold">0</p>
                        </div>
                    </div>
                    <div id="chart-card" class="flex-1 bg-slate-800/50 rounded-lg p-4 flex-col"><h3 class="text-lg font-semibold mb-2">Tubing Force Analysis: Plan vs. Actual</h3><div class="flex-1 relative"><canvas id="tfaChart"></canvas></div></div>
                </div>
                <div class="bg-slate-800/50 rounded-lg p-4 flex flex-col"><h2 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Operations Log</h2><div id="log-entries" class="flex-1 space-y-3 overflow-y-auto mb-4"></div><div class="mt-auto"><textarea id="log-input" class="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-sm" rows="3" placeholder="Add log entry..."></textarea><button id="add-log-btn" class="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-md transition">Add Entry</button></div></div>
            </div>
        </div>

        <div id="analyzer-view" class="view-container hidden max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center"><h2 class="text-3xl font-bold tracking-tight">Post-Job Analysis</h2><p id="analyzer-subtitle" class="mt-2 max-w-2xl mx-auto text-lg"></p></div>
            <div class="mt-10 grid gap-8 lg:grid-cols-2"><div class="light-card p-6 md:p-8 rounded-lg"><h3 class="text-xl font-semibold mb-4">Performance Summary</h3><div id="summary-kpis" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div></div><div class="light-card p-6 md:p-8 rounded-lg"><h3 class="text-xl font-semibold mb-4">Non-Productive Time (NPT) Breakdown</h3><div class="h-64 md:h-80"><canvas id="nptChart"></canvas></div></div></div>
            <div class="mt-8 light-card p-6 md:p-8 rounded-lg"><h3 class="text-xl font-semibold mb-4">Lessons Learned</h3><div id="lessons-learned-list" class="space-y-4 mb-6"></div><div><textarea id="lesson-input" class="w-full p-2 text-base rounded-md" rows="3" placeholder="Add a new lesson learned..."></textarea><button id="add-lesson-btn" class="mt-2 rounded-md bg-teal-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-teal-500">Add Lesson</button></div></div>
            <div class="mt-8 flex justify-center"><button id="plan-new-job-btn" class="rounded-md bg-gray-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-500">Plan New Job</button></div>
        </div>
        
    </main>
    
    <div id="well-history-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50 modal-overlay">
        <div class="relative top-10 mx-auto p-5 border w-full max-w-5xl shadow-lg rounded-md modal-container">
            <div class="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                <h3 id="modal-title" class="text-2xl font-bold"></h3>
                <button id="close-modal-btn" class="text-3xl font-bold hover:text-red-500">&times;</button>
            </div>
            <div id="modal-content" class="mt-4 max-h-[80vh] overflow-y-auto p-1"></div>
        </div>
    </div>

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // --- DATA STORE (Expanded Sample Data for Simulation) ---
    const wellData = [
        { 
            id: 'W666', 
            name: 'The Well From Hell',
            api: '666',
            field: 'Devils Basin', 
            region: 'UKCS', 
            type: 'HPHT Gas Condensate', 
            depth: '18,500ft', 
            status: 'Active - Restored Production', 
            issue: 'Well brought back online after successful AI-guided fishing and tubing repair campaign.', 
            history: [ 
                { date: '2026-05-22', operation: 'Coiled Tubing: Milling Operation', problem: 'Ran 2-3/8" CT with a high-torque motor and mill to clear the obstruction. Motor stalled repeatedly. Aggressive milling parameters led to coiled tubing fatigue and a pipe fracture. CT parted at 11,800ft.', lesson: 'CT fatigue must be tracked meticulously in real-time. Milling in HPHT wells without clear visuals is a high-risk gamble. The default response should not be more force.' },
                { date: '2026-08-01', operation: 'Wireline: Complex Fishing Operation', problem: 'Ran a wireline fishing toolstring to latch onto the parted CT. The high deviation and debris in the well prevented a successful latch. After 72 hours of attempts, the wireline tools became hopelessly tangled with the coiled tubing fish.', lesson: 'A consolidated, single source of truth detailing all previous runs (including tool dimensions and debris) is critical before designing a fishing BHA. The vendor-provided fishing diagram was based on incomplete data.' },
                { date: '2027-01-15', operation: 'Pumping & Cementing: Attempted Well Kill', problem: 'Attempted to pump kill-weight mud to secure the well for further operations. Due to suspected tubing-to-annulus communication from the milling damage, there was a complete loss of returns and H2S ingress to the B-annulus.', lesson: 'Well integrity must be fully diagnosed via pressure fall-off tests *before* any pumping operation. Assumed integrity of the production tubing was the critical failure point.' },
                { date: '2027-08-10', operation: 'Well-Tegra AI-Guided Intervention', problem: 'Final attempt to recover well before full P&A. A new intervention plan was designed using the Well-Tegra platform, leveraging data from the entire asset pool.', lesson: 'By analyzing failures on other wells, the AI recommended a multi-stage approach: a high-viscosity cleanout run, followed by a specialized cutting tool, and finally a heavy-duty overshot to retrieve both fish. The operation was successful, saving the well and proving the value of the Well-Tegra data pool.' }
            ], 
            dailyReports: [ 
                { date: '2026-08-04', summary: 'Day 3 of fishing for CT. Unable to get a latch. Jarring operations ceased. Decision made to POOH and reconsider strategy. Fish (CT) and fish (Wireline tools) now both left in hole. Well status downgraded to severe integrity risk.', npt: 24.0, toolstringRun: ['Rope Socket', 'Stem', 'Spang Jars', 'CT Overshot'] }, 
                { date: '2027-08-12', summary: 'Day 2 of AI-guided intervention. Successfully retrieved tangled fish. Now preparing to run tubing patch.', npt: 0.0, toolstringRun: ['Heavy Duty Rope Socket', 'Accelerator', 'Hydraulic Jars', 'Heavy Duty Pulling Tool', 'Specialized Overshot'] } 
            ], 
            completion: { 
                casing: [
                    {type: 'Conductor', size: '30', top: 0, bottom: 500}, 
                    {type: 'Surface', size: '20', top: 0, bottom: 2500}, 
                    {type: 'Intermediate', size: '13 3/8', top: 0, bottom: 9500},
                    {type: 'Production Liner', size: '9 5/8', top: 9200, bottom: 15000}
                ], 
                tubing: [{type: 'Production', size: '4 1/2', top: 0, bottom: 17800}], 
                equipment: [
                    {item: 'Tubing Patch', top: 12450, comments: 'High-expansion metal patch', isProblem: false},
                    {item: 'SSSV', top: 12500, comments: 'TRSSSV, Functioning', isProblem: false}, 
                    {item: 'Permanent Packer', top: 17750, comments: 'HPHT Permanent Packer'},
                    {item: 'Hades Shale Formation', top: 14000, comments: 'Highly Stressed', isProblem: true}
                ], 
                perforations: [{top: 18000, bottom: 18250, date: '2025-07-10'}] 
            } 
        },
        { 
            id: 'W001', 
            name: 'Gullfaks C-34', 
            field: 'Gullfaks', 
            region: 'Norwegian Sector', 
            type: 'Oil Producer', 
            depth: '2,850m', 
            status: 'Active - Underperforming', 
            issue: 'Suspected scale buildup in tubing.', 
            history: [ 
                { date: '2020-10-03', operation: 'Scale Inhibitor Squeeze', problem: 'Pumping failure led to 12 hours of NPT due to a faulty valve on the cementing unit.', lesson: 'Third-party equipment maintenance records must be integrated into the job planning phase.' },
                { date: '2024-02-20', operation: 'Coiled Tubing Scale Cleanout', problem: 'Motor stalled multiple times due to unexpectedly hard scale. The fluid system was unable to efficiently lift the large volume of debris, causing a pack-off scare.', lesson: 'Real-time downhole data (pressure, temperature, motor RPM) is essential for intervention effectiveness. The job should have been stopped earlier based on poor returns.' }
            ], 
            dailyReports: [ { date: '2024-02-20', summary: 'RIH with CT and motor. Encountered hard scale. Stalled motor 3 times. Circulated high-vis sweeps to clean hole. POOH slowly. Job took 12 hours longer than planned.', npt: 12.0, toolstringRun: ['CT Connector', 'Dual-Flapper Check Valve', 'Hydraulic Disconnect', 'High-Torque Motor', 'Scale Mill'] } ], 
            completion: { casing: [{type: 'Surface', size: '13 3/8', top: 0, bottom: 800}, {type: 'Production', size: '9 5/8', top: 0, bottom: 2850}], tubing: [{type: 'Production', size: '4 1/2', top: 0, bottom: 2750}], equipment: [{item: 'SSSV', top: 1200, comments: 'TRSSSV, Flapper'}, {item: 'Packer', top: 2700, comments: 'Hydraulic Set'}, {item: 'Scale Buildup', top: 2300, comments: 'Suspected from history', isProblem: true}], perforations: [{top: 2800, bottom: 2820, date: '2019-03-10'}] } 
        },
        { 
            id: 'W002', 
            name: 'Statfjord A-12', 
            field: 'Statfjord', 
            region: 'Norwegian Sector', 
            type: 'Water Injector', 
            depth: '3,100m', 
            status: 'Active - Low Injectivity', 
            issue: 'Possible perforation plugging.', 
            history: [ 
                { date: '2023-01-20', operation: 'Coiled Tubing Acid Wash', problem: 'Incorrect acid concentration mixed initially. Wrong valve opened on chemical skid.', lesson: 'Implement a digital, step-by-step checklist with valve confirmations before starting any pumping job. Human error in mixing is a common, preventable NPT cause.' },
                { date: '2024-04-11', operation: 'Production Logging (Wireline)', problem: 'Logging tool string became stuck at 2,900m. Jarring was unsuccessful. Had to perform a "cut and thread" fishing operation to retrieve the tool.', lesson: 'Wellbore tortuosity data was not consulted prior to the job. A rigid toolstring was run into a high-angle section, causing the hangup. The risk could have been flagged automatically.' }
            ], 
            dailyReports: [ { date: '2024-04-12', summary: 'Successfully fished PLT string after 36 hours of continuous operations. Significant NPT incurred. Wellbore is clear but injectivity issue remains unresolved.', npt: 36.0, toolstringRun: ['Rope Socket', 'Stem', 'Jars', 'Wireline Cutter', 'Rope-Socket Overshot'] } ], 
            completion: { casing: [{type: 'Production', size: '9 5/8', top: 0, bottom: 3100}], tubing: [{type: 'Injection', size: '4 1/2', top: 0, bottom: 3000}], equipment: [{item: 'Packer', top: 2950, comments: 'Hydraulic Set'}], perforations: [{top: 3050, bottom: 3080, date: '2017-05-20', comments: 'Partially plugged', isProblem: true}] } 
        },
        { 
            id: 'W003', 
            name: 'Oseberg B-21', 
            field: 'Oseberg', 
            region: 'Norwegian Sector', 
            type: 'Gas Producer', 
            depth: '2,500m', 
            status: 'Shut-in - Well Integrity Issues', 
            issue: 'Suspected downhole safety valve failure.', 
            history: [ 
                { date: '2021-08-05', operation: 'Routine DHSV Test (Slickline)', problem: 'Valve failed to close on first attempt. Required multiple cycles to eventually close. Indicated hydraulic leak in control line or failing valve internals.', lesson: 'DHSV test failures should automatically trigger a "Well Integrity" flag and schedule a mandatory diagnostic run, not just a "monitor" recommendation.' },
                { date: '2023-09-14', operation: 'Slickline: Attempted DHSV Lock-Open', problem: 'Ran lock-open tool. Tool sheared prematurely due to debris in the control line, leaving a new fish on top of the already faulty DHSV.', lesson: 'A simple control line flush was missed in the procedure. This highlights a failure in planning and assessing prerequisite tasks. The cost of this error is an order of magnitude higher than the cost of the flush.' }
            ], 
            dailyReports: [ { date: '2023-09-14', summary: 'Sheared pin on DHSV lock-open tool. Unable to retrieve. Well is now shut-in with an inoperable DHSV and a fish in the hole.', npt: 8.0, toolstringRun: ['Rope Socket', 'Stem', 'Spang Jars', 'Running Tool', 'DHSV Lock-Open Prong'] } ], 
            completion: { casing: [{type: 'Production', size: '7', top: 0, bottom: 2500}], tubing: [{type: 'Production', size: '3 1/2', top: 0, bottom: 2400}], equipment: [{item: 'Lock-Open Tool Fish', top: 995, comments: 'Sheared tool', isProblem: true}, {item: 'SSSV', top: 1000, comments: 'Failed to close on test', isProblem: true}, {item: 'Packer', top: 2350, comments: 'Mechanical Set'}], perforations: [{top: 2450, bottom: 2480, date: '2018-01-15'}] } 
        },
        { 
            id: 'W004', 
            name: 'Halfdan D-5', 
            field: 'Halfdan', 
            region: 'Danish Sector', 
            type: 'Oil Producer', 
            depth: '2,200m', 
            status: 'P&A Candidate', 
            issue: 'High water cut; uneconomical production.', 
            history: [ 
                { date: '2022-09-18', operation: 'Zonal Isolation Evaluation (Wireline)', problem: 'Logging tool failed downhole due to high temperature. The tool selected was not rated for the BHT of the well, an error in the planning phase.', lesson: 'Equipment specifications (temp/pressure rating) must be cross-referenced against well parameters automatically. This was a preventable human error.' },
                { date: '2024-01-20', operation: 'P&A: Set Bridge Plug (Wireline)', problem: 'Set bridge plug, but it failed a pressure test. The casing was found to be more corroded than historical records indicated. Plug had to be milled out.', lesson: 'Legacy data from drilling (e.g., caliper logs) must be easily accessible during intervention planning. The data existed but was buried in a PDF in an old system.' }
            ], 
            dailyReports: [ { date: '2022-09-18', summary: 'Attempted to run CBL/VDL log. Tool failed at 2100m due to temperature. POOH. NPT for the day.', npt: 6.0, toolstringRun: ['Rope Socket', 'CCL', 'Cement Bond Log Tool', 'VDL Tool'] } ], 
            completion: { casing: [{type: 'Surface', size: '13 3/8', top: 0, bottom: 500}, {type: 'Production', size: '9 5/8', top: 0, bottom: 2200, comments: 'Corrosion noted in last report', isProblem: true}], plugs: [] } 
        },
    ];
    const objectivesData = [ 
        { id: 'obj1', name: 'Production Enhancement', description: 'Intervention to increase hydrocarbon flow rate.' }, 
        { id: 'obj2', name: 'Water Shut-off', description: 'Isolate water-producing zones to reduce water cut.' }, 
        { id: 'obj3', name: 'Well Integrity Restoration', description: 'Repair or replace failed downhole components.' }, 
        { id: 'obj4', name: 'Plug & Abandonment', description: 'Permanently seal the wellbore.' },
        { id: 'obj5', name: 'AI-Guided Fishing & Repair', description: 'Execute a complex, data-driven plan to recover fish and restore production.' }
    ];
    const problemsData = [ 
        { id: 'prob1', name: 'Production Decline / Low Injectivity', description: 'Well performance is below expected levels.', linked_objectives: ['obj1'] }, 
        { id: 'prob2', name: 'Well Integrity Concern', description: 'Suspected failure of a downhole component (e.g., DHSV, packer).', linked_objectives: ['obj3'] }, 
        { id: 'prob3', name: 'End of Life / Uneconomical', description: 'Well is no longer commercially viable.', linked_objectives: ['obj4', 'obj2'] },
        { id: 'prob4', name: 'Complex Wellbore Obstruction / Fish', description: 'Multiple fish in hole with suspected tubing/casing integrity failure.', linked_objectives: ['obj5', 'obj4'] }
    ];
    const aiRecommendations = {
        prob1: [ 
            { objectiveId: 'obj1', confidence: 92, outcome: '+250 bopd uplift', reason: 'Analysis of anonymized operational patterns from <strong>Gullfaks C-34 (W001)</strong> indicates a high success rate for acid stimulation in this formation type.' } 
        ],
        prob2: [ 
            { objectiveId: 'obj3', confidence: 88, outcome: 'Restore well to safe operational state', reason: 'Log data indicates likely DHSV failure. The anonymized operational patterns from the tool failure on <strong>Oseberg B-21 (W003)</strong> highlights the need for a pre-job control line flush, which will be added to the procedure.' }, 
            { objectiveId: 'obj4', confidence: 65, outcome: 'Permanently secure well', reason: 'P&A is a secondary option if integrity restoration is not feasible. The casing corrosion issues on <strong>Halfdan D-5 (W004)</strong> suggest a full casing integrity log should be run first.' } 
        ],
        prob3: [ 
            { objectiveId: 'obj4', confidence: 95, outcome: 'Well permanently abandoned per regulations', reason: 'Well is a clear P&A candidate based on economic limit test and referencing the P&A challenges on <strong>Halfdan D-5 (W004)</strong>.' }, 
            { objectiveId: 'obj2', confidence: 55, outcome: 'Reduce water cut by 40%', reason: 'Water shut-off may extend well life, but has lower confidence of economic success based on similar zonal isolation jobs.' } 
        ],
        prob4: [
            { objectiveId: 'obj5', confidence: 95, outcome: 'Fish recovered and well online', reason: 'This plan is generated by analyzing the entire data pool. Anonymized patterns from the failed fishing job on <strong>Statfjord A-12 (W002)</strong> mandate a pre-job cleanout. The successful milling on <strong>Gullfaks C-34 (W001)</strong> provides the optimal parameters for a cutting run. Finally, the tool failure on <strong>Oseberg B-21 (W003)</strong> informs the selection of a more robust, heavy-duty fishing assembly.'},
            { objectiveId: 'obj4', confidence: 98, outcome: 'Permanently secure wellbore', reason: 'Safest option. Given the multiple integrity failures and tangled fish, referencing the P&A challenges on <strong>Halfdan D-5 (W004)</strong> and the cementing failures on this well, a complex section milling and plugging operation is the surest path to permanent abandonment.'}
        ]
    };
    const proceduresData = {
        obj1: { name: "Coiled Tubing Acid Stimulation", personnel: ["Coiled Tubing Supervisor", "Pump Operator", "Wellsite Engineer"], steps: ["Hold pre-job safety meeting & TBT.", "Confirm all PTW are approved.", "Rig up Coiled Tubing unit and PCE.", "Pressure test PCE to 5000 psi.", "Run in hole (RIH) to 9,500 ft.", "Spot 50 bbls of 15% HCl acid.", "Pull out of hole (POOH) to surface.", "Flow back well and monitor returns.", "Rig down equipment."], risks: { operational: 4, geological: 3, equipment: 3, hse: 4, financial: 2 }, cost: 750000, duration: 5, tfaModel: { pickUp: [[0,0], [9500, 25]], slackOff: [[0,0], [9500, -25]], alarmUpper: [[0,2], [9500, 27]], alarmLower: [[0,-2], [9500, -27]] } },
        obj2: { name: "Mechanical Plug Installation", personnel: ["Wireline Supervisor", "Wireline Operator"], steps: ["Hold pre-job safety meeting & TBT.", "Confirm all PTW are approved.", "Rig up Wireline unit.", "Run in hole with gauge ring.", "Run in hole with bridge plug and set at target depth.", "Dump bail cement on top of plug.", "Pressure test to confirm seal.", "Rig down equipment."], risks: { operational: 3, geological: 2, equipment: 3, hse: 3, financial: 1 }, cost: 325000, duration: 3, tfaModel: { pickUp: [[0,0], [9500, 10]], slackOff: [[0,0], [9500, -10]], alarmUpper: [[0,1], [9500, 11]], alarmLower: [[0,-1], [9500, -11]] } },
        obj3: { name: "Slickline: DHSV Replacement", personnel: ["Slickline Supervisor", "Slickline Operator"], steps: ["Hold pre-job safety meeting & TBT.", "Confirm all PTW are approved.", "Rig up Slickline unit.", "Run in hole to equalize and retrieve failed DHSV insert.", "Run in hole with new DHSV insert and lock into place.", "Pressure test control line and valve.", "Function test valve.", "Rig down equipment."], risks: { operational: 4, geological: 1, equipment: 5, hse: 4, financial: 3 }, cost: 480000, duration: 5, tfaModel: { pickUp: [[0, 100], [9500, 150]], slackOff: [[0, 100], [9500, 50]], alarmUpper: [[0, 110], [9500, 160]], alarmLower: [[0, 90], [9500, 40]] } },
        obj4: { name: "P&A - Section Milling & Plugging", personnel: ["Rig Supervisor", "Driller", "Derrickhand", "Floorhand"], steps: ["Hold pre-job safety meeting & TBT.", "Confirm all PTW are approved.", "Rig up workover rig.", "Mill section of casing to expose formation.", "Set balanced cement plug across milled section.", "Verify plug placement and integrity.", "Repeat for all required barriers.", "Rig down equipment."], risks: { operational: 5, geological: 4, equipment: 4, hse: 5, financial: 4 }, cost: 2500000, duration: 18, tfaModel: { pickUp: [[0,0], [5000, 50]], slackOff: [[0,0], [5000, -50]], alarmUpper: [[0,10], [5000, 60]], alarmLower: [[0,-10], [5000, -60]] } },
        obj5: { name: "AI-Guided Fishing & Repair", personnel: ["Wellsite Engineer", "Coiled Tubing Supervisor", "Wireline Supervisor"], steps: ["Hold pre-job safety meeting & TBT.", "Confirm all PTW are approved.", "RIH with Coiled Tubing and circulate high-viscosity sweeps to clean debris.", "POOH Coiled Tubing.", "RIH with Wireline cutting tool to cut tangled fish.", "RIH with heavy-duty overshot to latch and retrieve fish.", "RIH with high-expansion tubing patch and set across damaged interval.", "Pressure test patch and bring well online."], risks: { operational: 5, geological: 3, equipment: 4, hse: 5, financial: 5 }, cost: 3200000, duration: 15, tfaModel: { pickUp: [[0,0], [12000, 40]], slackOff: [[0,0], [12000, -40]], alarmUpper: [[0,5], [12000, 45]], alarmLower: [[0,-5], [12000, -45]] } }
    };
    const equipmentRequirements = {
        obj1: [
            { name: "Coiled Tubing Unit", source: "Vendor", vendor: "Halliburton", price: 125000 },
            { name: "High-Pressure Pumps", source: "Onboard", vendor: "N/A", price: 0 },
            { name: "Fluid Tanks", source: "Vendor", vendor: "Baker Hughes", price: 20000 },
            { name: "Jetting Nozzle BHA", source: "Vendor", vendor: "Schlumberger", price: 15000 },
        ],
        obj2: [
            { name: "Wireline Truck/Skid", source: "Vendor", vendor: "Expro", price: 90000 },
            { name: "Setting Tool for Bridge Plug", source: "Vendor", vendor: "Baker Hughes", price: 25000 },
            { name: "Dump Bailer", source: "Vendor", vendor: "Schlumberger", price: 18000 }
        ],
        obj3: [
            { name: "Slickline Unit", source: "Vendor", vendor: "Archer", price: 75000 },
            { name: "DHSV Pulling/Running Tools", source: "Vendor", vendor: "Schlumberger", price: 45000 },
        ],
        obj4: [
            { name: "Workover Rig", source: "Onboard", vendor: "N/A", price: 0 },
            { name: "Milling BHA (Motor & Mill)", source: "Vendor", vendor: "Weatherford", price: 250000 },
            { name: "Cementing Unit", source: "Vendor", vendor: "Halliburton", price: 150000 },
        ],
        obj5: [
            { name: "Coiled Tubing Unit", source: "Vendor", vendor: "Halliburton", price: 125000 },
            { name: "Wireline Truck/Skid", source: "Vendor", vendor: "Expro", price: 90000 },
            { name: "Wireline Cutting Tool", source: "Vendor", vendor: "Specialist", price: 80000 },
            { name: "Heavy Duty Overshot", source: "Vendor", vendor: "Specialist", price: 60000 },
            { name: "High-Expansion Tubing Patch", source: "Vendor", vendor: "Metalskin", price: 450000 },
        ]
    };
    const equipmentData = [ { id: 'CTU-01', type: 'Coiled Tubing Unit', location: 'Onboard - Deck A', testStatus: 'Passed', nextMaint: '2025-09-15', rate: 25000, status: 'On Job' }, { id: 'CTU-02', type: 'Coiled Tubing Unit', location: 'Onshore Base', testStatus: 'Pending', nextMaint: '2025-07-10', rate: 25000, status: 'Maintenance' }, { id: 'WL-01', type: 'Wireline Truck/Skid', location: 'Onshore Base', testStatus: 'Passed', nextMaint: '2025-08-22', rate: 18000, status: 'Available' }, { id: 'SL-01', type: 'Slickline Unit', location: 'In Transit', testStatus: 'Passed', nextMaint: '2025-07-20', rate: 15000, status: 'In Transit' }, { id: 'PUMP-01', type: 'High-Pressure Pumps', location: 'Onboard - Pump Room', testStatus: 'Pending', nextMaint: '2025-10-01', rate: 8000, status: 'On Job' }, { id: 'PUMP-02', type: 'High-Pressure Pumps', location: 'Onshore Base', testStatus: 'Passed', nextMaint: '2025-11-05', rate: 8000, status: 'Available' }, { id: 'RIG-01', type: 'Workover Rig', location: 'Onboard - Drill Floor', testStatus: 'Passed', nextMaint: '2025-08-01', rate: 85000, status: 'On Job' }, ];
    const personnelData = [ { id: 'P001', name: 'Bob Raker', role: 'Wellsite Engineer', company: 'Operator', status: 'Onboard', certsValid: true, rate: 2200, muster: 'A', lifeboat: 1 }, { id: 'P002', name: 'Jane Smith', role: 'Coiled Tubing Supervisor', company: 'Service Co.', status: 'Onboard', certsValid: true, rate: 2500, muster: 'A', lifeboat: 1 }, { id: 'P003', name: 'Mike Johnson', role: 'Wireline Supervisor', company: 'Service Co.', status: 'On Job', certsValid: true, rate: 2300, muster: 'B', lifeboat: 2 }, { id: 'P004', name: 'Emily White', role: 'Slickline Supervisor', company: 'Service Co.', status: 'Available', certsValid: false, rate: 2300, muster: 'B', lifeboat: 2 }, { id: 'P005', name: 'Chris Green', role: 'Pump Operator', company: 'Service Co.', status: 'In Transit', certsValid: true, rate: 1800, muster: 'A', lifeboat: 1 }, { id: 'P006', name: 'Alex Brown', role: 'Rig Supervisor', company: 'Operator', status: 'Onboard', certsValid: true, rate: 3000, muster: 'B', lifeboat: 2 }, ];
    const musterStations = [ { id: 'A', name: 'Muster Station A', capacity: 50, current: 0 }, { id: 'B', name: 'Muster Station B', capacity: 50, current: 0 } ];
    
    // --- FAQ DATA ---
    const faqData = [
        {
            question: "What is Well-Tegra?",
            answer: `<p>Well-Tegra is an advanced technology platform designed to foster collaborative intelligence within the energy sector. It provides a comprehensive architectural blueprint that integrates privacy-preserving Artificial Intelligence (AI) and enterprise blockchain technology to solve long-standing challenges in energy operations.</p><p>Its primary mission is to transform the vast, fragmented, and often inaccessible data generated by oil and gas operations into a unified, analysis-ready asset, enabling competing firms to securely pool operational insights for mutual benefit.</p>`
        },
        {
            question: "What fundamental problem does Well-Tegra solve?",
            answer: `<p>The fundamental problem Well-Tegra addresses is the <strong>endemic data fragmentation</strong> that plagues the modern energy sector. Data is typically locked in isolated "silos," hindering the application of advanced analytics and machine learning.</p><p>This fragmentation comes from disparate sources, incompatible digital formats, and inaccessible physical data, meaning decades of invaluable operational knowledge remain locked away and unusable.</p>`
        },
        {
            question: "Who is the target audience for the Well-Tegra platform?",
            answer: `<p>The primary target audience consists of <strong>oil and gas operators</strong> and other firms within the energy industry's operational ecosystem. The platform is designed to serve both individual companies seeking to optimize their internal operations and consortia of competing firms aiming to achieve shared intelligence.</p>`
        },
        {
            question: "Why does Well-Tegra use blockchain technology?",
            answer: `<p>Well-Tegra uses a <strong>private, permissioned blockchain</strong> to create a trusted, transparent, and tamper-proof foundation for its multi-client collaborative ecosystem. This is not a public cryptocurrency blockchain, but a secure environment for vetted partners.</p><p>It provides three core guarantees:</p><ul><li><strong>Cryptographic Hashing:</strong> A unique digital fingerprint for data, making tampering obvious.</li><li><strong>Block Chaining:</strong> An unbreakable, interlocking chain where altering one block invalidates all subsequent blocks.</li><li><strong>Decentralization:</strong> The ledger is copied across all members, requiring majority consensus for changes, making fraudulent changes practically impossible.</li></ul>`
        },
        {
            question: "How can competing companies share data without revealing confidential information?",
            answer: `<p>Well-Tegra implements a sophisticated, multi-stage anonymization protocol. This "defense-in-depth" strategy layers several advanced privacy-enhancing technologies:</p><ul><li><strong>Stage 1: Identification and Suppression:</strong> Removing explicit identifiers like company and well names.</li><li><strong>Stage 2: Generalization for K-Anonymity and L-Diversity:</strong> Making records indistinguishable from others to prevent re-identification from combined attributes.</li><li><strong>Stage 3: Perturbation with Differential Privacy:</strong> Adding calibrated statistical "noise" to sensitive numerical data to provide a formal, mathematical guarantee of privacy.</li></ul><p>The platform's most innovative feature is <strong>"verifiable privacy,"</strong> where the anonymization rules are coded into a smart contract on the blockchain, allowing participants to cryptographically verify that the agreed-upon privacy protocol was executed.</p>`
        },
        {
            question: "What is the 'network effect' and how does it benefit data providers?",
            answer: `<p>The "network effect" is the principle that the value of the platform increases for every participant as more members join. This is achieved by securely leveraging the collective, anonymized data of the entire consortium to build predictive models that are far more powerful than any single organization could develop alone.</p><p>This creates a <strong>virtuous cycle</strong>: more data leads to better models, which provides a powerful incentive for new members to join, which in turn makes the models even more powerful for everyone.</p>`
        },
    ];

    // --- GLOBAL STATE ---
    let appState = {
        currentView: 'home', selectedWell: null, selectedObjective: null, generatedPlan: null, liveData: null, logEntries: [], lessonsLearned: [], tfaChartInstance: null, nptChartInstance: null, savingsChartInstance: null, liveDataInterval: null,
        commercial: { afe: 0, actualCost: 0, serviceTickets: [] },
        ai: { selectedProblemId: null, selectedRecommendation: null },
        hse: { permits: [], riskRegister: [] },
        pob: { musterActive: false, musterInterval: null, personnel: [] }
    };

    // --- DOM ELEMENTS ---
    const body = document.body;
    const welcomeScreen = document.getElementById('welcome-screen');
    const appContainer = document.getElementById('app-container');
    const loginBtn = document.getElementById('login-btn');
    const views = document.querySelectorAll('.view-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerTitle = document.getElementById('header-title');
    const headerDetails = document.getElementById('header-details');
    const headerNav = document.getElementById('header-nav');
    
    // Planner
    const stepIndicators = { 1: document.getElementById('step-1-indicator'), 2: document.getElementById('step-2-indicator'), 3: document.getElementById('step-3-indicator') };
    const stepSections = { 1: document.getElementById('step-1'), 2: document.getElementById('step-2'), 3: document.getElementById('step-3') };
    const wellSelectionGrid = document.getElementById('well-selection-grid');
    const objectivesFieldset = document.getElementById('objectives-fieldset');
    const problemsFieldset = document.getElementById('problems-fieldset');
    const generatePlanBtnManual = document.getElementById('generate-plan-btn-manual');
    const generatePlanBtnAi = document.getElementById('generate-plan-btn-ai');
    const planOutput = document.getElementById('plan-output');
    const startOverBtn = document.getElementById('start-over-btn');
    const beginOpBtn = document.getElementById('begin-op-btn');
    const aiToggle = document.getElementById('ai-toggle');
    const manualPlanningView = document.getElementById('manual-planning-view');
    const aiAdvisorView = document.getElementById('ai-advisor-view');
    const aiRecommendationsContainer = document.getElementById('ai-recommendations');

    // Performer
    const kpiLabel1 = document.getElementById('kpi-label-1');
    const kpiLabel3 = document.getElementById('kpi-label-3');
    const kpiCardPressure = document.getElementById('kpi-card-pressure');
    const kpiHookload = document.getElementById('kpi-hookload'), kpiPressure = document.getElementById('kpi-pressure'), kpiSpeed = document.getElementById('kpi-speed'), kpiDepth = document.getElementById('kpi-depth');
    const procedureStepsContainer = document.getElementById('procedure-steps');
    const logEntriesContainer = document.getElementById('log-entries'), logInput = document.getElementById('log-input'), addLogBtn = document.getElementById('add-log-btn');
    const chartCard = document.getElementById('chart-card');
    const performerControls = document.getElementById('performer-controls');
    const viewAnalysisBtn = document.getElementById('view-analysis-btn');

    // Analyzer
    const analyzerSubtitle = document.getElementById('analyzer-subtitle'), summaryKpis = document.getElementById('summary-kpis'), lessonsLearnedList = document.getElementById('lessons-learned-list'), lessonInput = document.getElementById('lesson-input'), addLessonBtn = document.getElementById('add-lesson-btn'), planNewJobBtn = document.getElementById('plan-new-job-btn');

    // Logistics
    const equipmentTableBody = document.getElementById('equipment-table-body'), personnelTableBody = document.getElementById('personnel-table-body');
    const equipmentSearch = document.getElementById('equipment-search'), personnelSearch = document.getElementById('personnel-search');

    // Commercial
    const commercialContent = document.getElementById('commercial-content'), commercialSubtitle = document.getElementById('commercial-subtitle');

    // HSE & POB
    const hseContent = document.getElementById('hse-content'), hseSubtitle = document.getElementById('hse-subtitle');
    const pobContent = document.getElementById('pob-content');

    // Modal
    const modal = document.getElementById('well-history-modal'), modalTitle = document.getElementById('modal-title'), modalContent = document.getElementById('modal-content'), closeModalBtn = document.getElementById('close-modal-btn');
    
    // Theme
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // --- VIEW & STATE MANAGEMENT ---
    const switchView = (viewName) => {
        // Clear any running simulation when switching views
        if (appState.liveDataInterval) {
            clearInterval(appState.liveDataInterval);
            appState.liveDataInterval = null;
        }

        appState.currentView = viewName;
        body.className = `theme-${localStorage.getItem('theme') || 'light'}`;
        if (viewName === 'performer') {
            body.classList.add('theme-dark');
        }

        views.forEach(v => v.classList.add('hidden'));
        document.getElementById(`${viewName}-view`).classList.remove('hidden');

        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById(`${viewName}-nav-link`)?.classList.add('active');
        
        headerDetails.innerHTML = ''; // Clear details by default
        const theme = viewName === 'performer' ? 'dark' : localStorage.getItem('theme') || 'light';
        setTheme(theme); // Apply correct theme for the view

        let viewTitle = viewName.charAt(0).toUpperCase() + viewName.slice(1);
        if(viewName === 'pob') viewTitle = 'POB & ER';
        if(viewName === 'hse') viewTitle = 'HSE & Risk';
        if(viewName === 'whitepaper') viewTitle = 'White Paper';
        headerTitle.textContent = `Well-Tegra: ${viewTitle}`;

        if (viewName === 'performer' && appState.selectedWell && appState.generatedPlan) {
            headerDetails.innerHTML = `<span id="job-status" class="text-lg font-semibold text-emerald-400">● LIVE</span><div class="text-right"><p class="text-sm">Well: ${appState.selectedWell.name}</p><p class="text-sm">Job: ${appState.generatedPlan.name}</p></div>`;
            initializePerformer();
        } else if (['analyzer', 'commercial', 'hse', 'pob'].includes(viewName)) {
            if(appState.selectedWell && appState.generatedPlan) {
                headerDetails.innerHTML = `<div class="text-right"><p class="text-sm">Well: ${appState.selectedWell.name}</p><p class="text-sm">Job: ${appState.generatedPlan.name}</p></div>`;
            }
            if (viewName === 'commercial') initializeCommercial();
            if (viewName === 'hse') initializeHSE();
            if (viewName === 'pob') initializePOB();
        } else if (viewName === 'logistics') {
            renderAssetManagementViews();
        } else if (viewName === 'faq') {
            initializeFaqAccordion();
        }
    };
    
    const resetApp = (switchToHome = false) => {
        appState.selectedWell = null; appState.selectedObjective = null; appState.generatedPlan = null; appState.lessonsLearned = [];
        appState.commercial = { afe: 0, actualCost: 0, serviceTickets: [] };
        appState.ai = { selectedProblemId: null, selectedRecommendation: null };
        document.querySelectorAll('.planner-card').forEach(c => c.classList.remove('selected'));
        if(document.querySelector('input[name="objective"]:checked')) { document.querySelector('input[name="objective"]:checked').checked = false; }
        if(document.querySelector('input[name="problem"]:checked')) { document.querySelector('input[name="problem"]:checked').checked = false; }
        generatePlanBtnManual.disabled = true;
        generatePlanBtnAi.disabled = true;
        aiRecommendationsContainer.classList.add('hidden');
        aiToggle.checked = false;
        manualPlanningView.classList.remove('hidden');
        aiAdvisorView.classList.add('hidden');
        switchView(switchToHome ? 'home' : 'planner');
        updatePlannerStepUI(1);
    };

    // --- PLANNER LOGIC ---
    const renderWellCards = () => { wellSelectionGrid.innerHTML = wellData.map(well => `<div class="planner-card light-card p-6 cursor-pointer rounded-lg shadow-md" data-well-id="${well.id}"><div class="flex justify-between items-start"><div class="flex-1"><h3 class="text-xl font-bold">${well.name}</h3><p class="text-sm font-medium ${well.id === 'W666' ? 'text-green-600' : 'text-teal-600 dark:text-teal-400'}">${well.field} - ${well.type}</p></div><button class="view-details-btn text-sm text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 font-semibold" data-well-id="${well.id}">View Details</button></div><div class="mt-4 space-y-2 text-sm"><p><strong>Status:</strong> <span class="font-normal status-${well.status.toLowerCase().replace(/[\s-]/g, '')} px-2 py-1 rounded-full inline-block">${well.status}</span></p><p><strong>Issue:</strong> <span class="font-normal">${well.issue}</span></p></div></div>`).join(''); };
    const renderObjectives = () => { objectivesFieldset.innerHTML = objectivesData.map(obj => `<div><input type="radio" name="objective" id="${obj.id}" value="${obj.id}" class="sr-only"><label for="${obj.id}" class="objective-label flex flex-col p-4 rounded-lg"><span class="font-semibold">${obj.name}</span><span class="text-sm">${obj.description}</span></label></div>`).join(''); };
    const renderProblems = () => { problemsFieldset.innerHTML = problemsData.map(prob => `<div><input type="radio" name="problem" id="${prob.id}" value="${prob.id}" class="sr-only"><label for="${prob.id}" class="problem-label flex flex-col p-4 rounded-lg"><span class="font-semibold">${prob.name}</span><span class="text-sm">${prob.description}</span></label></div>`).join(''); };
    const renderPlan = () => {
        const well = appState.selectedWell, procedure = appState.generatedPlan, riskLabels = ['Operational', 'Geological', 'Equipment', 'HSE', 'Financial'], riskData = Object.values(procedure.risks);
        const getRiskTag = (level) => { if (level <= 2) return `<span class="risk-low px-2 py-1 text-xs font-medium rounded-full">Low</span>`; if (level <= 3) return `<span class="risk-medium px-2 py-1 text-xs font-medium rounded-full">Medium</span>`; return `<span class="risk-high px-2 py-1 text-xs font-medium rounded-full">High</span>`; };
        const logisticsConflicts = checkLogistics();
        let logisticsHtml = logisticsConflicts.length > 0 ? `<div><h4 class="text-xl font-semibold mb-4">Logistics & Resource Conflicts</h4><ul class="space-y-2">${logisticsConflicts.map(c => `<li class="flex items-start p-3 rounded-md bg-red-50 dark:bg-red-900/50 border-l-4 border-red-400"><span class="text-red-600 mr-2 font-bold">⚠️</span><span class="text-red-800 dark:text-red-300">${c}</span></li>`).join('')}</ul></div>` : '';
        
        const equipmentList = equipmentRequirements[appState.selectedObjective.id];
        let equipmentHtml = `<div><h4 class="text-xl font-semibold mb-4">Equipment to be Mobilized</h4><div class="space-y-3">`;
        equipmentList.forEach(item => {
            equipmentHtml += `
                <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <div class="flex items-center">
                        <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-4" ${item.source !== 'Vendor' ? 'checked disabled' : ''}>
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                Source: ${item.source} ${item.vendor !== 'N/A' ? `(${item.vendor})` : ''}
                            </p>
                        </div>
                    </div>
                    <p class="font-semibold text-sm">${item.price > 0 ? `$${item.price.toLocaleString()}` : 'N/A'}</p>
                </div>
            `;
        });
        equipmentHtml += `</div></div>`;

        planOutput.innerHTML = `<div><h3 class="text-2xl font-bold">Intervention Plan: ${well.name}</h3><p class="text-lg font-medium text-teal-700 dark:text-teal-400">${appState.selectedObjective.name}</p></div><div class="grid md:grid-cols-3 gap-6 text-center"><div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-sm font-medium">Selected Well</p><p class="text-lg font-semibold">${well.name}</p></div><div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-sm font-medium">Est. Duration</p><p class="text-lg font-semibold">${procedure.duration} days</p></div><div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-sm font-medium">Est. Cost (AFE)</p><p class="text-lg font-semibold">$${procedure.cost.toLocaleString()}</p></div></div>${logisticsHtml}<div><h4 class="text-xl font-semibold mb-4">Baseline Procedure: ${procedure.name}</h4><ol class="list-decimal list-inside space-y-2">${procedure.steps.map(step => `<li>${step}</li>`).join('')}</ol></div>${equipmentHtml}<div><h4 class="text-xl font-semibold mb-4">Initial Risk Assessment</h4><div class="grid md:grid-cols-2 gap-8 items-center"><div class="space-y-3">${riskLabels.map((label, i) => `<div class="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded"><span class="font-medium">${label}</span>${getRiskTag(riskData[i])}</div>`).join('')}</div><div class="h-64 md:h-80"><canvas id="riskChart"></canvas></div></div></div>`;
        
        const riskChartCtx = document.getElementById('riskChart').getContext('2d');
        const chartTheme = getChartThemeOptions();
        new Chart(riskChartCtx, { type: 'radar', data: { labels: riskLabels, datasets: [{ label: 'Risk Level', data: riskData, backgroundColor: 'rgba(13, 148, 136, 0.2)', borderColor: 'rgba(13, 148, 136, 1)', borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 5, ticks: { display: false }, grid: { color: chartTheme.scales.x.grid.color }, angleLines: { color: chartTheme.scales.x.grid.color }, pointLabels: { color: chartTheme.scales.x.ticks.color } } }, plugins: { legend: { display: false } } } });
    };
    const updatePlannerStepUI = (currentStep) => { Object.values(stepIndicators).forEach(ind => ind.classList.remove('active', 'completed')); for (let i = 1; i < currentStep; i++) { stepIndicators[i].classList.add('completed'); } stepIndicators[currentStep].classList.add('active'); Object.keys(stepSections).forEach(key => stepSections[key].classList.toggle('hidden', key != currentStep)); };

    // --- PERFORMER LOGIC ---
    const initializePerformer = () => {
        const isSlickline = appState.generatedPlan.name.toLowerCase().includes('slickline');

        // Set up KPI labels based on job type
        if (isSlickline) {
            kpiLabel1.textContent = 'Weight (lbs)';
            kpiCardPressure.style.display = 'none';
            kpiLabel3.textContent = 'Line Speed (ft/min)';
        } else {
            kpiLabel1.textContent = 'Hookload (klbf)';
            kpiCardPressure.style.display = 'block';
            kpiLabel3.textContent = 'CT Speed (ft/min)';
        }

        appState.liveData = { depth: 0, hookload: 0, pressure: 0, speed: 0, currentStep: 1, isRIH: true, jobRunning: true, alarmState: false, npt: { weather: 0, equipment: 0, operational: 0 }, opTime: 0, stepStartTime: Date.now() };
        appState.logEntries = [{ time: new Date(), user: 'System', text: 'Job initiated.' }];
        appState.generatedPlan.procedure = appState.generatedPlan.steps.map((s, i) => ({ id: i + 1, text: s, completed: false, active: false }));
        
        if (appState.tfaChartInstance) {
            appState.tfaChartInstance.destroy();
            appState.tfaChartInstance = null;
        }
        
        chartCard.style.display = isSlickline ? 'none' : 'flex';
        
        if (!isSlickline) {
            const chartCtx = document.getElementById('tfaChart').getContext('2d');
            const chartThemeOptions = getChartThemeOptions();
            chartThemeOptions.scales.y.title.text = 'Hookload (klbf)';
            appState.tfaChartInstance = new Chart(chartCtx, { type: 'line', data: { datasets: [ { label: 'Planned Pick-up', data: appState.generatedPlan.tfaModel.pickUp.map(p => ({x: p[0], y: p[1]})), borderColor: 'rgba(52, 211, 153, 0.8)', borderWidth: 2, pointRadius: 0, tension: 0.1 }, { label: 'Planned Slack-off', data: appState.generatedPlan.tfaModel.slackOff.map(p => ({x: p[0], y: p[1]})), borderColor: 'rgba(96, 165, 250, 0.8)', borderWidth: 2, pointRadius: 0, tension: 0.1 }, { label: 'Upper Alarm', data: appState.generatedPlan.tfaModel.alarmUpper.map(p => ({x: p[0], y: p[1]})), borderColor: 'rgba(239, 68, 68, 0.4)', borderWidth: 1, pointRadius: 0, borderDash: [5, 5], fill: '+1' }, { label: 'Lower Alarm', data: appState.generatedPlan.tfaModel.alarmLower.map(p => ({x: p[0], y: p[1]})), borderColor: 'rgba(239, 68, 68, 0.4)', borderWidth: 1, pointRadius: 0, borderDash: [5, 5], backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: '-1' }, { label: 'Actual Hookload', data: [], borderColor: '#f59e0b', borderWidth: 3, pointRadius: 0, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, ...chartThemeOptions } });
        }
        
        renderPerformerProcedure(); 
        renderPerformerLog();
        updatePerformerState();
        
        performerControls.classList.add('hidden');

        if (appState.liveDataInterval) clearInterval(appState.liveDataInterval);
        appState.liveDataInterval = setInterval(simulateLiveData, 1000);
    };
    
    const simulateLiveData = () => {
        if (!appState.liveData.jobRunning) {
            clearInterval(appState.liveDataInterval);
            appState.liveDataInterval = null;
            return;
        }

        const step = appState.generatedPlan.procedure.find(s => s.id === appState.liveData.currentStep);
        if (!step) return;

        const stepText = step.text.toLowerCase();
        const targetDepth = 12000;
        let isMoving = false;

        if (stepText.includes('rih')) {
            isMoving = true;
            appState.liveData.speed = 100 + Math.random() * 10 - 5;
            appState.liveData.depth = Math.min(targetDepth, appState.liveData.depth + appState.liveData.speed / 60 * 2); // Simulate 2 sec interval
            if (appState.liveData.depth >= targetDepth) {
                advancePerformerStep();
            }
        } else if (stepText.includes('pooh')) {
            isMoving = true;
            appState.liveData.speed = -100 + Math.random() * 10 - 5;
            appState.liveData.depth = Math.max(0, appState.liveData.depth + appState.liveData.speed / 60 * 2);
             if (appState.liveData.depth <= 0) {
                advancePerformerStep();
            }
        } else if (stepText.includes('spot') || stepText.includes('pump') || stepText.includes('circulate')) {
            appState.liveData.speed = 0;
            appState.liveData.pressure = Math.min(2500, appState.liveData.pressure + 250);
        } else {
             appState.liveData.speed = 0;
             appState.liveData.pressure = Math.max(0, appState.liveData.pressure - 250);
        }
        
        // Handle static steps
        if (!isMoving && (Date.now() - appState.liveData.stepStartTime > 2000)) {
            advancePerformerStep();
        }
        
        const modelPoints = appState.liveData.isRIH ? appState.generatedPlan.tfaModel.slackOff : appState.generatedPlan.tfaModel.pickUp;
        appState.liveData.hookload = interpolate(modelPoints, appState.liveData.depth) + (Math.random() * 0.02 - 0.01);
        if(appState.liveData.depth > 6000 && appState.liveData.depth < 7000 && appState.liveData.isRIH) { appState.liveData.hookload -= 0.05; appState.liveData.npt.operational += 0.005; }
        
        updatePerformerState();
    };

    const updatePerformerState = () => {
        if (!appState.liveData || !appState.generatedPlan) return;
        const isSlickline = appState.generatedPlan.name.toLowerCase().includes('slickline');

        const upperLimit = interpolate(appState.generatedPlan.tfaModel.alarmUpper, appState.liveData.depth);
        const lowerLimit = interpolate(appState.generatedPlan.tfaModel.alarmLower, appState.liveData.depth);
        
        if (appState.liveData.hookload > upperLimit || appState.liveData.hookload < lowerLimit) { 
            if (!appState.liveData.alarmState) { 
                addLogEntry('System', 'ALARM: Primary tension outside envelope!'); 
                appState.liveData.alarmState = true; 
                if (!isSlickline) chartCard.classList.add('alarm'); 
                appState.liveData.npt.equipment += 0.01; 
            } 
        } else { 
            if (appState.liveData.alarmState) { 
                addLogEntry('System', 'INFO: Primary tension back in envelope.'); 
                appState.liveData.alarmState = false; 
                if (!isSlickline) chartCard.classList.remove('alarm'); 
            } 
        }

        kpiHookload.textContent = isSlickline ? (appState.liveData.hookload).toFixed(0) : appState.liveData.hookload.toFixed(1);
        kpiPressure.textContent = Math.round(appState.liveData.pressure); 
        kpiSpeed.textContent = Math.round(appState.liveData.speed); 
        kpiDepth.textContent = Math.round(appState.liveData.depth);
        
        if (appState.tfaChartInstance) {
            const actualData = appState.tfaChartInstance.data.datasets[4].data;
            actualData.push({ x: appState.liveData.depth, y: appState.liveData.hookload }); 
            actualData.sort((a, b) => a.x - b.x);
            if (actualData.length > 500) {
                actualData.splice(0, actualData.length - 500);
            }
            appState.tfaChartInstance.update('none');
        }
    };
    const renderPerformerProcedure = () => {
        const currentStepId = appState.liveData.currentStep;
        procedureStepsContainer.innerHTML = appState.generatedPlan.procedure.map(step => `<div id="step-${step.id}" data-step-id="${step.id}" class="procedure-step p-3 rounded-md ${step.completed ? 'completed' : ''} ${currentStepId === step.id ? 'active' : ''}"><p class="font-semibold text-sm">${step.id}. ${step.text}</p></div>`).join('');
        const activeStepElement = document.getElementById(`step-${currentStepId}`);
        if (activeStepElement) { activeStepElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    };
    const renderPerformerLog = () => { logEntriesContainer.innerHTML = appState.logEntries.slice().reverse().map(entry => `<div class="log-entry p-2"><p class="text-xs text-gray-400">${entry.time.toLocaleTimeString()} - ${entry.user}</p><p class="text-sm">${entry.text}</p></div>`).join(''); logEntriesContainer.scrollTop = 0; };
    const addLogEntry = (user, text) => { if (!text.trim()) return; appState.logEntries.push({ time: new Date(), user, text }); renderPerformerLog(); };
    const advancePerformerStep = () => {
        const current = appState.generatedPlan.procedure.find(s => s.id === appState.liveData.currentStep); if (current) current.completed = true;
        if (appState.liveData.currentStep < appState.generatedPlan.procedure.length) {
            appState.liveData.currentStep++; 
            const next = appState.generatedPlan.procedure.find(s => s.id === appState.liveData.currentStep); 
            addLogEntry('System', `Starting Step ${next.id}: ${next.text}`); 
            appState.liveData.isRIH = next.text.toLowerCase().includes('rih');
            appState.liveData.stepStartTime = Date.now();
        } else { 
            appState.liveData.jobRunning = false; 
            addLogEntry('System', 'Job procedure complete.'); 
            document.getElementById('job-status').textContent = "● JOB COMPLETE"; 
            document.getElementById('job-status').classList.replace('text-emerald-400', 'text-gray-500'); 
            performerControls.classList.remove('hidden'); 
        }
        renderPerformerProcedure();
    };
    const jumpToStep = (targetStepId) => {
        addLogEntry('Operator', `Jumping forward to Step ${targetStepId}.`);
        for (let i = appState.liveData.currentStep; i < targetStepId; i++) {
            const stepToComplete = appState.generatedPlan.procedure.find(s => s.id === i);
            if (stepToComplete) {
                stepToComplete.completed = true;
            }
        }
        appState.liveData.currentStep = targetStepId;
        const newStep = appState.generatedPlan.procedure.find(s => s.id === targetStepId);
        addLogEntry('System', `Starting Step ${targetStepId}: ${newStep.text}`);
        let lastDepth = appState.liveData.depth;
        const previousStep = appState.generatedPlan.procedure.find(s => s.id === targetStepId - 1);
        if (previousStep) {
            const prevStepText = previousStep.text.toLowerCase();
            if (prevStepText.includes('rih')) { lastDepth = 12000; }
            else if (prevStepText.includes('pooh')) { lastDepth = 0; }
        }
        appState.liveData.depth = lastDepth;
        appState.liveData.stepStartTime = Date.now();
        updatePerformerState();
        renderPerformerProcedure();
    };
    function interpolate(points, x) { for (let i = 0; i < points.length - 1; i++) { if (x >= points[i][0] && x <= points[i+1][0]) { return points[i][1] + (points[i+1][1] - points[i][1]) * (x - points[i][0]) / (points[i+1][0] - points[i][0]); } } return points[points.length - 1][1]; }

    // --- ANALYZER LOGIC ---
    const initializeAnalyzer = () => {
        analyzerSubtitle.textContent = `Analysis for ${appState.generatedPlan.name} on ${appState.selectedWell.name}`;
        const plannedDuration = appState.generatedPlan.duration;
        const actualDuration = plannedDuration + appState.liveData.npt.weather + appState.liveData.npt.equipment + appState.liveData.npt.operational;
        const plannedCost = appState.generatedPlan.cost;
        const actualCost = appState.commercial.actualCost;
        const renderKPI = (label, plan, actual) => `<div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-sm font-medium">"${label}"</p><p class="text-lg font-semibold">${actual} <span class="text-sm font-normal">(Plan: ${plan})</span></p></div>`;
        summaryKpis.innerHTML = renderKPI('Job Duration (Days)', plannedDuration.toFixed(1), actualDuration.toFixed(1)) + renderKPI('Total Cost (USD)', `$${plannedCost.toLocaleString()}`, `$${actualCost.toLocaleString()}`);
        if (appState.nptChartInstance) appState.nptChartInstance.destroy();
        const nptCtx = document.getElementById('nptChart').getContext('2d');
        const chartThemeOptions = getChartThemeOptions();
        appState.nptChartInstance = new Chart(nptCtx, { type: 'doughnut', data: { labels: ['Weather', 'Equipment Failure', 'Operational Inefficiency'], datasets: [{ data: [appState.liveData.npt.weather, appState.liveData.npt.equipment, appState.liveData.npt.operational], backgroundColor: ['#3b82f6', '#f97316', '#ef4444'], borderColor: body.classList.contains('theme-dark') ? '#1f2937' : 'white', borderWidth: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: chartThemeOptions.plugins.legend.labels.color } } } } });
        renderLessons();
    };
    const renderLessons = () => { lessonsLearnedList.innerHTML = appState.lessonsLearned.length ? appState.lessonsLearned.map(lesson => `<div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-md"><p>${lesson}</p></div>`).join('') : `<p class="text-center">No lessons learned have been added for this job.</p>`; };
    
    // --- ASSET & POB LOGIC ---
    const renderAssetManagementViews = (eqFilter = '', persFilter = '') => {
        const eqF = eqFilter.toLowerCase();
        equipmentTableBody.innerHTML = equipmentData.map(e => `<tr><td class="p-2">${e.id}</td><td class="p-2">${e.type}</td><td class="p-2">${e.location}</td><td class="p-2"><span class="px-2 py-1 text-xs font-medium rounded-full status-${e.testStatus.toLowerCase()}">${e.testStatus}</span></td><td class="p-2"><button class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 disabled:opacity-50" ${e.location === 'Onboard - Pump Room' && e.testStatus === 'Pending' ? '' : 'disabled'}>Test</button></td></tr>`).join('');
        const persF = persFilter.toLowerCase();
        personnelTableBody.innerHTML = personnelData.filter(p => p.name.toLowerCase().includes(persF) || p.role.toLowerCase().includes(persF)).map(p => `<tr><td class="p-2">${p.name}</td><td class="p-2">${p.role}</td><td class="p-2"><span class="px-2 py-1 text-xs font-medium rounded-full status-${p.status.toLowerCase().replace(/\s/g, '')}">${p.status}</span></td><td class="p-2">${p.certsValid ? '✅ Valid' : '❌ Expired'}</td></tr>`).join('');
    };
    const checkLogistics = () => {
        const conflicts = [];
        const requiredEquipment = equipmentRequirements[appState.selectedObjective.id];

        requiredEquipment.forEach(req => {
            if (req.source === 'Vendor') {
                const availableTool = equipmentData.find(e => e.type === req.name && e.status === 'Available');
                if (!availableTool) {
                    conflicts.push(`No available equipment of type: <strong>${req.name}</strong>. Must be ordered from vendor.`);
                }
            }
        });

        appState.generatedPlan.personnel.forEach(roleName => {
            const availablePerson = personnelData.find(p => p.role === roleName && p.status === 'Available');
            if (!availablePerson) {
                conflicts.push(`No available personnel for role: <strong>${roleName}</strong>.`);
            } else if (!availablePerson.certsValid) {
                conflicts.push(`Personnel <strong>${availablePerson.name} (${roleName})</strong> has expired certifications.`);
            }
        });
        return conflicts;
    };
    const initializePOB = () => {
        appState.pob.personnel = JSON.parse(JSON.stringify(personnelData)).map(p => ({...p, musterStatus: 'Unaccounted'}));
        if(appState.pob.musterInterval) clearInterval(appState.pob.musterInterval);
        appState.pob.musterActive = false;
        renderPOBView();
    };
    const renderPOBView = () => {
        const totalPOB = appState.pob.personnel.length;
        const musteredCount = appState.pob.personnel.filter(p => p.musterStatus === 'Mustered').length;
        musterStations.forEach(ms => { ms.current = appState.pob.personnel.filter(p => p.muster === ms.id && p.musterStatus === 'Mustered').length; });
        const summaryHtml = `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="light-card p-6 text-center rounded-lg"><p class="text-sm font-medium">Total POB</p><p class="text-4xl font-bold">${totalPOB}</p></div><div class="light-card p-6 text-center rounded-lg"><p class="text-sm font-medium">Accounted For</p><p class="text-4xl font-bold text-green-600">${musteredCount}</p></div><div class="light-card p-6 text-center rounded-lg"><p class="text-sm font-medium">Unaccounted For</p><p class="text-4xl font-bold text-red-600">${totalPOB - musteredCount}</p></div></div>`;
        const musterStationHtml = musterStations.map(ms => `<div class="light-card p-4 rounded-lg"><h4 class="font-semibold">${ms.name}</h4><p class="text-sm">Capacity: ${ms.capacity}</p><p class="text-2xl font-bold">${ms.current}</p></div>`).join('');
        const pobTableHtml = `<div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Live POB Manifest</h3><div class="h-96 overflow-y-auto"><table class="w-full text-sm text-left"><thead class="table-header sticky top-0"><tr><th class="p-2">Name</th><th>Company</th><th>Role</th><th>Muster Station</th><th>Status</th></tr></thead><tbody>${appState.pob.personnel.map(p => `<tr class="border-b table-row-alt dark:border-gray-700"><td class="p-2">${p.name}</td><td class="p-2">${p.company}</td><td class="p-2">${p.role}</td><td class="p-2">${p.muster}</td><td class="p-2"><span class="px-2 py-1 text-xs font-medium rounded-full status-${p.musterStatus.toLowerCase().replace(' ', '')}">${p.musterStatus}</span></td></tr>`).join('')}</tbody></table></div></div>`;
        pobContent.innerHTML = `${summaryHtml}<div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="md:col-span-2">${pobTableHtml}</div><div><div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Muster Stations</h3><div class="grid grid-cols-2 gap-4">${musterStationHtml}</div></div><div class="mt-8"><button id="muster-drill-btn" class="w-full rounded-md ${appState.pob.musterActive ? 'bg-red-600 hover:bg-red-500' : 'bg-yellow-500 hover:bg-yellow-400'} px-6 py-3 text-base font-semibold text-white shadow-sm">${appState.pob.musterActive ? 'End Muster Drill' : 'Simulate Emergency Muster'}</button></div></div></div>`;
        document.getElementById('muster-drill-btn').addEventListener('click', toggleMusterDrill);
    };
    const toggleMusterDrill = () => {
        appState.pob.musterActive = !appState.pob.musterActive;
        if (appState.pob.musterActive) {
            headerNav.classList.add('emergency-header');
            appState.pob.musterInterval = setInterval(() => {
                const unaccounted = appState.pob.personnel.filter(p => p.musterStatus === 'Unaccounted');
                if (unaccounted.length > 0) {
                    unaccounted[Math.floor(Math.random() * unaccounted.length)].musterStatus = 'Mustered';
                    renderPOBView();
                } else {
                    clearInterval(appState.pob.musterInterval);
                }
            }, 1000);
        } else {
            clearInterval(appState.pob.musterInterval);
            headerNav.classList.remove('emergency-header');
        }
        renderPOBView();
    };

    // --- COMMERCIAL & HSE LOGIC ---
    const initializeCommercial = () => {
        if (!appState.generatedPlan) { commercialContent.innerHTML = `<p class="text-center">Please generate a plan in the Planner module first to view commercial data.</p>`; return; }
        commercialSubtitle.textContent = `Live financial tracking for ${appState.generatedPlan.name} on ${appState.selectedWell.name}`;
        appState.commercial.afe = appState.generatedPlan.cost;
        appState.commercial.actualCost = 0;
        appState.commercial.serviceTickets = [];
        const equipmentList = equipmentRequirements[appState.selectedObjective.id] || [];
        equipmentList.forEach(item => {
            if (item.price > 0) {
                const cost = item.price * appState.generatedPlan.duration;
                appState.commercial.serviceTickets.push({ description: `Rental: ${item.name} (${item.vendor})`, cost: cost, validated: true });
                appState.commercial.actualCost += cost;
            }
        });
        renderCommercialView();
    };
    const renderCommercialView = () => {
        const afe = appState.commercial.afe, actual = appState.commercial.actualCost;
        const burnPercent = afe > 0 ? Math.min(100, (actual / afe) * 100) : 0;
        const burnColor = burnPercent > 90 ? 'bg-red-500' : burnPercent > 75 ? 'bg-yellow-500' : 'bg-teal-500';
        commercialContent.innerHTML = `<div class="grid gap-8 lg:grid-cols-3"><div class="lg:col-span-2 light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Live AFE vs. Actual</h3><div class="space-y-4"><div class="flex justify-between font-bold text-lg"><span>Actual Cost</span><span>$${actual.toLocaleString()}</span></div><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4"><div class="${burnColor} h-4 rounded-full" style="width: ${burnPercent}%"></div></div><div class="flex justify-between text-sm"><span>Budget (AFE): $${afe.toLocaleString()}</span><span>${burnPercent.toFixed(1)}% Used</span></div></div><h3 class="text-xl font-semibold mt-8 mb-4">Automated Service Tickets</h3><div class="h-64 overflow-y-auto border dark:border-gray-700 rounded-md"><table class="w-full text-sm text-left"><thead class="table-header sticky top-0"><tr><th class="p-2">Description</th><th>Cost</th><th>Status</th></tr></thead><tbody id="service-ticket-body">${appState.commercial.serviceTickets.map(t => `<tr class="border-b table-row-alt dark:border-gray-700"><td class="p-2">${t.description}</td><td class="p-2">$${t.cost.toLocaleString()}</td><td class="p-2"><span class="status-approved px-2 py-1 text-xs font-medium rounded-full">Validated</span></td></tr>`).join('')}</tbody></table></div></div><div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Invoice Validation</h3><p class="text-sm mb-4">Enter a service company invoice amount to check it against validated, system-generated costs.</p><div class="space-y-2"><label for="invoice-amount" class="text-sm font-medium">Invoice Amount (USD)</label><input type="number" id="invoice-amount" class="w-full p-2 rounded-md" placeholder="e.g., 850000"></div><button id="validate-invoice-btn" class="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-blue-500">Validate Invoice</button><div id="invoice-result" class="mt-4"></div></div></div>`;
        document.getElementById('validate-invoice-btn').addEventListener('click', validateInvoice);
    };
    const validateInvoice = () => {
        const invoiceAmount = parseFloat(document.getElementById('invoice-amount').value);
        const validatedCost = appState.commercial.actualCost;
        const resultContainer = document.getElementById('invoice-result');
        if(isNaN(invoiceAmount)) { resultContainer.innerHTML = `<div class="p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-300">Please enter a valid amount.</div>`; return; }
        const difference = invoiceAmount - validatedCost;
        if (Math.abs(difference) < 0.01) { resultContainer.innerHTML = `<div class="p-3 rounded-md bg-green-50 dark:bg-green-900/50 border-l-4 border-green-400 text-green-800 dark:text-green-300"><strong>Match!</strong> Invoice amount of $${invoiceAmount.toLocaleString()} matches validated system cost.</div>`;
        } else { resultContainer.innerHTML = `<div class="p-3 rounded-md bg-red-50 dark:bg-red-900/50 border-l-4 border-red-400 text-red-800 dark:text-red-300"><strong>Discrepancy Found!</strong> Invoice is <strong>$${Math.abs(difference).toLocaleString()} ${difference > 0 ? 'over' : 'under'}</strong> system-validated cost.</div>`; }
    };
    const initializeHSE = () => {
        if (!appState.generatedPlan) { hseContent.innerHTML = `<p class="text-center">Please generate a plan in the Planner module first to view job-specific HSE & Risk data.</p>`; return; }
        hseSubtitle.textContent = `Risk register and permits for ${appState.generatedPlan.name} on ${appState.selectedWell.name}`;
        appState.hse.permits = [ { id: 'PTW001', name: 'General Permit to Work', status: 'Approved' }, { id: 'PTW002', name: 'Hot Work Permit', status: 'Pending' }, { id: 'PTW003', name: 'Confined Space Entry', status: 'Approved' }, ];
        appState.hse.riskRegister = [ { hazard: 'Dropped Objects during Rig Up', consequence: 'Personnel Injury', mitigation: 'Establish exclusion zones; secure all items aloft.', risk: 'Medium' }, { hazard: 'Loss of Containment', consequence: 'Environmental Spill', mitigation: 'Verify PCE integrity; function test all valves.', risk: 'High' } ];
        renderHSEView();
    };
    const renderHSEView = () => {
        const riskRegisterHtml = `<div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Dynamic Risk Register</h3><div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="table-header"><tr><th class="p-2">Hazard</th><th class="p-2">Consequence</th><th class="p-2">Mitigation</th><th class="p-2">Risk Level</th></tr></thead><tbody>${appState.hse.riskRegister.map(r => `<tr class="border-b table-row-alt dark:border-gray-700"><td class="p-2">${r.hazard}</td><td class="p-2">${r.consequence}</td><td class="p-2">${r.mitigation}</td><td class="p-2"><span class="risk-${r.risk.toLowerCase()} px-2 py-1 text-xs font-medium rounded-full">${r.risk}</span></td></tr>`).join('')}</tbody></table></div></div>`;
        const ptwHtml = `<div class="light-card p-6 rounded-lg"><h3 class="text-xl font-semibold mb-4">Permit to Work (PTW) Status</h3><div class="space-y-3">${appState.hse.permits.map(p => `<div class="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md"><span class="font-medium">${p.name}</span><span class="px-2 py-1 text-xs font-medium rounded-full status-${p.status.toLowerCase()}">${p.status}</span></div>`).join('')}</div></div>`;
        hseContent.innerHTML = `<div class="grid gap-8 lg:grid-cols-2">${riskRegisterHtml}${ptwHtml}</div>`;
    };
    
    // --- FAQ LOGIC ---
    const initializeFaqAccordion = () => {
        const accordion = document.getElementById('faq-accordion');
        accordion.innerHTML = faqData.map(item => `
            <div>
                <button class="faq-question flex justify-between items-center">
                    <span>${item.question}</span>
                    <svg class="icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="faq-answer">${item.answer}</div>
            </div>
        `).join('');

        accordion.addEventListener('click', (e) => {
            const questionButton = e.target.closest('.faq-question');
            if (questionButton) {
                const currentlyActive = document.querySelector('.faq-question.active');
                if (currentlyActive && currentlyActive !== questionButton) {
                    currentlyActive.classList.remove('active');
                }
                questionButton.classList.toggle('active');
            }
        });
    };

    // --- MODAL LOGIC ---
    const openModal = (wellId) => {
        const well = wellData.find(w => w.id === wellId); if (!well) return;
        modalTitle.textContent = `Well History & Schematic: ${well.name}`;
        modalContent.innerHTML = `<div class="mb-4 border-b dark:border-gray-700"><nav class="-mb-px flex space-x-8" aria-label="Tabs"><a href="#" class="modal-tab active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="history">History & Schematic</a><a href="#" class="modal-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="reports">Daily Reports</a></nav></div><div id="modal-tab-history"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="md:col-span-2"><h4 class="text-xl font-semibold mb-4">Operational History</h4><div id="history-content" class="max-h-96 overflow-y-auto pr-2"></div></div><div class="md:col-span-1"><h4 class="text-xl font-semibold mb-4">Wellbore Schematic</h4><div class="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-inner border dark:border-slate-700">${renderWellSchematic(well)}</div></div></div></div><div id="modal-tab-reports" class="hidden"><h4 class="text-xl font-semibold mb-4">Daily Reports (from legacy spreadsheets)</h4><div id="reports-content" class="h-96 overflow-y-auto"></div></div>`;
        renderModalTabs(well);
        document.querySelectorAll('.modal-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('modal-tab-history').classList.toggle('hidden', e.target.dataset.tab !== 'history');
                document.getElementById('modal-tab-reports').classList.toggle('hidden', e.target.dataset.tab !== 'reports');
            });
        });
        modal.classList.remove('hidden');
    };
    const renderModalTabs = (well) => {
        document.getElementById('history-content').innerHTML = well.history.length ? well.history.map(h => `
            <div class="p-4 mb-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p class="font-bold text-lg">${h.operation} <span class="text-sm font-normal">- ${h.date}</span></p>
                <div class="mt-3 space-y-3">
                    <div class="flex items-start">
                        <span class="text-xl mr-3">⚠️</span>
                        <div>
                            <strong class="font-semibold text-red-600 dark:text-red-400">Problem:</strong>
                            <p class="text-sm">${h.problem}</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <span class="text-xl mr-3">💡</span>
                        <div>
                            <strong class="font-semibold text-green-600 dark:text-green-400">Lesson Learned:</strong>
                            <p class="text-sm">${h.lesson}</p>
                        </div>
                    </div>
                </div>
            </div>`).join('') : '<p>No historical data available.</p>';
        document.getElementById('reports-content').innerHTML = well.dailyReports.length ? `
            <table class="w-full text-sm text-left">
                <thead class="table-header">
                    <tr>
                        <th class="p-2">Date</th>
                        <th class="p-2">Summary</th>
                        <th class="p-2">NPT (hrs)</th>
                        <th class="p-2">Toolstring Run</th>
                    </tr>
                </thead>
                <tbody>
                    ${well.dailyReports.map(r => `
                        <tr class="border-b table-row-alt dark:border-gray-700">
                            <td class="p-2 align-top">${r.date}</td>
                            <td class="p-2 align-top">${r.summary}</td>
                            <td class="p-2 align-top">${r.npt}</td>
                            <td class="p-2 align-top font-mono text-xs">
                                <ul class="space-y-1">
                                    ${r.toolstringRun.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </td>
                        </tr>`).join('')}
                </tbody>
            </table>` : '<p>No daily reports available.</p>';
    };
    const closeModal = () => modal.classList.add('hidden');
    const renderWellSchematic = (well) => {
        const isDark = body.classList.contains('theme-dark');
        const maxDepth = Math.max(...well.completion.casing.map(c => c.bottom), 18500); // Dynamic max depth
        const scale = 600 / maxDepth;

        let svgContent = `<svg viewBox="0 0 150 600" class="w-full h-auto">`;
        
        // Depth markers
        svgContent += `<g class="schematic-depth-marker" text-anchor="end" fill="${isDark ? '#94a3b8' : '#1d4ed8'}">`;
        for (let d = 0; d <= maxDepth; d += 5000) {
            const y = d * scale;
            svgContent += `<text x="25" y="${y+3}">${d/1000}k</text><line x1="28" y1="${y}" x2="35" y2="${y}" stroke="${isDark ? '#4b5563' : '#d1d5db'}" stroke-width="1"/>`;
        }
        svgContent += `</g>`;

        // Wellbore background
        svgContent += `<rect x="40" y="0" width="100" height="600" fill="${isDark ? '#281e14' : '#eaddc7'}" /><rect x="50" y="0" width="80" height="600" fill="${isDark ? '#3a2d21' : '#d2b48c'}" /><rect x="50" y="20" width="80" height="10" fill="${isDark ? '#4b5563' : '#9ca3af'}"/><rect x="75" y="10" width="30" height="10" fill="${isDark ? '#6b7280' : '#6b7280'}"/>`;
        
        // Components
        well.completion.casing?.forEach(c => { const topY = c.top * scale; const height = (c.bottom - c.top) * scale; svgContent += `<rect x="60" y="${topY}" width="60" height="${height}" fill="none" stroke="${c.isProblem ? '#ef4444' : '#6b7280'}" stroke-width="2"/>`; });
        well.completion.tubing?.forEach(t => { const topY = t.top * scale; const height = (t.bottom - t.top) * scale; svgContent += `<rect x="85" y="${topY}" width="10" height="${height}" fill="${t.isProblem ? 'rgba(239, 68, 68, 0.3)' : (isDark ? '#6b7280' : '#d1d5db')}" stroke="${t.isProblem ? '#ef4444' : (isDark ? '#4b5563' : '#9ca3af')}" stroke-width="0.5"/>`; });
        well.completion.equipment?.forEach(e => { 
            const y = e.top * scale; 
            const fillProblem = 'rgba(239, 68, 68, 0.5)';
            const strokeProblem = '#ef4444';
            const fillNormal = isDark ? '#9ca3af' : '#4b5563';
            const fillSuccess = 'rgba(22, 163, 74, 0.5)';
            const strokeSuccess = '#16a34a';

            if(e.item.includes('Packer')) { svgContent += `<polygon points="75,${y-10} 105,${y-10} 110,${y} 70,${y}" fill="${fillNormal}"/>`; } 
            else if (e.item.includes('SSSV')) { svgContent += `<rect x="82" y="${y}" width="16" height="20" class="${e.isProblem ? 'stroke-red-500 fill-red-200/50' : 'fill-gray-400'}" stroke-width="1"/><path d="M 85 ${y+3} l 10 14 M 85 ${y+17} l 10 -14" stroke="${e.isProblem ? strokeProblem : '#6b7280'}" stroke-width="1.5"/>`; } 
            else if (e.item.includes('Scale')) { svgContent += `<path d="M 85 ${y-10} C 80 ${y}, 80 ${y+10}, 85 ${y+20}" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M 95 ${y-10} C 100 ${y}, 100 ${y+10}, 95 ${y+20}" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/>`; } 
            else if (e.item.includes('Shale')) { svgContent += `<rect x="40" y="${y}" width="100" height="100" fill="rgba(239, 68, 68, 0.1)" /><text x="75" y="${y+50}" class="schematic-label" text-anchor="middle" fill="#ef4444">${e.item}</text>`; }
            else if (e.item.includes('Fish')) { svgContent += `<g transform="translate(90 ${y})"><path d="M-5 -10 L 5 -10 L 3 -5 L -3 -5 Z M-2 -5 L 2 -5 L 2 10 L -2 10 Z" fill="${fillProblem}" stroke="${strokeProblem}" stroke-width="1" /><text x="15" y="5" class="schematic-label" fill="${strokeProblem}">${e.item}</text></g>`; }
            else if (e.item.includes('Tubing Patch')) { svgContent += `<rect x="82" y="${y}" width="16" height="50" fill="${fillSuccess}" stroke="${strokeSuccess}" stroke-width="1.5"/><text x="105" y="${y+25}" class="schematic-label" fill="${strokeSuccess}">${e.item}</text>`}
        });
        well.completion.perforations?.forEach(p => { const topY = p.top * scale; const bottomY = p.bottom * scale; for(let y = topY; y <= bottomY; y += 10) { svgContent += `<path d="M 60 ${y} L 40 ${y}" stroke="${p.isProblem ? '#ef4444' : '#1d4ed8'}" stroke-width="1.5" />`; if(p.isProblem) svgContent += `<path d="M 40 ${y} l 4 4 m -4 0 l 4 -4" stroke="#ef4444" stroke-width="1.5"/>`; } });
        well.completion.plugs?.forEach(p => { const topY = p.top * scale; const height = (p.bottom - p.top) * scale; svgContent += `<rect x="55" y="${topY}" width="70" height="${height}" fill="#a8a29e"/>`; });
        svgContent += `</svg>`; return svgContent;
    };

    // --- THEME & CHART LOGIC ---
    const setTheme = (theme) => {
        body.className = `theme-${theme}`;
        localStorage.setItem('theme', theme);
        if(appState.currentView === 'performer') body.classList.add('theme-dark');

        Object.values(appState).forEach(s => {
            if (s && s instanceof Chart) {
                const chartTheme = getChartThemeOptions();
                s.options.scales.x.grid.color = chartTheme.scales.x.grid.color;
                s.options.scales.x.ticks.color = chartTheme.scales.x.ticks.color;
                s.options.scales.y.grid.color = chartTheme.scales.y.grid.color;
                s.options.scales.y.ticks.color = chartTheme.scales.y.ticks.color;
                if(s.options.plugins.legend) s.options.plugins.legend.labels.color = chartTheme.plugins.legend.labels.color;
                if(s.config.type === 'doughnut') s.data.datasets[0].borderColor = theme === 'dark' ? '#1f2937' : 'white';
                s.update();
            }
        });
    };
    const getChartThemeOptions = () => {
        const isDark = body.classList.contains('theme-dark');
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#d1d5db';
        const textColor = isDark ? '#d1d5db' : '#4b5563';
        return {
            scales: { x: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Depth (ft)', color: textColor } }, y: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Hookload (klbf)', color: textColor } } },
            plugins: { legend: { labels: { color: textColor } } }
        };
    };

    // --- ROI CALCULATOR LOGIC (Home Page) ---
    const engineerCountSlider = document.getElementById('engineerCount');
    const nptReductionSlider = document.getElementById('nptReduction');
    const timeSavingsSlider = document.getElementById('timeSavings');
    const engineerCountValue = document.getElementById('engineerCountValue');
    const nptReductionValue = document.getElementById('nptReductionValue');
    const timeSavingsValue = document.getElementById('timeSavingsValue');
    const totalSavingsValue = document.getElementById('totalSavings');
    const savingsChartCanvas = document.getElementById('savingsChart').getContext('2d');

    const calculateROI = () => {
        if (!engineerCountSlider) return;
        const engineers = parseInt(engineerCountSlider.value);
        const nptReduction = parseInt(nptReductionSlider.value) / 100;
        const timeSavings = parseInt(timeSavingsSlider.value) / 100;

        const avgEngineerSalary = 120000;
        const avgNptCostPerDay = 250000;
        const avgNptDaysPerYear = 15;

        const engineerSavings = engineers * avgEngineerSalary * timeSavings;
        const nptSavings = avgNptCostPerDay * avgNptDaysPerYear * nptReduction;
        const totalSavings = engineerSavings + nptSavings;

        engineerCountValue.textContent = engineers;
        nptReductionValue.textContent = `${nptReduction * 100}%`;
        timeSavingsValue.textContent = `${timeSavings * 100}%`;
        totalSavingsValue.textContent = `$${Math.round(totalSavings).toLocaleString()}`;

        updateSavingsChart(engineerSavings, nptSavings);
    };

    const updateSavingsChart = (engineerSavings, nptSavings) => {
        if(appState.savingsChartInstance) {
            appState.savingsChartInstance.data.datasets[0].data = [engineerSavings, nptSavings];
            appState.savingsChartInstance.update();
        }
    };

    const initSavingsChart = () => {
        if (!savingsChartCanvas) return;
        const isDark = body.classList.contains('theme-dark');
        appState.savingsChartInstance = new Chart(savingsChartCanvas, {
            type: 'bar',
            data: {
                labels: ['Engineering Time', 'NPT Reduction'],
                datasets: [{
                    label: 'Annual Savings',
                    data: [0, 0],
                    backgroundColor: ['#0d9488', '#0891b2'],
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        ticks: {
                            callback: (value) => `$${(value / 1000).toLocaleString()}k`,
                            color: isDark ? '#d1d5db' : '#4b5563'
                        },
                        grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb' }
                    },
                    y: { ticks: { color: isDark ? '#d1d5db' : '#4b5563' }, grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });
        calculateROI();
    };

    if (engineerCountSlider) {
        [engineerCountSlider, nptReductionSlider, timeSavingsSlider].forEach(slider => {
            slider.addEventListener('input', calculateROI);
        });
    }

    // --- EVENT LISTENERS ---
    loginBtn.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            appContainer.classList.add('flex');
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
            switchView('home');
        }, 500);
    });

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(e.currentTarget.id.replace('-nav-link', ''));
        });
    });
    wellSelectionGrid.addEventListener('click', (e) => {
        if (e.target.closest('.view-details-btn')) { e.stopPropagation(); openModal(e.target.closest('.view-details-btn').dataset.wellId); return; }
        const card = e.target.closest('.planner-card'); if (!card) return;
        appState.selectedWell = wellData.find(w => w.id === card.dataset.wellId);
        document.querySelectorAll('.planner-card').forEach(c => c.classList.remove('selected', 'border-red-500', 'border-green-500'));
        card.classList.add('selected');
        if (card.dataset.wellId === 'W666') {
            card.classList.add('border-green-500'); 
        } else {
             card.classList.add('border-teal-500');
        }
        updatePlannerStepUI(2);
    });
    objectivesFieldset.addEventListener('change', (e) => { appState.selectedObjective = objectivesData.find(o => o.id === e.target.value); generatePlanBtnManual.disabled = !appState.selectedObjective; });
    problemsFieldset.addEventListener('change', (e) => {
        appState.ai.selectedProblemId = e.target.value;
        const recommendations = aiRecommendations[appState.ai.selectedProblemId] || [];
        aiRecommendationsContainer.innerHTML = `<h3 class="text-lg font-semibold text-center mb-4 mt-6">AI Recommendations</h3><div class="space-y-4">${recommendations.map((rec, i) => { const objective = objectivesData.find(o => o.id === rec.objectiveId); return `<div class="ai-recommendation-card p-4 rounded-lg" data-rec-index="${i}"><div class="flex justify-between items-start"><h4 class="font-bold text-lg text-teal-700 dark:text-teal-400">${objective.name}</h4><span class="text-sm font-medium">${rec.confidence}% Confidence</span></div><p class="text-sm mt-1"><strong>Projected Outcome:</strong> ${rec.outcome}</p><p class="text-xs mt-2"><strong>Reasoning:</strong> ${rec.reason}</p></div>`; }).join('')}</div>`;
        aiRecommendationsContainer.classList.remove('hidden');
        document.querySelectorAll('.ai-recommendation-card').forEach(card => card.addEventListener('click', (ev) => {
            const selectedCard = ev.target.closest('.ai-recommendation-card');
            const recIndex = parseInt(selectedCard.dataset.recIndex);
            appState.ai.selectedRecommendation = aiRecommendations[appState.ai.selectedProblemId][recIndex];
            document.querySelectorAll('.ai-recommendation-card').forEach(c => c.classList.remove('selected'));
            selectedCard.classList.add('selected');
            generatePlanBtnAi.disabled = false;
        }));
    });
    aiToggle.addEventListener('change', (e) => { manualPlanningView.classList.toggle('hidden', e.target.checked); aiAdvisorView.classList.toggle('hidden', !e.target.checked); });
    generatePlanBtnManual.addEventListener('click', () => { if (!appState.selectedWell || !appState.selectedObjective) return; appState.generatedPlan = proceduresData[appState.selectedObjective.id]; renderPlan(); updatePlannerStepUI(3); });
    generatePlanBtnAi.addEventListener('click', () => { if (!appState.selectedWell || !appState.ai.selectedRecommendation) return; appState.selectedObjective = objectivesData.find(o => o.id === appState.ai.selectedRecommendation.objectiveId); appState.generatedPlan = proceduresData[appState.selectedObjective.id]; renderPlan(); updatePlannerStepUI(3); });
    startOverBtn.addEventListener('click', () => resetApp(false));
    beginOpBtn.addEventListener('click', () => { if (!appState.generatedPlan) return; switchView('performer'); });
    addLogBtn.addEventListener('click', () => { addLogEntry('Operator', logInput.value); logInput.value = ''; });
    procedureStepsContainer.addEventListener('click', (e) => {
        const stepDiv = e.target.closest('.procedure-step');
        if (!stepDiv || !appState.liveData.jobRunning) return;

        const targetStepId = parseInt(stepDiv.dataset.stepId);
        const currentStepId = appState.liveData.currentStep;
        
        if (targetStepId > currentStepId) {
            jumpToStep(targetStepId);
        }
    });
    viewAnalysisBtn.addEventListener('click', () => { switchView('analyzer'); initializeAnalyzer(); });
    addLessonBtn.addEventListener('click', () => { if(lessonInput.value.trim()){ appState.lessonsLearned.push(lessonInput.value.trim()); lessonInput.value = ''; renderLessons(); } });
    planNewJobBtn.addEventListener('click', () => resetApp(true));
    equipmentSearch.addEventListener('input', (e) => renderAssetManagementViews(e.target.value, personnelSearch.value));
    personnelSearch.addEventListener('input', (e) => renderAssetManagementViews( equipmentSearch.value, e.target.value));
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    
    // --- INITIALIZATION ---
    const init = () => {
        renderWellCards();
        renderObjectives();
        renderProblems();
        initSavingsChart();
    };

    init();
});
</script>

</body>
</html>
