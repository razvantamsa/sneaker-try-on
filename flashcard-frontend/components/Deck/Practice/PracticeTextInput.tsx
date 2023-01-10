import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

export default function PracticeTextInput({ currentCardState, answer, setAnswer }: any) {
  return (
    <View style={styles.textInputWrapper}>
        <TextInput style={{
                fontSize: 18, 
                fontWeight: currentCardState === 'submit' ? '500' : '700',
                color: 'black'
            }} 
            editable={currentCardState === 'submit'} 
            value={answer}
            placeholder='Answer'
            onChangeText={(text: string) => setAnswer(text)}
            />
    </View>
  )
}

const styles = StyleSheet.create({
    textInputWrapper: {
        marginVertical: 20,
        padding: 10,
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
}); 
