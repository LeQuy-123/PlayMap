import { CardStyleInterpolators, createStackNavigator, TransitionSpecs as StackTransition } from '@react-navigation/stack';
import React from 'react';
import SignInScreen from '~features/auth/SignInScreen';
import SignUpScreen from '~features/auth/SignUpScreen';
import { AuthStackParamList } from '~hooks/useMainNavigation';



const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackButtonDisplayMode: 'minimal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
                open: StackTransition.TransitionIOSSpec,
                close: StackTransition.TransitionIOSSpec,
            },
        }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{
                headerTransparent: true,
                headerTitle: '',
                headerShadowVisible: false,
                headerShown: true,
                headerTintColor: '#fff',
            }} />
        </Stack.Navigator>
    );
};
