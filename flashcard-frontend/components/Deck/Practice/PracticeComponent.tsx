import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback, TextInput } from 'react-native';
import { normalTheme } from '../../theme';
import PracticeHeader from './PracticeHeader';
import PracticeQandA from './PracticeQandA';
import PracticeTextInput from './PracticeTextInput';
import ReviewActionButton from './components/ReviewActionButton';
import PracticeCheckButton from './PracticeCheckButton';
import PracticeReviewActions from './PracticeReviewActions';
 
export default function DefaultComponent({ cards }: any) {

    const [ practiceCard, setPracticeCard ] = useState(cards.length ? cards[0]: {});
    const [ answer, setAnswer ] = useState('');
    const [ currentCardState, setCurrentCardState ] = useState('submit');
    console.log(currentCardState);

  return (
    <View style={styles.defaultComponentWrapper}>
        <PracticeHeader cards={cards} />
        <View style={styles.heroWrapper}>
            <PracticeQandA practiceCard={practiceCard} currentCardState={currentCardState} />
            <PracticeTextInput currentCardState={currentCardState} answer={answer} setAnswer={setAnswer} />
            { currentCardState === 'submit' && <PracticeCheckButton setCurrentCardState={setCurrentCardState} /> }
            { currentCardState === 'review' && <PracticeReviewActions setCurrentCardState={setCurrentCardState} />}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    defaultComponentWrapper: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroWrapper: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
