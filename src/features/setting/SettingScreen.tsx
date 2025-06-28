import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '~hooks/useAuth';

const SettingScreen = () => {
    const { logoutUser, user } = useAuth();

    return (
        <View>
            <Text>SettingScreen</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="Logout" onPress={logoutUser} />
        </View>
    );
};

export default SettingScreen;
