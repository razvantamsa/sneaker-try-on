import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { normalTheme } from '../../theme';

export default function Header({ deck }: any) {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{deck.name}</Text>
        {/* <View style={styles.menuViewItem}>
            <TouchableWithoutFeedback onPress={() => console.log('edit pressed')}>
              <Icon name='edit' type='material' color={normalTheme.warning} size={30}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log('delete pressed')}>
                <Icon name='clear' type='material' color={normalTheme.danger} size={30}/>
            </TouchableWithoutFeedback>
        </View> */}
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
