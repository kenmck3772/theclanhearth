async function getAIResponse(prompt, mode = 'translator') {
    // NOTE: The API key is handled by the environment and should be left as an empty string.
    const apiKey = "AIzaSyC5SosNeTbi0Vc_AjWk2nNZ8jIYcCb6vFE"; 

    if (apiKey === "YOUR_API_KEY_HERE" || !apiKey) {
        return "Och, it seems the API key is missing! The developer needs to add it to the js/api/gemini.js file.";
    }
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let systemPrompt;

    if (mode === 'translator') {
        systemPrompt = `You are a helpful and humorous Scottish translator named "Och, Aye". Your task is to translate the following English phrase into modern, authentic Scottish slang. Be creative and use plenty of colloquialisms. For example, use phrases like 'pure baltic', 'gaun yersel', 'dinnae fash yersel'. The user's phrase is: "${prompt}"`;
    } else if (mode === 'tripPlanner') {
        systemPrompt = `You are a helpful and knowledgeable Scottish tour guide AI named "Aye, Aye". Your task is to respond to the user's request for travel ideas in Scotland. Provide a concise, friendly, and helpful response. If the user asks for a list of places, provide a simple, unnumbered list where each location is on a new line. For example:\nEdinburgh Castle\nStirling Castle\nEilean Donan Castle\nUser's request: "${prompt}"`;
    }

    const payload = {
        contents: [{
            role: "user",
            parts: [{
                text: systemPrompt
            }]
        }]
    };

    // Exponential backoff for retries
    let response;
    let delay = 1000;
    for (let i = 0; i < 5; i++) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                }
            }
        } catch (error) {
             // The request will be retried after the delay
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
    }
    
    throw new Error("Failed to get a response from the AI after multiple retries.");
}
