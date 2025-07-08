import React, { useEffect, useState } from 'react';
import '~localization';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~store/store';
import { fetchSports } from '~store/slices/sportSlice';
import { useTranslation } from 'react-i18next';
import ReactNativeModal from 'react-native-modal';
import colors from '~theme/colors';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { buttonPrimaryStyles, buttonStyles, card, inputStyles, textStyles } from '~theme/components';
import spacing from '~theme/spacing';
import typography from '~theme/typography';
import { SCREEN } from '~constants/util';

const OnBoard = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false);
    const [name, setname] = useState('Anon');

    useEffect(() => {
        const init = async () => {
            try {
                await dispatch(fetchSports()).unwrap();
                setVisible(true)
            } catch (err) {
                console.error('Failed to load metadata:', err);
            } finally {
                // SplashScreen.hide(); // only hide when ready
            }
        };
        init();
    }, []);
    const hide = () => {
        setVisible(false);

    };
    return <>
        {children}
        <ReactNativeModal
            isVisible={visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={hide}
            backdropOpacity={0.6}
            useNativeDriver
            style={styles.modal}>
            <View
                style={[
                    card,
                    {
                        backgroundColor: colors.background,
                        position: 'relative',
                    },
                ]}>
                <View style={styles.iconContainer}>
                    {/* <Icon
                        name={'zend'}
                        size={60}
                        color={colors.info}
                        style={{ margin: -6 }}
                    /> */}
                </View>
                <Text
                    style={[
                        textStyles.tile,
                        { marginBottom: spacing.sm, textAlign: 'center' },
                    ]}>
                    {t('hello')}
                </Text>
                <Text
                    style={[
                        textStyles.body,
                        {
                            color: '#727C8E',
                            textAlign: 'center',
                            marginBottom: spacing.md,
                            fontSize: typography.fontSize.sm,
                        },
                    ]}>
                    {t('on_board_quest')}
                </Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => setname(text)} 
                    style={[inputStyles, { marginHorizontal: 20, marginBottom: spacing.md}]}
                />
                <TouchableOpacity
                    onPress={() => {
                        hide();
                    }}
                    style={[
                        buttonPrimaryStyles,
                        {
                            width: SCREEN.width - 80,
                            marginHorizontal: 20
                        },
                    ]}>
                    <Text
                        style={[
                            textStyles.body,
                            {
                                textAlign: 'center',
                                color: colors.background,
                            },
                        ]}>
                        {t('confirm')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ReactNativeModal>
    </>;
};


const styles = StyleSheet.create({
    modal: {
        margin: 20,
        justifyContent: 'center',
    },
    iconContainer: {
        position: 'absolute',
        top: -20,
        alignSelf: 'center',
        backgroundColor: colors.background,
        borderRadius: 100,
    },
    
});

export default OnBoard;


