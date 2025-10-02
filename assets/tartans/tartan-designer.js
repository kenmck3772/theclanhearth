function initTartanBuilder() {
    const section = document.getElementById('tartan-designer-section');
    if (!section) return;

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
