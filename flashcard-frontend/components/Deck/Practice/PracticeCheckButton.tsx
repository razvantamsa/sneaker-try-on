import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { normalTheme } from '../../theme';

export default function PracticeCheckButton({ setCurrentCardState }: any) {
  return (
    <TouchableWithoutFeedback onPress={() => setCurrentCardState('review')}>
        <View style={styles.checkAnswerButton}>
            <Text style={{fontSize: 18}}>Check Answer</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    checkAnswerButton: {
        marginVertical: 50,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: normalTheme.allow
    },
});
