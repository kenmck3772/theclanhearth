// This file contains all the data for the Clan Hearth website.

const TRAITS = {
    STRATEGIC: 'strategic', LOYAL: 'loyal', FIERCE: 'fierce', TRADITIONALIST: 'traditionalist',
    DIPLOMATIC: 'diplomatic', RESILIENT: 'resilient', BOLD: 'bold', GUARDIAN: 'guardian',
    AMBITIOUS: 'ambitious', INDEPENDENT: 'independent', LAWFUL: 'lawful', ARTISTIC: 'artistic',
    PIONEERING: 'pioneering', SECRETIVE: 'secretive', WARRIOR: 'warrior'
};

const CLAN_DATA = [
    {
        id: "campbell", name: "Clan Campbell", vibe: "The Politician. Cunning, strategic, and ambitious.",
        traits: [TRAITS.STRATEGIC, TRAITS.DIPLOMATIC, TRAITS.AMBITIOUS, TRAITS.LAWFUL]
    },
    {
        id: "donald", name: "Clan Donald", vibe: "The Sea King. Independent, traditional, and fierce.",
        traits: [TRAITS.TRADITIONALIST, TRAITS.INDEPENDENT, TRAITS.FIERCE, TRAITS.GUARDIAN]
    },
    // ... and so on for all 23 clans from the previous code ...
    {
        id: "lamont", name: "Clan Lamont", vibe: "The Ancient Survivor. Deeply rooted in tradition, resilient, and artistic.",
        traits: [TRAITS.TRADITIONALIST, TRAITS.RESILIENT, TRAITS.ARTISTIC, TRAITS.SECRETIVE]
    }
];

const QUIZ_QUESTIONS = [
    {
        question: "When faced with a great challenge, you primarily rely on:",
        options: [
            { text: "Careful, long-term strategy.", traits: [TRAITS.STRATEGIC, TRAITS.DIPLOMATIC] },
            { text: "The unwavering support of your friends and family.", traits: [TRAITS.LOYAL, TRAITS.GUARDIAN] },
            { text: "A bold, decisive, and immediate action.", traits: [TRAITS.BOLD, TRAITS.FIERCE] },
            { text: "Your own resilience and ability to endure.", traits: [TRAITS.RESILIENT, TRAITS.INDEPENDENT] }
        ]
    },
    // ... all 10 questions from the previous code ...
];