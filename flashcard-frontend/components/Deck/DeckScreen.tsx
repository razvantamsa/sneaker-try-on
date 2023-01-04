import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import Header from './subcomponents/Header';
import { generateCards } from '../../mock-values';
import { normalTheme } from '../theme';
import StatsComponent from './Stats/StatsComponent';
import BrowseComponent from './Browse/BrowseComponent';
import PracticeComponent from './Practice/PracticeComponent';
import AddCardModal from '../Modal/AddCardModal';

function DeckScreenOptionButton({ deckScreenOption, setDeckScreenOption, option }: any) {
    return (
        <Button
            onPress={() => setDeckScreenOption(option)}
            title={option}
            color={deckScreenOption === option ? normalTheme.paleLightBlue : normalTheme.lightBlue}

            />
    );
}

export default function DeckScreen({ navigation, route }: any) {
    const [cards, setCards] = useState([]);
    const [searchByName, setSearchByName] = useState('');
    const [addCardModal, setAddCardModal] = useState(false);

    const [deckScreenOption, setDeckScreenOption] = useState('practice');

    useEffect(() => {
      setCards(generateCards(10));
      return () => {
      }
    }, [])    

  return (
    <View style={styles.deckScreenContainer}>
        <AddCardModal isModalVisible={addCardModal} setIsModalVisible={setAddCardModal} deck={route.params.deck} />
        <Header 
            deck={route.params.deck}
        />
        <View style={styles.buttonSelectDisplay}>
            <DeckScreenOptionButton deckScreenOption={deckScreenOption} setDeckScreenOption={setDeckScreenOption} option={'practice'}  />
            <DeckScreenOptionButton deckScreenOption={deckScreenOption} setDeckScreenOption={setDeckScreenOption} option={'browse'}  />
            <DeckScreenOptionButton deckScreenOption={deckScreenOption} setDeckScreenOption={setDeckScreenOption} option={'stats'}  />
        </View>
        <View style={styles.deckScreenLayout}>
            {deckScreenOption === 'default' && <PracticeComponent />}
            {deckScreenOption === 'browse' 
                && <BrowseComponent 
                        cards={cards} 
                        searchByName={searchByName} 
                        setSearchByName={setSearchByName} 
                        setAddCardModal={setAddCardModal}
                        />}
            {deckScreenOption === 'stats' && <StatsComponent />}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    deckScreenContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelectDisplay: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckScreenLayout: {
        flex: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
