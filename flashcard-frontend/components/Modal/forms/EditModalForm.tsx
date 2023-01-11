import React from 'react';
import { View, StyleSheet, Text }from 'react-native';
import FormTextInput from '../subcomponents/FormTextInput';

export default function AddOrEditModalForm({card, setCardToDisplay}: any) {

    function updateFrontOfCard(text: string) {
        setCardToDisplay((prevValue: any) => ({...prevValue, front: text}));
    }

    function clearFrontOfCard() {
        setCardToDisplay((prevValue: any) => ({...prevValue, front: ''}));
    }

    function updateBackOfCard(text: string) {
        setCardToDisplay((prevValue: any) => ({...prevValue, back: text}));
    }

    function clearBackOfCard() {
        setCardToDisplay((prevValue: any) => ({...prevValue, back: ''}));
    }

  return (
    <View style={styles.cardForm}>
        <View style={{ margin: 20 }}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Edit Card</Text>
        </View>
        <FormTextInput name={'Front'} value={card.front} setValueFunction={updateFrontOfCard} clearValueFunction={clearFrontOfCard} />
        <FormTextInput name={'Back'} value={card.back} setValueFunction={updateBackOfCard} clearValueFunction={clearBackOfCard} />
    </View>
    )
}

const styles = StyleSheet.create({
    cardForm: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
