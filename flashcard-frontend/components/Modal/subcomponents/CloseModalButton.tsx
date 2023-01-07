import { Icon } from '@rneui/themed'
import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function CloseModalButton({ closeModalFunction }: any) {
  return (
    <TouchableWithoutFeedback onPress={closeModalFunction}>
        <View style={styles.exitIconWrapper}>
            <Icon name='clear' type='material' color='black' size={20}/>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    exitIconWrapper: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
    },
})
