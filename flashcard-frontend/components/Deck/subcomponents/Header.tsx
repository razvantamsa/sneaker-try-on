import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({ deck }: any) {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{deck.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 20
    },
    menuViewItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
