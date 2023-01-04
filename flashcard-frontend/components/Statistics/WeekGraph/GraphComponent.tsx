import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import { normalTheme } from '../../theme';
import { getLastWeekDependingOnCurrentDay } from '../utils';
import GraphColumn from './GraphColumn';

export default function GraphComponent({ styleProps }: any) {

    const lastWeek: string[] = getLastWeekDependingOnCurrentDay();

  return (
    <View style={[styles.containerWrapper, styleProps]}>
        <View style={styles.textWrapper}>
            <Text style={[{ fontWeight: '700', color: 'black' }]}>Last Week's Stats</Text>
        </View>
        <View style={styles.graphStatisticsWrapper}>
            {new Array(7).fill(0).map((val, index) =>
                <GraphColumn day={lastWeek[index]} key={index}/>
            )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    containerWrapper: {
        width: '80%',
        margin: 10,
        marginBottom: 20,
        paddingBottom: 20,
        backgroundColor: normalTheme.statsContainer,
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphStatisticsWrapper: {
        flex: 3,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    },
    textWrapper: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});
