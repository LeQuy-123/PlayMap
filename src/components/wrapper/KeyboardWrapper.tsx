import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

type Props = {
    children: React.ReactNode;
    behavior?: 'height' | 'position' | 'padding'; // Optional override
    style?: any;
    contentContainerStyle?: any;
};

const KeyboardWrapper = ({
    children,
    behavior = Platform.OS === 'ios' ? 'padding' : undefined,
    style,
    contentContainerStyle,
}: Props) => {
    return (
        <KeyboardAvoidingView
            style={[styles.flex, style]}
            behavior={behavior}
            enabled
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })} // customize if using headers
        >
            <ScrollView
                contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bounces={false}
            >
                <View style={[styles.flex, contentContainerStyle]}>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
});

export default KeyboardWrapper;
