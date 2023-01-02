import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ModalHeader() {
  return (
    <View>
        <Text style={styles.textModalHeader}>Create a New Deck</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textModalHeader: {
        width: '100%',
        fontWeight: '700',
        color: 'black',
        marginBottom: 40,
    },
})

