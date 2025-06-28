import React from 'react';
import { View, TextInput, Text, TextInputProps, TextStyle, StyleSheet } from 'react-native';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { errorMessage, inputStyles, textStyles } from '~theme/components';
import Icon from '@react-native-vector-icons/material-design-icons';

interface ControlledInputProps<TFieldValues extends FieldValues> extends TextInputProps {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    rules?: object;
    isRequired?: boolean;
    label?: string;
    inputStyle?: TextStyle;
    errorStyle?: TextStyle;
    startIcon?: string;
}

function ControlledInput<TFieldValues extends FieldValues>({
    name,
    control,
    label,
    rules = {},
    inputStyle,
    errorStyle,
    isRequired,
    startIcon,
    ...textInputProps
}: ControlledInputProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={{position:'relative', gap: 4}}>
                    {label && (
                        <Text style={textStyles.label}>
                            {label}
                            {isRequired && <Text style={[textStyles.label, {color: 'red'}]}> *</Text>}
                        </Text>
                    )}
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={[
                            inputStyles,
                            inputStyle,
                            error ? { borderColor: 'red' } : null,
                            startIcon ? {paddingLeft: 40} : null,
                        ]}
                        {...textInputProps}
                    />
                    {startIcon ? <View
                        style={styles.startIcon}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={startIcon as any} color="#323232" size={24} />
                    </View> : null}

                    {error && <Text style={[errorMessage, errorStyle]}>{error.message}</Text>}
                </View>
            )}
        />
    );
}

export default ControlledInput;

const styles = StyleSheet.create({
    startIcon: {
        position: 'absolute',
        left: 12,
        bottom: 10,
    },
});
