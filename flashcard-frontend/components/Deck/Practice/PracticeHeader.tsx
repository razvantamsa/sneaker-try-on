import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback, TextInput } from 'react-native';
import { normalTheme } from '../../theme';

export default function PracticeHeader({ cards }: any) {
  return (
    <View style={styles.headerWrapper}>
        <Text style={{fontWeight: '700'}}>Cards due: {cards.length}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
