import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import { normalTheme } from '../../../theme';

export default function ReviewActionButton({ text, backgroundColor, setCurrentCardState, setAnswer }: any) {
    return (
        <TouchableWithoutFeedback onPress={() => {
            console.log(`action chosen: ${text}`);
            setCurrentCardState('submit');
            setAnswer('');
            // setPracticeCard
        }}>
            <View style={[ styles.reviewActionButton, { backgroundColor } ]}>
                <Text>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    reviewActionButton: {
        marginVertical: 50,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});