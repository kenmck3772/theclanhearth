function initTripPlanner() {
    const sectionEl = document.getElementById('trip-planner-section');
    if (!sectionEl || window.tripPlannerMap) return; // Do not re-initialize

    const tripMap = L.map('map-trip').setView([57.0, -4.5], 6);
    window.tripPlannerMap = tripMap;
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(tripMap);

    const aiChatArea = document.getElementById('ai-chat-area');
    const aiTripInput = document.getElementById('ai-trip-input');
    const aiTripSend = document.getElementById('ai-trip-send');
    const aiTripLoading = document.getElementById('ai-trip-loading');
    const tripListEl = document.getElementById('trip-list');
    const tripCountEl = document.getElementById('trip-count');
    const clearTripBtn = document.getElementById('clear-trip-btn');

    let tripStops = [];
    let tripMarkers = L.layerGroup().addTo(tripMap);

    const addMessageToChat = (message, sender) => {
        const bubble = document.createElement('div');
        bubble.classList.add('flex', 'mb-4');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('rounded-lg', 'py-2', 'px-4', 'max-w-xs');
        messageContent.innerHTML = `<p>${message}</p>`;

        if (sender === 'user') {
            bubble.classList.add('justify-end');
            messageContent.classList.add('chat-bubble-user');
        } else {
            bubble.classList.add('justify-start');
            messageContent.classList.add('chat-bubble-ai');
        }
        
        bubble.appendChild(messageContent);
        aiChatArea.appendChild(bubble);
        aiChatArea.scrollTop = aiChatArea.scrollHeight;
    };

    const handleAiTripRequest = async () => {
        const prompt = aiTripInput.value.trim();
        if (!prompt) return;

        addMessageToChat(prompt, 'user');
        aiTripInput.value = '';
        aiTripLoading.style.display = 'block';
        aiTripSend.disabled = true;

        try {
            const response = await getAIResponse(prompt, 'tripPlanner');
            addMessageToChat(response, 'ai');
            // A simple way to parse locations from the AI response
            const locations = response.split('\n').filter(line => line.trim() !== '');
            if (locations.length > 0) {
                // For now, let's just add the first location as an example
                // A more robust solution would parse all locations and perhaps let the user choose
                // This is a placeholder for geocoding/location finding logic
                showMessage(`Aye, Aye suggests visiting: ${locations.join(', ')}. Add them to your trip manually for now.`);
            }
        } catch (error) {
            console.error("Trip Planner AI error:", error);
            addMessageToChat("Sorry, I'm having a wee bit of trouble thinking of places right now.", 'ai');
        } finally {
            aiTripLoading.style.display = 'none';
            aiTripSend.disabled = false;
        }
    };

    aiTripSend.addEventListener('click', handleAiTripRequest);
    aiTripInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAiTripRequest();
        }
    });

    clearTripBtn.addEventListener('click', () => {
        tripStops = [];
        tripMarkers.clearLayers();
        updateTripList();
    });
    
    function updateTripList() {
        tripCountEl.textContent = tripStops.length;
        if(tripStops.length === 0) {
            tripListEl.innerHTML = `<li>Your trip is empty.</li>`;
            return;
        }
        tripListEl.innerHTML = tripStops.map((stop, index) => `
            <li class="flex justify-between items-center">
                <span>${index + 1}. ${stop.name}</span>
                <button class="remove-stop-btn text-red-500 hover:text-red-700" data-index="${index}">&times;</button>
            </li>
        `).join('');
    }
    
    tripListEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-stop-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            tripStops.splice(index, 1);
            tripMarkers.clearLayers();
            tripStops.forEach(stop => {
                L.marker([stop.lat, stop.lng]).addTo(tripMarkers).bindPopup(stop.name);
            });
            updateTripList();
        }
    });
}
