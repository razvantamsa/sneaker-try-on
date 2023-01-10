import React from 'react'
import { View, StyleSheet } from 'react-native'
import { normalTheme } from '../../theme';
import ReviewActionButton from './components/ReviewActionButton';

export default function PracticeReviewActions({ setCurrentCardState }: any) {
  return (
    <View style={styles.reviewActionsWrapper}>
        <ReviewActionButton text='Easy' backgroundColor={normalTheme.allow} setCurrentCardState={setCurrentCardState}  /> 
        <ReviewActionButton text='Medium' backgroundColor={normalTheme.warning} setCurrentCardState={setCurrentCardState}  /> 
        <ReviewActionButton text='Hard' backgroundColor={normalTheme.danger} setCurrentCardState={setCurrentCardState}  /> 
    </View>
  )
}

const styles = StyleSheet.create({
    reviewActionsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 20,
        padding: 10,
        width: '100%', 
    },
});
