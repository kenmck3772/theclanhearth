function initClanFinder() {
    const section = document.getElementById('finder-section');
    if (!section) return;

    const quizQuestions = [
        {
            question: "When facing a great challenge, you rely on:",
            options: {
                "A": { text: "Careful strategy and political skill.", clans: ["campbell", "lindsay"] },
                "B": { text: "Unwavering loyalty to your allies.", clans: ["cameron", "stewart"] },
                "C": { text: "Boldness and a willingness to take risks.", clans: ["armstrong", "macgregor"] },
                "D": { text: "Ancient traditions and the strength of your heritage.", clans: ["donald", "mackenzie"] }
            }
        },
        {
            question: "Your ideal home would be:",
            options: {
                "A": { text: "A grand castle, a center of power and influence.", clans: ["campbell", "douglas"] },
                "B": { text: "A remote fortress, guarding your independence.", clans: ["macleod", "sinclair"] },
                "C": { text: "A fortified tower on a wild frontier.", clans: ["scott", "kerr"] },
                "D": { text: "A coastal stronghold with a fleet of ships at the ready.", clans: ["donald", "maclean"] }
            }
        },
        {
            question: "In a dispute, your first instinct is to:",
            options: {
                "A": { text: "Use the law and negotiation to your advantage.", clans: ["campbell", "murray"] },
                "B": { text: "Gather your allies and prepare for a fight.", clans: ["cameron", "chattan"] },
                "C": { text: "Launch a pre-emptive strike.", clans: ["armstrong", "gordon"] },
                "D": { text: "Consult with the elders and follow tradition.", clans: ["donald", "mackintosh"] }
            }
        },
        {
            question: "You value loyalty to:",
            options: {
                "A": { text: "The central government and the rule of law.", clans: ["campbell", "forbes"] },
                "B": { text: "A charismatic leader and a righteous cause.", clans: ["cameron", "stewart"] },
                "C": { text: "Your immediate family and those who have proven their worth.", clans: ["scott", "macgregor"] },
                "D": { text: "The ancient lineage and heritage of your people.", clans: ["donald", "sinclair"] }
            }
        },
        {
            question: "Your greatest strength is your:",
            options: {
                "A": { text: "Political cunning and strategic mind.", clans: ["campbell", "fraser"] },
                "B": { text: "Unbreakable spirit and devotion to your cause.", clans: ["cameron", "wallace"] },
                "C": { text: "Fierce independence and self-reliance.", clans: ["armstrong", "macleod"] },
                "D": { text: "Deep connection to the past and to the sea.", clans: ["donald", "sinclair"] }
            }
        }
    ];

    let currentQuestion = 0;
    let scores = {};

    function renderQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        const resultContainer = document.getElementById('quiz-result');
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        resultContainer.innerHTML = '';
        currentQuestion = 0;
        scores = {};
        showQuestion(currentQuestion);
    }

    function showQuestion(index) {
        const q = quizQuestions[index];
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-question active animate-fade-in">
                <h3 class="text-2xl font-semibold text-center mb-6">${q.question}</h3>
                <div class="space-y-4">
                    ${Object.keys(q.options).map(key => `
                        <button class="quiz-option block w-full text-left p-4 border-2 border-stone-200 rounded-lg" data-clans='${JSON.stringify(q.options[key].clans)}'>
                            <span class="font-bold">${key}.</span> ${q.options[key].text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    document.getElementById('finder-section').addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-option')) {
            const clans = JSON.parse(e.target.dataset.clans);
            clans.forEach(clanId => {
                scores[clanId] = (scores[clanId] || 0) + 1;
            });

            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                showQuestion(currentQuestion);
            } else {
                showResult();
            }
        }
    });

    function showResult() {
        const quizContainer = document.getElementById('quiz-container');
        const resultContainer = document.getElementById('quiz-result');
        quizContainer.style.display = 'none';

        const topClanId = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b, null);
        const resultClan = clanData.find(c => c.id === topClanId);

        if (resultClan) {
            resultContainer.innerHTML = `
                <h3 class="text-3xl font-bold font-title text-stone-900">Your Spirit Clan is...</h3>
                <h2 class="text-5xl font-bold font-title text-yellow-800 my-4">${resultClan.name}</h2>
                <p class="text-lg text-stone-700 mb-6">${resultClan.mottoLore}</p>
                <button id="restart-quiz-btn" class="bg-yellow-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-900 transition-colors shadow">Take the Quiz Again</button>
            `;
            resultContainer.style.display = 'block';
            resultContainer.classList.add('animate-fade-in');

            document.getElementById('restart-quiz-btn').addEventListener('click', renderQuiz);
        } else {
             resultContainer.innerHTML = `<p class="text-center text-red-500">Could not determine your clan. Please try again!</p>`;
             resultContainer.style.display = 'block';
        }
    }

    renderQuiz();
}
