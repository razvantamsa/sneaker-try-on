import uuid from 'react-native-uuid';

export default class Deck {
    id: string = uuid.v4().toString();
    name: string = '';
    createdAt: string = new Date().toLocaleDateString();
    updatedAt: string = new Date().toLocaleDateString();
    lastPracticed: string = new Date().toLocaleDateString();
    numberOfCards: number = 0;
    cardsDue: number = 0;
    constructor(deckDetails: Partial<Deck> = {}) {
        const result = (Object.keys(deckDetails) as Array<keyof Partial<Deck>>).reduce((acc, key) => ({
            ...acc, [key]: deckDetails[key]
            }), this);
        Object.assign(this, result);
    }
}