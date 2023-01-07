import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function SubmitModalButton({ submitModalFunction, color, text }: any) {
  return (
    <TouchableWithoutFeedback onPress={submitModalFunction}>
        <View style={[styles.submitButtonWrapper, { backgroundColor: color }]}>
            <Text style={{fontWeight: '700'}}>{text}</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    submitButtonWrapper: {
        marginVertical: 20,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
