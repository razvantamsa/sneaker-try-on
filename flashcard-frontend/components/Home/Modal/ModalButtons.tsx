import React from 'react'
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@rneui/themed';

export default function ModalButtons({ newDeck, setNewDeck, setIsAddDeckModalVisible, setDecks }: any) {

    function createNewDeck() {
        if(!newDeck.name) {
            console.log('Name cannot be empty!');
            return;
        }
        setDecks((prevValue: any) => [
            {
                name: newDeck.name,
                createdAt: new Date().toLocaleDateString(),
                updatedAt: new Date().toLocaleDateString(),
                lastPracticed: new Date().toLocaleDateString(),
                numberOfCards: 0,
                cardsDue: 0,
            },
            ...prevValue, 
        ]);
        closeModal();
    }

    function closeModal() {
        setNewDeck({name: '', cards: []});
        setIsAddDeckModalVisible((prevValue: boolean) => !prevValue)
    }

  return (
    <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={createNewDeck}>
            <View style={styles.iconContainer}>
                <Icon name='add-circle' type='material' color='green' size={40}/>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.iconContainer}>
                <Icon name='cancel' type='material' color='red' size={40}/>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 10,
        padding: 10,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
    },
})
