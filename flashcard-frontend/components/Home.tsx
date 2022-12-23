import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { decks } from '../mock-values';
import MenuControl from './MenuControl';
import MenuDecks from './MenuDecks';
import MenuTitle from './MenuTitle';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.appContainer}>
        <MenuTitle title='Welcome to FlashApp' />
        <MenuControl decks={decks} navigation={navigation} />
        <MenuDecks decks={decks} />
    </View>
  )
}


const styles = StyleSheet.create({
    appContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})

