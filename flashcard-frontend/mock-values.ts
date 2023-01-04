const possibleDeckNames = [
    'Romanian',
    'English',
    'German',
    'Spanish',
    'English-Spanish',
    'English-Romanian',
    'English-German',
    'German-Spanish',
    'German-French',
    'German-Romanian',
    'French-Italian',
    'Networking',
    'Firewalls 101',
    'JavaScript Shortcuts',
    'AlgoExpert',
    'Trading Terminology'
]

function generateDeckName() {
    const id = Math.floor(Math.random() * possibleDeckNames.length);
    return possibleDeckNames[id];
}

export function generateDecks(numberOfDecks: number) {
    const decks: any = [];

    [...Array(numberOfDecks).keys()].forEach((id) => {
        const newDeck: any = { id };
        newDeck.name = generateDeckName();
        newDeck.createdAt = new Date().toLocaleDateString();
        newDeck.updatedAt = new Date().toLocaleDateString();
        newDeck.lastPracticed = new Date().toLocaleDateString();
        newDeck.numberOfCards = Math.floor(Math.random() * 100);
        newDeck.cardsDue = Math.floor(Math.random() * newDeck.numberOfCards);
        decks.push(newDeck);
    })

    return decks;
}

export function generateCards(numberOfCards: number) {
    const cards: any = [];

    [...Array(numberOfCards).keys()].forEach((id) => {
        const newCard: any = { id };
        newCard.front = `Question ${id}`;
        newCard.back = `Answer ${id}`;
        newCard.createdAt = new Date().toLocaleDateString();
        newCard.updatedAt = new Date().toLocaleDateString();
        newCard.lastPracticed = new Date().toLocaleDateString();
        newCard.timesPracticed = Math.floor(Math.random() * 100);
        newCard.isDue = Math.random() < 0.5;
        cards.push(newCard);
    })

    return cards;
}