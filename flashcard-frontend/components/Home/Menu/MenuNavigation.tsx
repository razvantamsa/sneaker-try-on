import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@rneui/themed';
import { moveToNextPage, moveToPreviousPage } from './utils';
import { DECKS_DISPLAYED } from '../../theme';

export default function MenuNavigation({ pagination, setPagination, decks }: any) {

    const CURRENT_PAGE = decks.length ? (pagination / DECKS_DISPLAYED + 1) : 0;
    const NUMBER_OF_PAGES =  decks.length ? 
                    Number.isInteger(decks.length / DECKS_DISPLAYED) ? decks.length / DECKS_DISPLAYED : Math.ceil(decks.length / DECKS_DISPLAYED)
                     : 0;

  return (
    <View style={styles.menuArrowsContainer}>
        <TouchableWithoutFeedback onPress={() => moveToPreviousPage(pagination, setPagination, decks.length)}>
            <Icon name='arrow-left' type='material' color='black' size={30} />
        </TouchableWithoutFeedback>
        <Text style={styles.menuTextItem}>{CURRENT_PAGE}/{NUMBER_OF_PAGES}</Text>
        <TouchableWithoutFeedback onPress={() => moveToNextPage(pagination, setPagination, decks.length)}>
            <Icon name='arrow-right' type='material' color='black' size={30} />
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    menuTextItem: {
        color: 'black',
        fontWeight: '700',
    },
    menuArrowsContainer: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
