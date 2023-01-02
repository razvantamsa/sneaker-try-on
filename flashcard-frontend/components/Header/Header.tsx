import { Icon } from '@rneui/themed'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { normalTheme } from '../theme';

function Header({ isHome }: any) {
    const navigation = useNavigation<any>();


  return (
    <View style={styles.headerContainer}>
        <View style={styles.leftIconsContainer}>
            <View style={styles.singleIconContainer}>
                {!isHome && <Icon name='arrow-back' type='material' color={normalTheme.lightBlue} onPress={() => navigation.goBack()} />}
            </View>
            <View style={styles.singleIconContainer}>
                <Icon name='home' type='material' color={normalTheme.lightBlue} onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
        <View style={styles.rightIconsContainer}>
            <View style={styles.singleIconContainer}>
                <Icon name='account-circle' type='material' color={normalTheme.lightBlue} onPress={() => navigation.navigate('Profile')} />
            </View>
            <View style={styles.singleIconContainer}>
                <Icon name='settings' type='material' color={normalTheme.lightBlue} onPress={() => navigation.navigate('Settings')} />
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
    leftIconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightIconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    singleIconContainer: {
        padding: 5,
    }
});

export default Header;
