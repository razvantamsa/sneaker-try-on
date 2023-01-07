import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard }from 'react-native';
import { normalTheme } from '../theme';
import DeleteCardForm from './forms/DeleteCardForm';
import CloseModalButton from './subcomponents/CloseModalButton';
import SubmitModalButton from './subcomponents/SubmitModalButton';
import ViewCardForm from './forms/ViewCardForm';
import { generateCardObject } from './utils';
import AddModalForm from './forms/AddModalForm';

export default function CardModal({ 
        isModalVisible, 
        setIsModalVisible, 
        card,
        cards,
        setCards
    }: any) {

    const submitButtonColor = card.displayType === 'delete' ? normalTheme.danger : normalTheme.allow;
    const submitButtonText = card.displayType === 'delete' ? 'Delete': 
            card.displayType === 'view' ? 'Ok' : 'Submit';

    function closeModal() {
        setIsModalVisible({});
    }

    function submitModal() {
        if(card.displayType === 'delete') {
            setCards((prevValue: any) => prevValue.filter((item: any) => item.id !== card.id) );
        }
        if(card.displayType === 'add') {
            if(card.front && card.back) {
                const id = cards.length;
                setCards((prevValue: any) => 
                    [generateCardObject(id, card), ...prevValue]
                );
            }
            Keyboard.dismiss();
        }
        closeModal();
    }

  return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
        >
        <View style={styles.backgroundWrapper}>
            <View style={styles.modalWrapper}>
                <CloseModalButton  closeModalFunction={closeModal} />
                {card.displayType === 'view' && <ViewCardForm card={card}/>}
                {card.displayType === 'add' && <AddModalForm card={card} setCardToDisplay={setIsModalVisible} />}
                {card.displayType === 'delete' && <DeleteCardForm card={card}/>}
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
}) 
