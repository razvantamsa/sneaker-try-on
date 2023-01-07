import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { normalTheme } from '../../theme';

export default function BrowseActions({ searchByName, setSearchByName, setCardToDisplay }: any) {

    function searchOnChangeText (text: string) {
        setSearchByName(text)
    }

    function clearSearchBar () {
        setSearchByName('')
        Keyboard.dismiss();   
    }

    function setAddCardModal() {
        setCardToDisplay({ displayType: 'add' });
    }

  return (
    <View style={styles.menuActionsContainer}>
        <View style={styles.textInputContainer}>
            <TextInput 
                placeholder='Search cards' 
                value={searchByName} 
                onChangeText={searchOnChangeText} 
                />
            {searchByName &&  <TouchableWithoutFeedback 
                                style={styles.clearTextContainer}
                                onPress={clearSearchBar}
                                >
                    <View style={{padding: 5}}>
                        <Icon name='clear' type='material' color='black' size={15}/>
                    </View>
                </TouchableWithoutFeedback>
            }
        </View>
        <TouchableWithoutFeedback 
            onPress={setAddCardModal}
            >
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
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputContainer: {
        flex: 4,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between' ,    
        marginHorizontal: 10,
    },
    clearTextContainer: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuViewItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})