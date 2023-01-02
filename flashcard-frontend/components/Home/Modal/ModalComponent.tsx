import React, { useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import ModalHeader from './ModalHeader';
import ModalHero from './ModalHero';
import ModalButtons from './ModalButtons';

export default function ModalComponent({isAddDeckModalVisible, setIsAddDeckModalVisible, setDecks}: any) {

    const [newDeck, setNewDeck] = useState({
        name: '',
        cards: []
    });

  return (
    <Modal 
        visible={isAddDeckModalVisible}
        transparent={true}
        >
        <View style={styles.modalWrapper}>
            <View style={styles.addDeckModalContainer}>
                <ModalHeader />
                <ModalHero 
                    newDeck={newDeck} 
                    setNewDeck={setNewDeck} 
                    />
                <ModalButtons 
                    newDeck={newDeck} 
                    setNewDeck={setNewDeck}
                    setIsAddDeckModalVisible={setIsAddDeckModalVisible}
                    setDecks={setDecks}
                    />
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalWrapper: {
        backgroundColor: 'white',
        opacity: 0.9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    addDeckModalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})
