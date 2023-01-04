import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { normalTheme } from '../../theme';
import { newShade } from '../utils';

export default function GraphColumn({ day }: any) {

    const dayAttemts = Math.floor(Math.random() * 100);
    const successPercentage = Math.floor(Math.random() * 100);

    // console.log(day, dayAttemts, successPercentage, successPercentage * dayAttemts / 100);

  return (
    <View style={styles.dayColumnWrapper}>
        <View style={[styles.dayColumnTotal, { height: `${dayAttemts}%`}]}>
            <View style={[styles.dayColumnSuccess, { height: `${successPercentage * dayAttemts / 100}%`}]}></View>
        </View>
        <View style={styles.textWrapper}>
            <Text>{day.slice(0,3)}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    dayColumnWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    textWrapper: {
        backgroundColor: newShade(normalTheme.allow, -40, true),
        width: '100%',
        margin: 0,
        padding: 0,
    },
    dayColumnTotal: {
        backgroundColor: newShade(normalTheme.allow, -10, true),
        width: '100%',
        padding: 0,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }, 
    dayColumnSuccess: {
        backgroundColor: newShade(normalTheme.allow, -40, true),
        width: '100%',
        padding: 0,
        margin: 0,
    },
});
