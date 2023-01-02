import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MenuDecks from './MenuDecks';
import { DECKS_DISPLAYED } from '../../theme';
import { getDecksToDisplay } from './utils';
import MenuActions from './MenuActions';
import MenuNavigation from './MenuNavigation';

export default function Menu({ decks, navigation, setIsAddDeckModalVisible }: any) {
    const [pagination, setPagination] = useState(0);
    const [searchByName, setSearchByName] = useState('');

    function displayOnlyOnePage() {
        const startingPointSlice = pagination;
        const endingPointSlice = Math.min(pagination + DECKS_DISPLAYED, getDecksToDisplay(decks, searchByName).length);
        return getDecksToDisplay(decks, searchByName).slice(startingPointSlice, endingPointSlice);
    }

  return (
    <View style={[{ flex: 3, width: '80%' }]}>
        <View style={styles.menuControlContainer}>
            <MenuActions 
                setPagination={setPagination}
                searchByName={searchByName} 
                setSearchByName={setSearchByName} 
                navigation={navigation}
                setIsAddDeckModalVisible={setIsAddDeckModalVisible}
                />
            <MenuNavigation 
                pagination={pagination} 
                setPagination={setPagination} 
                decks={getDecksToDisplay(decks, searchByName)} 
                />
        </View>
        <MenuDecks 
            decks={displayOnlyOnePage()} 
            />
    </View>
  )
}

const styles = StyleSheet.create({
    menuControlContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})