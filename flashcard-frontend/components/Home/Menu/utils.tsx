import { DECKS_DISPLAYED } from "../../theme";

export function moveToNextPage(pagination: number, setPagination: any, numberOfDecks: number) {
    if(pagination + DECKS_DISPLAYED >= numberOfDecks) {
        return;
    }
    setPagination(pagination + DECKS_DISPLAYED);
}

export function moveToPreviousPage(pagination: number, setPagination: any, numberOfDecks: number) {
    if(pagination - DECKS_DISPLAYED < 0) {
        return;
    }
    setPagination(pagination - DECKS_DISPLAYED);
}

export function getDecksToDisplay(decks: any, searchByName: string) {
    return decks.filter((deck: any) => deck.name.includes(searchByName));
}