import { StyleSheet } from 'react-native';
import spacing from '~theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: spacing.xl,
    },
    formContainer: {
        display: 'flex',
        gap: 12,
        width: '100%',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 12,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    inputError: {
        borderColor: 'red', // Show red border for inputs with errors
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        position: 'absolute',
        bottom: -16, // Place error message below the input field
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
});
