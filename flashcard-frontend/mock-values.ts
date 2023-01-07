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

const possibleCardFrontBack = [
    { front: 'Who is the best striker', back: 'Yoichi isagi' },
    { front: 'Whos the main character of Naruto', back: 'Saszuke' },
    { front: 'What is 2+2', back: '4' },
    { front: 'Parles vous french', back: 'Neein' },
    { front: 'Speak', back: 'Biitch' },
    { front: 'JJBA', back: 'Araki' },
    { front: 'I watch the moon', back: 'Le mond' },
    { front: 'Polaroid camera', back: 'Snapchat' },
    { front: 'Who is the first president of USA', back: 'LeBron James' },
    { front: 'Height of Everest', back: '20CM records' },
    { front: 'Whats the last name of Obama', back: 'Obamacare' },
    { front: 'What does bts mean?', back: 'Boli cu transmitere sexuala' },
    { front: 'Nokia vs blckbrry', back: 'Blckbrry' },
    { front: 'How many apples can you eat in one hour', back: 'Many' },
    { front: 'Can people fly', back: 'BAN-KAI' },
    { front: 'Feliz Navidad', back: 'Prospero Ano Nuevo' },
    { front: 'DKYAUSS', back: 'Dont Kill Yourself You Are So Sexy' },
    { front: 'HESOYAM', back: '25k + armor + full health' },
    { front: 'AEZAKMI', back: 'No police' },
    { front: 'Best chocolate', back: 'Tomberon' },
    { front: 'Apple bottom jeans', back: 'Buts with the furr' },
    { front: 'If im a bitch', back: 'Then im the baddest bitch' },
    { front: 'Rahat turcesc', back: 'Turkish shit' },
    { front: 'Capital of Romania', back: 'Budapest aa I mean Bucharest' },
    { front: 'Whats the longest river in the world?', back: 'Nileussy' },
]

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

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
        const newCardQuestionIndex = getRandomInt(possibleCardFrontBack.length);
        newCard.front = possibleCardFrontBack[newCardQuestionIndex].front;
        newCard.back = possibleCardFrontBack[newCardQuestionIndex].back;
        newCard.createdAt = new Date().toLocaleDateString();
        newCard.updatedAt = new Date().toLocaleDateString();
        newCard.lastPracticed = new Date().toLocaleDateString();
        newCard.timesPracticed = Math.floor(Math.random() * 100);
        newCard.isDue = Math.random() < 0.5;
        cards.push(newCard);
    })

    return cards;
}