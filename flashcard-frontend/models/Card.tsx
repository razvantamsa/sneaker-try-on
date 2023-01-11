import uuid from 'react-native-uuid';

export default class Card {
    id: string = uuid.v4().toString();
    front: string = '';
    back: string = '';
    createdAt: string = new Date().toLocaleDateString();
    updatedAt: string = new Date().toLocaleDateString();
    lastPracticed: string = new Date().toLocaleDateString();
    timesPracticed: number = 0;
    isDue: boolean = true;
    constructor(cardDetails: Partial<Card> = {}) {
        const result = (Object.keys(cardDetails) as Array<keyof Partial<Card>>).reduce((acc, key) => ({
            ...acc, [key]: cardDetails[key]
            }), this);
        Object.assign(this, result);
    }
}