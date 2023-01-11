import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { generateDecks } from '../../mock-values';
import { deckRequests } from '../../utils/requests';
import DeckModal from '../Modal/DeckModal';
import CalendarComponent from '../Statistics/Calendar/CalendarComponent';
import Menu from './Menu/MenuComponent';

export default function HomeScreen({ navigation }: any) {
    const [ decks, setDecks ] = useState([]);
    const [ isAddDeckModalVisible, setIsAddDeckModalVisible ] = useState(false);
    
    useEffect(() => {
        // TODO: fetch real decks
        const data = deckRequests.getAll();
        setDecks(data);
    }, [])
    

  return (
    <View style={styles.appContainer}>
        <DeckModal 
            isModalVisible={isAddDeckModalVisible} 
            setIsModalVisible={setIsAddDeckModalVisible} 
            setDecks={setDecks}
        />
        <Menu decks={decks} navigation={navigation} isAddDeckModalVisible={isAddDeckModalVisible} setIsAddDeckModalVisible={setIsAddDeckModalVisible} />
        <CalendarComponent styleProps={{flex: 3}} />
    </View>
  )
}

const styles = StyleSheet.create({
    appContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
})

