import db from "./mockDatabase";

export const deckRequests = {
    getAll() {
        // TODO: connect to backend
        console.log('GET all decks');
        return db.decks;
    },
    post() {
        // TODO: connect to backend
        console.log('POST deck')
    },

    get() {
        // TODO: connect to backend
        console.log('GET deck')
    },

    update() {
        // TODO: connect to backend
        console.log('UPDATE deck')
    },

    delete() {
        // TODO: connect to backend
        console.log('DELETE deck')
    }
}

export const cardRequests = {
    post(card: any) {
        // TODO: connect to backend
        console.log(`ADD card ${card.id}`)
    },

    get(card: any) {
        // TODO: connect to backend
        console.log('GET card')
    },

    update(card: any) {
        // TODO: connect to backend
        console.log(`UPDATE card ${card.id}`)
    },

    delete(card: any) {
        // TODO: connect to backend
        console.log(`DELETE card ${card.id}`)
    } 
}