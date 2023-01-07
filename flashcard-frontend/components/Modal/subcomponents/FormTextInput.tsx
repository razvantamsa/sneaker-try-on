import { Icon } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';

export default function FormTextInput({name, value, setValueFunction, clearValueFunction}: any) {
    return (
        <View 
            style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                <Text style={{fontWeight: '700'}}>{name}: </Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={{width: '80%'}} placeholder={name} value={value} onChangeText={setValueFunction} />
                    {!!value && 
                    <TouchableWithoutFeedback onPress={clearValueFunction}>
                        <View style={styles.clearIconWraper}>
                          <Icon name='clear' type='material' color='black' size={15}/>
                        </View>
                    </TouchableWithoutFeedback>}
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        padding: 5, 
        width: '100%',
        marginBottom: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5,
    },
    clearIconWraper: {
        position: 'absolute',
        right: 0,
        padding: 10,
    }

}) 