import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarCell from './CalendarCell';
import { getNumberOfDaysOfMonth } from './utils';

export default function Calendar({startDay, monthDisplayed}: any) {
  return (
    <View style={styles.dailyStatsContainer}>
        {new Array(6).fill(0).map((val, indexRow) => {
            return <View key={indexRow} style={styles.rowContainer}>{new Array(7).fill(0).map((_, indexCol) => 
                    <CalendarCell key={indexRow * 7 + indexCol} dayIndex={indexRow * 7 + indexCol} startDay={startDay} endDay={getNumberOfDaysOfMonth(monthDisplayed.month, monthDisplayed.year)}/>
                )}</View>
            })
        }
    </View>
  )
}


const styles = StyleSheet.create({
    dailyStatsContainer: {
        flex: 4,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
