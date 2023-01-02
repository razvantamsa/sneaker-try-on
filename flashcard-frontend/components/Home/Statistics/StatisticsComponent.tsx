import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Calendar from './Calendar';
import { getFirstWeekdayOfMonth } from './utils';
import CalendarControl from './CalendarControl';

export default function StatisticsComponent() {

    const [monthDisplayed, setMonthDisplayed] = useState({
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear(),
    });
    const [startDay, setStartDay] = useState(getFirstWeekdayOfMonth(monthDisplayed.month, monthDisplayed.year));
    
  return (
    <View style={styles.statisticsContainer}>
        <CalendarControl monthDisplayed={monthDisplayed} setMonthDisplayed={setMonthDisplayed} setStartDay={setStartDay}/>
        <Calendar startDay={startDay} monthDisplayed={monthDisplayed} />
    </View>
  )
}

const styles = StyleSheet.create({
    statisticsContainer: {
        flex: 2,
        width: '80%',
        margin: 10,
        marginBottom: 20,
        paddingBottom: 20,
        backgroundColor: '#ccf0ea',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
