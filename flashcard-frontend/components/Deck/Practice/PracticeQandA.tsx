import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function PracticeQandA({ practiceCard, currentCardState }: any) {
  return (
    <>
        <View style={styles.cardWrapper}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>{practiceCard.front}</Text>
        </View>
        {currentCardState === 'review' &&
            <View style={styles.cardWrapper}>
                <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '700'}}>{practiceCard.back}</Text>
            </View>}
    </>
  )
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginVertical: 10,
        padding: 10,
    },
});