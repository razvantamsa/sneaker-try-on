import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { normalTheme } from '../../theme';

export default function BrowseCardsList({ cards, cardToDisplay, setCardToDisplay }: any) {
    function setDeleteCardModal(card: any) {
        setCardToDisplay({
            ...card,
            displayType: 'delete',
        })
    }

    function setViewCardModal(card: any) {
        setCardToDisplay({
            ...card,
            displayType: 'view',
        })
    }

  return (
    <View style={styles.menuDecks}>
        <ScrollView style={{ width: '100%'}}>
            {cards.map((card: any) =>
                <TouchableWithoutFeedback key={card.id} onPress={() => setViewCardModal(card)}>
                    <View key={card.id} style={styles.tableRow}>
                        <View style={styles.leftSideContent} >
                            <Text>{card.front}</Text> 
                        </View>
                        <View style={styles.rightSideContent} >
                            <TouchableWithoutFeedback onPress={() => console.log('edit pressed')}>
                                <View style={{padding: 5}}>
                                    <Icon name='edit' type='material' color={normalTheme.warning} size={20}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setDeleteCardModal(card)}>
                               <View style={{padding: 5}}>
                                    <Icon name='clear' type='material' color={normalTheme.danger} size={20}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
            {!cards.length && 
                <View style={{marginTop: 50,alignItems: 'center', justifyContent: 'center'}}>
                    <Text>No cards</Text>
                </View>}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    menuDecks: {
        flex: 4,
        width: '80%',
        marginBottom: 100,
    },
    tableRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        width: '100%',
        padding: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    leftSideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightSideContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }

});