import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard }from 'react-native';
import { normalTheme } from '../theme';
import DeleteCardForm from './forms/DeleteCardForm';
import CloseModalButton from './subcomponents/CloseModalButton';
import SubmitModalButton from './subcomponents/SubmitModalButton';
import ViewCardForm from './forms/ViewCardForm';
import AddOrEditModalForm from './forms/AddOrEditModalForm';
import { addCard, deleteCard, editCard } from '../../utils/card';

export default function CardModal({ 
        isModalVisible, 
        setIsModalVisible, 
        card,
        setCards
    }: any) {

        
    const headerText = card.displayType === 'add' ? 'Add New Card' : 
        card.displayType === 'edit' ? 'Edit Card' : '';
    const submitButtonColor = card.displayType === 'delete' ? normalTheme.danger :
        card.displayType === 'edit' ? normalTheme.warning : normalTheme.allow;
    const submitButtonText = card.displayType === 'delete' ? 'Delete': 
        card.displayType === 'view' ? 'Ok' : 'Submit';
        
    function closeModal() {
        setIsModalVisible({});
    }

    function submitModal() {
        if(card.displayType === 'delete') {
            deleteCard(card, setCards);
        }
        if(card.displayType === 'add') {
            addCard(card, setCards);
        }
        if(card.displayType === 'edit') {
            editCard(card, setCards);
        }
        Keyboard.dismiss();
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
                    {(card.displayType === 'add' || card.displayType === 'edit') && <AddOrEditModalForm 
                                    card={card} 
                                    setCardToDisplay={setIsModalVisible}
                                    headerText={headerText} />}
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
