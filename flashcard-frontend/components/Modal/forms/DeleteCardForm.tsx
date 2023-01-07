import React from 'react'
import { View, StyleSheet, Text }from 'react-native';

export default function DeleteCardForm({ card }: any) {
  return (
    <View style={styles.cardForm}>
        <View style={{ margin: 20 }}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Delete Card</Text>
        </View>
        <View style={{ margin: 20 }}>
            <Text style={{fontWeight: '700', textAlign: 'center'}}>Are you sure you want to delete the card ~ {card.front} ~</Text>
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
}); 
