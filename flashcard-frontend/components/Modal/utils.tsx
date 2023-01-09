export function generateAddCardObject(id: number, card: any) {
    return {
        id,
        front: card.front,
        back: card.back,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastPracticed: new Date().toLocaleDateString(),
        timesPracticed: 0,
        isDue: true
    }
}

export function generateEditCardObject(card: any) {
    const editedCard = { ...card };
    delete editedCard.displayType;
    editedCard.updatedAt = new Date().toLocaleDateString();
    return editedCard;
}