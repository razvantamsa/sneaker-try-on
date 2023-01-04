import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import { normalTheme } from '../../theme';

export default function DefaultComponent() {

    const cardsDue = Math.floor(Math.random() * 100 % 10);
    console.log(cardsDue);

  return (
    <View style={styles.defaultComponentWrapper}>
        <TouchableWithoutFeedback onPress={() => console.log('Start Practicing')}>
            <View style={{ padding: 30, borderRadius: 5, backgroundColor: normalTheme.allow, margin: 50 }}>
                <Text style={{fontWeight: '700', fontSize: 20}}>Start Practicing</Text>
            </View>
        </TouchableWithoutFeedback>
        <Text style={{fontSize: 15}}>{cardsDue ? `Cards due: ${cardsDue}` : 'No cards due'}</Text>
        {/* <View style={styles.buttonWrapper}>
            <TouchableWithoutFeedback onPress={() => console.log('edit pressed')}>
                <View style={{padding: 5, borderRadius: 20, backgroundColor: normalTheme.warning}}>
                    <Icon name='edit' type='material' color='white' size={30}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log('delete pressed')}>
            <View style={{padding: 5, borderRadius: 20, backgroundColor: normalTheme.danger}}>
                    <Icon name='clear' type='material' color='white' size={30}/>
                </View>
            </TouchableWithoutFeedback>
        </View> */}
        <TouchableWithoutFeedback onPress={() => console.log('Start Practicing')}>
            <View style={{ padding: 30, borderRadius: 5, backgroundColor: normalTheme.danger, margin: 50 }}>
                <Text style={{fontWeight: '700', fontSize: 20}}>Remove Deck</Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    defaultComponentWrapper: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        
        // borderColor: 'black', 
        // borderWidth: 1,
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 50,

        // backgroundColor: 'orange',
    }
});
