import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '~hooks/useAuth';
import {useForm} from 'react-hook-form';
import useMainNavigation from '~hooks/useMainNavigation';
import BackgroundWrapper from '~components/wrapper/BackgroundWrapper';
import KeyboardWrapper from '~components/wrapper/KeyboardWrapper';
import GradientButton from '~components/input/GradientButton';
import AuthWrapper from '~components/wrapper/AuthWrapper';
import {container, formStyle, textStyles} from '~theme/components';
import {useTranslation} from 'react-i18next';
import ControlledInput from '~components/input/ControlledInput';
import ControlledPasswordInput from '~components/input/ControlledPasswordInput';
interface SignInFormData {
    phone: string;
    password: string;
}
const SignInScreen = () => {
    const {t} = useTranslation();
    const {loginUser, loginState} = useAuth();
    const {authNavigation} = useMainNavigation();
    const {control, handleSubmit, setError} = useForm<SignInFormData>();
    const validate = (data: {phone: string; password: string}) => {
        const {phone, password} = data;
        if (!phone) {
            setError('phone', {message: 'Phone number is required'});
        }
        if (!password) {
            setError('password', {message: 'Password is required'});
        } else if (password.length < 6) {
            setError('password', {
                message: 'Password must be at least 6 characters',
            });
        }
        if (!phone || !password || password.length < 6) {
            return false;
        }
        return true;
    };
    const handleLogin = (data: {phone: string; password: string}) => {
        if (validate(data)) {
            loginUser(data.phone, data.password);
        }
    };
    const handleSignUp = () => authNavigation.navigate('SignUp');

    return (
        <BackgroundWrapper>
            <KeyboardWrapper>
                <AuthWrapper>
                    <View style={container}>
                        <Text style={textStyles.heading}>{t('sign_in')}</Text>
                        {/* Error message */}
                        {/* {loginState.error && <Text style={styles.error}>{loginState.error}</Text>} */}
                        <View style={[formStyle, {marginTop: 20}]}>
                            {/* phone Input */}
                            <ControlledInput
                                name="phone"
                                control={control}
                                label={t('phone')}
                                startIcon="phone-dial"
                                keyboardType="phone-pad"
                                rules={{required: 'Phone number is required'}}
                            />
                            {/* Password Input */}
                            <ControlledPasswordInput
                                name="password"
                                label={t('password')}
                                control={control}
                                startIcon="lock"
                                rules={{required: 'Password is required'}}
                            />
                            <GradientButton
                                title={t('sign_in')}
                                onPress={handleSubmit(handleLogin)}
                                disabled={loginState.loading}
                                loading={loginState.loading}
                                style={{marginTop: 40}}
                            />
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={textStyles.body}>
                                        {t('no_account_ask')}{' '}
                                        <Text style={textStyles.pressable}>
                                            {t('sign_up')}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </AuthWrapper>
            </KeyboardWrapper>
        </BackgroundWrapper>
    );
};

export default SignInScreen;
