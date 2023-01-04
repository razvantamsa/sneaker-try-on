import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@rneui/themed';
import { getMonthName, goToNextMonth, goToPreviousMonth } from '../utils';

export default function CalendarControl({monthDisplayed, setMonthDisplayed, setStartDay}: any) {
  return (
    <View style={styles.arrowsContainer}>
        <TouchableWithoutFeedback onPress={() => goToPreviousMonth(monthDisplayed, setMonthDisplayed, setStartDay)}>
            <Icon name='arrow-left' type='material' color='black' size={30} />
        </TouchableWithoutFeedback>
        <Text style={[{ fontWeight: '700', color: 'black' }]}>{getMonthName(monthDisplayed.month) + ' ' + monthDisplayed.year}</Text>
        <TouchableWithoutFeedback onPress={() => goToNextMonth(monthDisplayed, setMonthDisplayed, setStartDay)}>
            <Icon name='arrow-right' type='material' color='black' size={30} />
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    arrowsContainer: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
