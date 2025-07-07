import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuth} from '~hooks/useAuth';
import {AuthStackParamList} from '~hooks/useMainNavigation';
import BackgroundWrapper from '~components/wrapper/BackgroundWrapper';
import KeyboardWrapper from '~components/wrapper/KeyboardWrapper';
import AuthWrapper from '~components/wrapper/AuthWrapper';
import ControlledInput from '~components/input/ControlledInput';
import {useTranslation} from 'react-i18next';
import ControlledPasswordInput from '~components/input/ControlledPasswordInput';
import {container, formStyle, textStyles} from '~theme/components';
import GradientButton from '~components/input/GradientButton';
// Define the form data type
interface RegisterFormData {
    username: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
}

const SignInScreen = () => {
    const {t} = useTranslation();

    const {registerUser, registerState} = useAuth();
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

    // Use the form with types
    const {control, handleSubmit, setError} = useForm<RegisterFormData>();

    // Custom validation for username, phone number, password, and confirm password
    const validate = (data: RegisterFormData) => {
        const {username, phone_number, password, confirmPassword} = data;

        // Validate username: No special symbols allowed
        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only letters, numbers, and underscores
        if (!username) {
            setError('username', {message: 'Username is required'});
        } else if (!usernameRegex.test(username)) {
            setError('username', {
                message: 'Username must not contain special characters',
            });
        }

        // Validate phone number: Ensure it's a valid phone number (simple regex)
        const phoneRegex = /^[0-9]{10}$/; // Basic 10-digit number
        if (!phone_number) {
            setError('phone_number', {message: 'Phone number is required'});
        } else if (!phoneRegex.test(phone_number)) {
            setError('phone_number', {message: 'Phone number is not valid'});
        }

        // Validate password: At least 6 characters
        if (!password) {
            setError('password', {message: 'Password is required'});
        } else if (password.length < 6) {
            setError('password', {
                message: 'Password must be at least 6 characters long',
            });
        }

        // Validate confirm password: Must match the password
        if (confirmPassword !== password) {
            setError('confirmPassword', {message: 'Passwords do not match'});
        }

        if (
            !username ||
            !phone_number ||
            !password ||
            !confirmPassword ||
            password.length < 6 ||
            !usernameRegex.test(username) ||
            !phoneRegex.test(phone_number) ||
            password !== confirmPassword
        ) {
            return false;
        }
        return true;
    };

    // Handle the register submission (to be filled later)
    const handleRegister: SubmitHandler<RegisterFormData> = data => {
        // Implement your register logic here
        if (validate(data)) {
            registerUser(data.username, data.phone_number, data.password);
        }
    };
    return (
        <BackgroundWrapper>
            <KeyboardWrapper>
                <AuthWrapper wrapperHeight={590}>
                    <View style={container}>
                        <Text style={textStyles.heading}>{t('sign_up')}</Text>

                        {/* Error message */}
                        {/* {registerState.error && <Text style={textStyles.error}>{registerState.error}</Text>} */}

                        <View style={formStyle}>
                            {/* Username Input */}
                            <ControlledInput
                                name="username"
                                control={control}
                                label={t('username')}
                                keyboardType="phone-pad"
                                rules={{required: 'Phone number is required'}}
                            />

                            {/* Phone Number Input */}
                            <ControlledInput
                                name="phone_number"
                                control={control}
                                label={t('phone')}
                                keyboardType="phone-pad"
                                rules={{required: 'Phone number is required'}}
                            />
                            <ControlledPasswordInput
                                name="password"
                                label={t('password')}
                                control={control}
                                rules={{required: 'Password is required'}}
                            />
                            <ControlledPasswordInput
                                name="confirmPassword"
                                label={t('confirmPassword')}
                                control={control}
                                rules={{
                                    required: 'Confirm password is required',
                                }}
                            />
                        </View>

                        {/* Register Button */}
                        <GradientButton
                            title={t('sign_up')}
                            loading={registerState.loading}
                            disabled={registerState.loading}
                            onPress={handleSubmit(handleRegister)}
                            style={{marginTop: 40}}
                        />

                        {/* SignIn Button */}
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 4,
                            }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}>
                                <Text style={textStyles.body}>
                                    {t('have_account_ask')}{' '}
                                    <Text style={textStyles.pressable}>
                                        {t('sign_in')}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AuthWrapper>
            </KeyboardWrapper>
        </BackgroundWrapper>
    );
};

export default SignInScreen;
