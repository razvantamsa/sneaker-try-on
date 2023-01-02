import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { generateDecks } from '../../mock-values';
import Menu from './Menu/MenuComponent';
import StatisticsComponent from './Statistics/StatisticsComponent';
import ModalComponent from './Modal/ModalComponent';

export default function HomeScreen({ navigation }: any) {

    const [ decks, setDecks ] = useState([]);
    const [ isAddDeckModalVisible, setIsAddDeckModalVisible ] = useState(false);
    
    useEffect(() => {
        // TODO: fetch real decks
        setDecks(generateDecks(12));
    }, [])
    

  return (
    <View style={styles.appContainer}>
        <ModalComponent setDecks={setDecks} isAddDeckModalVisible={isAddDeckModalVisible} setIsAddDeckModalVisible={setIsAddDeckModalVisible} />
        <Menu decks={decks} navigation={navigation} isAddDeckModalVisible={isAddDeckModalVisible} setIsAddDeckModalVisible={setIsAddDeckModalVisible} />
        <StatisticsComponent />
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

