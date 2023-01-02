import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { normalTheme } from '../../theme';
import { newShade } from './utils';

function getRandomColorIndex() {
    let colorIndex = Math.floor(Math.random() * 10);
    if(colorIndex <= 5) {
        colorIndex = -1 * (10 - colorIndex);
    }
    return -10 * colorIndex;
}

export default function CalendarCell({dayIndex, startDay, endDay}: any) {

    // TODO: replace by number of cards practiced that day
    const colorIndex = getRandomColorIndex();
    const isCalendarDay = dayIndex >= startDay &&  dayIndex < (endDay + startDay);

    return (
        <View style={[styles.calendarCell, { backgroundColor: newShade(normalTheme.allow, colorIndex, isCalendarDay) }]}>
            {isCalendarDay && <Text>{dayIndex - startDay + 1}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    calendarCell: {
        width: "10%",
        height: "80%",
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
});
