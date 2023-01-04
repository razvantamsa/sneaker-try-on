import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import CalendarComponent from '../../Statistics/Calendar/CalendarComponent';
import GraphComponent from '../../Statistics/WeekGraph/GraphComponent';

export default function DeckStatsComponent() {

  return (
    <View style={styles.deckStatisticsWrapper}>
        <View style={styles.textStatisticsWrapper}>
            <Text style={{ fontWeight: '700', textAlign: 'center' }}>Average cards practiced per day: X</Text>
            <Text style={{ fontWeight: '700', textAlign: 'center' }}>Average success rate: X%</Text>
        </View>
        <CalendarComponent styleProps={{flex: 3}} />
        <GraphComponent styleProps={{flex: 3}} />
    </View>
  )
}

const styles = StyleSheet.create({
    deckStatisticsWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStatisticsWrapper: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
    }
});
