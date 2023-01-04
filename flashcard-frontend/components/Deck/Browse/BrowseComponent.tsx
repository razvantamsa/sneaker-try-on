import React from 'react';
import BrowseActions from './BrowseActions';
import BrowseCardsList from './BrowseCardsList';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'

export default function BrowseComponent({ searchByName, setSearchByName, cards, setAddCardModal }: any) {

    const filteredCards = cards.filter((cards: any) => cards.front.includes(searchByName));

  return (
    <>
        <View style={styles.textWrapper}>
            <Text style={{fontWeight: '700'}}>Total amount of cards: {filteredCards.length}</Text>
        </View>
        <BrowseActions searchByName={searchByName} setSearchByName={setSearchByName} setAddCardModal={setAddCardModal} />
        <BrowseCardsList cards={filteredCards}/>
    </>
  )
}

const styles = StyleSheet.create({
    textWrapper: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});