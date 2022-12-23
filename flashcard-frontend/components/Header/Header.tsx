import { Icon } from '@rneui/themed'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

type RootStackParamList = {
    YourScreen: { id: number } | undefined;
  };

function Header() {

    const navigation = useNavigation<any>();


  return (
    <View style={styles.headerContainer}>
        <Icon name='home' type='material' color='#00aced' />
        <View style={styles.iconsContainer}>
            <View style={styles.singleIconContainer}>
                <Icon name='account-circle' type='material' color='#00aced' onPress={() => navigation.navigate('Profile')} />
            </View>
            <View style={styles.singleIconContainer}>
                <Icon name='settings' type='material' color='#00aced' onPress={() => navigation.navigate('Settings')} />
            </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    singleIconContainer: {
        // flex: 1,
        paddingRight: 10,
    }
});

export default Header;
