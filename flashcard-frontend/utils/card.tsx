import uuid from 'react-native-uuid';
import Card from '../models/Card';
import { cardRequests } from './requests';

export function deleteCard(card: any, setCards: any) {
    setCards((prevValue: any) => prevValue.filter((item: any) => item.id !== card.id) );
    cardRequests.delete(card);
}

export function addCard(card: any, setCards: any) {
    const newCard = new Card({id: uuid.v4().toString(), front: card.front, back: card.back});
    setCards((prevValue: any) => [newCard, ...prevValue]);
    cardRequests.post(card);
}

export function editCard(card: any, setCards: any) {
    const newCard = new Card({id: uuid.v4().toString(), front: card.front, back: card.back});
    setCards((prevValue: any) => [newCard, ...prevValue.filter((item: any) => item.id !== card.id)]);
    cardRequests.update(card);
}