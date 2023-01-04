import React from 'react';
import CalendarCell from './CalendarCell';
import CalendarControl from './CalendarControl';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getFirstWeekdayOfMonth, getNumberOfDaysOfMonth } from '../utils';
import { normalTheme } from '../../theme';

export default function CalendarComponent({ styleProps }: any) {
    const [monthDisplayed, setMonthDisplayed] = useState({
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear(),
    });
    const [startDay, setStartDay] = useState(getFirstWeekdayOfMonth(monthDisplayed.month, monthDisplayed.year));

  return (
    <View style={[styles.statisticsContainer, styleProps]}>
        <CalendarControl monthDisplayed={monthDisplayed} setMonthDisplayed={setMonthDisplayed} setStartDay={setStartDay}/>
        <View style={styles.dailyStatsContainer}>
            {new Array(6).fill(0).map((val, indexRow) => {
                return <View key={indexRow} style={styles.rowContainer}>{new Array(7).fill(0).map((_, indexCol) => 
                        <CalendarCell key={indexRow * 7 + indexCol} dayIndex={indexRow * 7 + indexCol} startDay={startDay} endDay={getNumberOfDaysOfMonth(monthDisplayed.month, monthDisplayed.year)}/>
                    )}</View>
                })
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    statisticsContainer: {
        width: '80%',
        margin: 10,
        marginBottom: 20,
        paddingBottom: 20,
        backgroundColor: normalTheme.statsContainer,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
