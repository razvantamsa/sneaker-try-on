import React from 'react';
import { View, StyleSheet, Text }from 'react-native';

export default function ViewCardForm({ card }: any) {

  return (
    <View style={styles.cardForm}>
        <View style={{ margin: 20 }}>
            <Text style={{fontWeight: '700', fontSize: 18}}>View Card</Text>
        </View>
        <View style={{ margin: 20 }}>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Front: {card.front}</Text>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Back: {card.back}</Text>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Created At: {card.createdAt}</Text>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Last Updated: {card.updatedAt}</Text>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Last Practiced: {card.lastPracticed}</Text>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Times Practiced: {card.timesPracticed}</Text>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Is Due: {card.isDue ? 'yes' : 'no'}</Text>
        </View>
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
}) 
