import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import Deck from '../../models/Deck';
import { normalTheme } from '../theme';
import AddDeckModalForm from './forms/AddDeckModalForm';
import CloseModalButton from './subcomponents/CloseModalButton';
import SubmitModalButton from './subcomponents/SubmitModalButton';

export default function DeckModal({isModalVisible, setDecks, setIsModalVisible}: any) {
    const submitButtonColor = normalTheme.allow;
    const submitButtonText = 'Submit';
    const headerText = 'Add New Deck';

    const [ deck, setDeck ] = useState(new Deck());
    
    function closeModal() {
        setIsModalVisible(false);
        setDeck(new Deck());
    }

    function submitModal() {
        if(!deck.name) { return };
        setDecks((prevValue: any) => [deck, ...prevValue]);
        closeModal();
    }

  
    return (
    <Modal 
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={closeModal}
    >
        <View style={styles.backgroundWrapper}>
            <View style={styles.modalWrapper}>
                <CloseModalButton  closeModalFunction={closeModal} />
                <AddDeckModalForm 
                    deck={deck}
                    setDeck={setDeck}
                    headerText={headerText} 
                    />

                <SubmitModalButton  
                        submitModalFunction={submitModal}
                        color={submitButtonColor}
                        text={submitButtonText}
                        />
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    backgroundWrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8
    },
    modalWrapper: {
        minHeight: 100,
        width: '80%',
        backgroundColor: normalTheme.modalBackground,
        alignItems: 'center',
        justifyContent: 'center',

        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },

    addDeckModalContainer: {},
    textModalHeader: {},
    columnContainer: {},
    rowContainer: {},
    buttonContainer: {},
    textInputContainer: {},
    iconContainer: {},
    textModalContainer: {},
    centralizedCoreContainer: {},
});
