import React from 'react'
import { StyleSheet, Keyboard, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@rneui/themed';
import { normalTheme } from '../../theme';

export default function MenuActions({ setPagination, searchByName, setSearchByName, setIsAddDeckModalVisible }: any) {

    function searchOnChangeText (text: string) {
        setSearchByName(text)
        setPagination(0);
    }

    function clearSearchBar () {
        setSearchByName('')
        Keyboard.dismiss();   
    }

    function toggleModal() {
        setIsAddDeckModalVisible((prevValue: boolean) => !prevValue)
    }

  return (
    <View style={styles.menuActionsContainer}>
        <View style={styles.textInputContainer}>
            <TextInput 
                style={styles.textInput} 
                placeholder='Search decks' 
                value={searchByName} 
                onChangeText={searchOnChangeText} 
                />
            {searchByName &&  <TouchableWithoutFeedback style={styles.clearTextContainer} onPress={clearSearchBar}>
                    <Icon name='clear' type='material' color='black' size={15}/>
                </TouchableWithoutFeedback>
            }
        </View>
        <TouchableWithoutFeedback style={styles.addDeckButton} onPress={toggleModal}>
            <View style={styles.menuViewItem}>
                <Icon name='add-box' type='material' color={normalTheme.allow} size={30}/>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    menuActionsContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addDeckButton: {
        flex: 1,
    },
    menuViewItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuTextItem: {
        color: 'black',
        fontWeight: '700',
    },
    textInputContainer: {
        flex: 4,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'     
    },
    clearTextContainer: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '90%'  
    },
})
