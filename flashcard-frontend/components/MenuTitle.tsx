import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ILocalProps {
    title: string
}

function MenuTitle({ title }: ILocalProps) {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        // width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        flex: 1,
    },
    textStyle: {
    }
})

export default MenuTitle