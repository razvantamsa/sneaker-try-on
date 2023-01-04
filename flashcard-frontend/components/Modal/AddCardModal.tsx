import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard }from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { normalTheme } from '../theme';
import FormTextInput from './subcomponents/FormTextInput';

export default function AddCardModal({ isModalVisible, setIsModalVisible, deck }: any) {
    const [newCard, setNewCard] = useState({
        id: deck.numberOfCards,
        front: '',
        back: '',
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastPracticed: new Date().toLocaleDateString(),
        timesPracticed: Math.floor(Math.random() * 100),
        isDue: true,
    });

    function updateFrontOfCard(text: string) {
        setNewCard((prevValue) => ({...prevValue, front: text}));
    }

    function clearFrontOfCard() {
        setNewCard((prevValue) => ({...prevValue, front: ''}));
    }

    function updateBackOfCard(text: string) {
        setNewCard((prevValue) => ({...prevValue, back: text}));
    }

    function clearBackOfCard() {
        setNewCard((prevValue) => ({...prevValue, back: ''}));
    }

    // TODO: POST card request...
    function addCardToDeck() {
        console.log(newCard);
        Keyboard.dismiss();
        clearFrontOfCard();
        clearBackOfCard();
        setIsModalVisible(false);
    }

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        >
        <View style={styles.backgroundWrapper}>
            <View style={styles.modalWrapper}>
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={styles.exitIconWrapper}>
                        <Icon name='clear' type='material' color='black' size={20}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.addCardForm}>
                    <View style={{ margin: 20 }}>
                        <Text style={{fontWeight: '700', fontSize: 18}}>Add a New Card</Text>
                    </View>
                    <FormTextInput name={'Front'} value={newCard.front} setValueFunction={updateFrontOfCard} clearValueFunction={clearFrontOfCard} />
                    <FormTextInput name={'Back'} value={newCard.back} setValueFunction={updateBackOfCard} clearValueFunction={clearBackOfCard} />
                </View>
                <TouchableWithoutFeedback onPress={addCardToDeck}>
                    <View style={styles.submitButtonWrapper}>
                       <Text style={{fontWeight: '700'}}>Submit</Text>
                    </View>
                </TouchableWithoutFeedback>
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
    exitIconWrapper: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
    },
    submitButtonWrapper: {
        marginVertical: 20,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: normalTheme.allow
    },
    addCardForm: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formField: {
        flexDirection: 'row',
        width: '80%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}) 
