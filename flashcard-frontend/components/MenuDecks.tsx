import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IDeck } from '../interfaces/IDeck'

interface ILocalProps {
    decks: IDeck[]
}

export default function MenuDecks({ decks }: ILocalProps) {
  return (

    <View style={styles.menuDecks}>{decks.map((deck) => 
        <View style={styles.deckContainer}>
            <Text>{deck.name}</Text>
            <Text>{deck.createdAt}</Text>
            <Text>{deck.numberOfCards}</Text>
        </View>
    )}</View>
  )
}

const styles = StyleSheet.create({
    deckContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    menuDecks: {
        flex: 3,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black'
    }
});
