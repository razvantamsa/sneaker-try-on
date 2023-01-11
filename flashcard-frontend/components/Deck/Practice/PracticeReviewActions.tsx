import React from 'react'
import { View, StyleSheet } from 'react-native'
import { normalTheme } from '../../theme';
import ReviewActionButton from './components/ReviewActionButton';

export default function PracticeReviewActions({ setCurrentCardState, setAnswer }: any) {

    const actionButtons = [
        { text: 'Easy', backgroundColor: normalTheme.allow },
        { text: 'Medium', backgroundColor: normalTheme.warning },
        { text: 'Hard', backgroundColor: normalTheme.danger },
    ]

  return (
    <View style={styles.reviewActionsWrapper}>
        {actionButtons.map(({ text, backgroundColor }: any) => 
            <ReviewActionButton 
                text={text} 
                backgroundColor={backgroundColor} 
                setCurrentCardState={setCurrentCardState} 
                setAnswer={setAnswer}
                /> 
        )}
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
