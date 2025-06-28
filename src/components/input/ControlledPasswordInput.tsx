import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { errorMessage, inputStyles, textStyles } from '~theme/components';
import Icon from '@react-native-vector-icons/material-design-icons';

interface ControlledPasswordInputProps<TFieldValues extends FieldValues> extends TextInputProps {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    rules?: object;
    isRequired?: boolean;
    label?: string;
    inputStyle?: TextStyle;
    errorStyle?: TextStyle;
    startIcon?: string;
}

function ControlledPasswordInput<TFieldValues extends FieldValues>({
    name,
    control,
    rules = {},
    inputStyle,
    errorStyle,
    isRequired,
    label,
    startIcon,
    ...textInputProps
}: ControlledPasswordInputProps<TFieldValues>) {
    const [secure, setSecure] = useState(true);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={{ position: 'relative', gap: 4 }}>
                    {label && (
                        <Text style={textStyles.label}>
                            {label}
                            {isRequired && <Text style={[textStyles.label, { color: 'red' }]}> *</Text>}
                        </Text>
                    )}
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={secure}
                        style={[
                            inputStyles,
                            inputStyle,
                            error ? { borderColor: 'red' } : null,
                            startIcon ? { paddingLeft: 40 } : null,
                            {paddingRight: 40},
                        ]}
                        {...textInputProps}
                    />
                    {startIcon ? <View
                        style={styles.startBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={startIcon as any} color="#323232" size={24} />
                    </View> : null}
                    <TouchableOpacity
                        onPress={() => setSecure(!secure)}
                        style={styles.toggleButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={secure ? 'eye-off' : 'eye'} color="#323232" size={24} />
                    </TouchableOpacity>

                    {error && <Text style={[errorMessage, errorStyle]}>{error.message}</Text>}
                </View>
            )}
        />
    );
}

export default ControlledPasswordInput;

const styles = StyleSheet.create({
    toggleButton: {
        position: 'absolute',
        right: 12,
        bottom: 10,
    },
    startBtn: {
        position: 'absolute',
        left: 12,
        bottom: 10,
    },
});
