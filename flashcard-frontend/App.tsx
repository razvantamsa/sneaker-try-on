import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/Home/HomeScreen';
import CreateDeckScreen from './components/Deck/CreateDeckScreen';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';

const Stack = createStackNavigator();

export default function App() {
    const options: any = { 
        homeHeader: {
            headerLeft: null,
            headerTitle: () => <Header isHome={true} />
        },
        pageHeader: {
            headerLeft: null,
            headerTitle: () => <Header isHome={false} />
        }
    }
    
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={options.homeHeader}/>
            <Stack.Screen name="Profile" component={Profile} options={options.pageHeader} />
            <Stack.Screen name="Settings" component={Settings} options={options.pageHeader} />
            <Stack.Screen name="CreateDeck" component={CreateDeckScreen} options={options.pageHeader} />
            {/* // <Stack.Screen name="Deck" component={Deck}  />
            // <Stack.Screen name="Card" component={Card}  /> */}
        </Stack.Navigator>
    </NavigationContainer>
    );
}
