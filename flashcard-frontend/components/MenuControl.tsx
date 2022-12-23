import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IDeck } from '../interfaces/IDeck'

export default function MenuControl({ decks, navigation }: any) {
  return (
    <View style={styles.controlContainer}>
        <View><Text>Number of decks: {decks.length}</Text></View>
        <Button title='Add' onPress={() => navigation.navigate('Profile')} />
        <Button title='Up' />
        <Button title='Down' />
    </View>
  )
}

const styles = StyleSheet.create({
    controlContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})
