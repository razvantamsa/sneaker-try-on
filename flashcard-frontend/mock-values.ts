import { IDeck } from "./interfaces/IDeck";

export const decks: IDeck[] = [
    { id: '1', name: 'JavaScript Questions', createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString(), numberOfCards: 42  },
    { id: '2', name: 'Java Interview Questions', createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString(), numberOfCards: 66  },
    { id: '3', name: 'Crypto', createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString(), numberOfCards: 12  },
    { id: '4', name: 'Spanish - English', createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString(), numberOfCards: 100  },
    { id: '5', name: 'Disertation', createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString(), numberOfCards: 92  },

]