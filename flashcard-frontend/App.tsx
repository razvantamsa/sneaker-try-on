import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';

const Stack = createStackNavigator();

export default function App() {
    const options: object = { headerTitle: () => <Header /> }
    
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={options}/>
            <Stack.Screen name="Profile" component={Profile} options={options} />
            <Stack.Screen name="Settings" component={Settings} options={options} />
            {/* // <Stack.Screen name="Deck" component={Deck}  />
            // <Stack.Screen name="Card" component={Card}  /> */}
        </Stack.Navigator>
    </NavigationContainer>
    );
}
