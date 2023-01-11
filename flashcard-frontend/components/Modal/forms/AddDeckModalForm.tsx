import { Icon } from '@rneui/themed';
import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import FormTextInput from '../subcomponents/FormTextInput';
import FormUploadFile from '../subcomponents/FormUploadFile';

export default function AddDeckModalForm({ deck, setDeck, headerText }: any) {

    function updateName(text: string) {
        setDeck((prevValue: any) => ({...prevValue, name: text}));
    }

    function clearName() {
        setDeck((prevValue: any) => ({...prevValue, name: ''}));
    }

  return (
    <View style={styles.cardForm}>
        <View style={{ margin: 20 }}>
            <Text style={{fontWeight: '700', fontSize: 18}}>{headerText}</Text>
        </View>
        <FormTextInput name={'Name'} value={deck.name} setValueFunction={updateName} clearValueFunction={clearName} />
        <FormUploadFile />
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
});
