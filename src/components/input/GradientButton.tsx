// components/GradientButton.tsx
import React from 'react';
import {
    TouchableOpacity,
    Text,
    GestureResponderEvent,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import {
    buttonPrimaryStyles,
    buttonPrimaryStylesDisable,
    textStyles,
} from '~theme/components';

type Props = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    spinnerColor?: string;
};

const GradientButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    spinnerColor = '#fff',
}: Props) => {
    const isDisabled = loading || disabled;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
            style={[
                buttonPrimaryStyles,
                style,
                isDisabled && buttonPrimaryStylesDisable,
            ]}>
            {loading ? (
                <ActivityIndicator color={spinnerColor} />
            ) : (
                <Text style={[textStyles.body, {color: 'white'}]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default GradientButton;
