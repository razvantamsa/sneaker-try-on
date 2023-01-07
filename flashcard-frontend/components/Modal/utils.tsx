export function generateCardObject(id: number, card: any) {
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