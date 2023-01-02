import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import { setNewDeckName } from './utils';

export default function ModalHero({ newDeck, setNewDeck }: any) {

    // TODO: Upload a real csv

  return (
    <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
            <Text style={styles.textModalContainer}>Name: </Text>
            <Text style={styles.textModalContainer}>Upload: </Text>
            <Text style={styles.textModalContainer}>Number of cards: </Text>
        </View>
        <View style={styles.columnContainer}>
            <View style={styles.centralizedCoreContainer}>
                <TextInput style={styles.textInputContainer} placeholder={'Deck Name'} value={newDeck.name} onChangeText={(deckName) => setNewDeckName(deckName, setNewDeck)} />
            </View>
            <View style={[styles.centralizedCoreContainer, {paddingHorizontal: 10}]}>
                <Icon name='upload-file' type='material' color='black' size={20}/>
            </View>
            <Text style={[styles.textModalContainer, {textAlign: 'center'}]}>0</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    centralizedCoreContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textModalContainer: {
        width: '100%',
        fontWeight: '700',
        color: 'black',
    },
    textInputContainer: {
        width: '100%',
        fontWeight: '700',
        color: 'black',
        // backgroundColor: 'gray', 
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    columnContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})
