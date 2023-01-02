import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { normalTheme } from '../../theme';

function getDeckPracticeStatus(deck: any) {
    if(deck.cardsDue <= 5 || deck.cardsDue <= 25/100 * deck.numberOfCards) {
        return normalTheme.allow;
    }
    if(deck.cardsDue <= 50/100 * deck.numberOfCards){
        return normalTheme.warning;
    }
    return normalTheme.danger;
}

export default function MenuDecks({ decks }: any) {
  return (
    <View style={styles.menuDecks}>
        <View style={[styles.tableColumn, {flex: 3}]}>
            {decks.map((deck: any) =>
                <View key={deck.id} style={styles.tableRow}>
                    <Text>{deck.name}</Text>  
                </View>
            )}
        </View>
        <View style={styles.tableColumn}>
            {decks.map((deck: any) => 
                <View key={deck.id} style={styles.tableRow}>
                <Text>{deck.numberOfCards}</Text>  
            </View> 
            )}
        </View>
        <View style={styles.tableColumn}>
            {decks.map((deck: any) => 
                <View key={deck.id} style={styles.tableRow}>
                <Text style={[{color: getDeckPracticeStatus(deck)}]}>{deck.cardsDue}</Text>  
            </View> 
            )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    menuDecks: {
        flex: 3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableColumn: {
        flex: 1,
        height: '100%',
    },
    tableRow: {
        paddingVertical: 15,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
});
