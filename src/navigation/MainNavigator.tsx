import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainTab';

export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
};
