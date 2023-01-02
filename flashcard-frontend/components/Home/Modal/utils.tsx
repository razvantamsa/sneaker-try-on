export function setNewDeckName(deckName: any, setNewDeck: any) {
    setNewDeck((prevValue: any) => ({...prevValue, name: deckName}))
}