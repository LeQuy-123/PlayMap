import Icon from '@react-native-vector-icons/material-design-icons';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {NotificationType} from '~constants/type';
import {getIcon, getTypeColor} from '~constants/util';
import colors from '~theme/colors';
import {buttonStyles, textStyles} from '~theme/components';
import spacing from '~theme/spacing';
import typography from '~theme/typography';

type ButtonAction = () => void;

interface NotificationOptions {
    title: string;
    msg: string;
    type?: NotificationType;
    confirm?: ButtonAction;
    confirmTitle?: string;
    cancel?: ButtonAction;
    cancelTitle?: string;
}

interface NotificationContextType {
    showBottomNotification: (options: NotificationOptions) => void;
}

const BottomNotificationContext = createContext<
    NotificationContextType | undefined
>(undefined);
let showGlobalBottomNotification: NotificationContextType['showBottomNotification'];

export const BottomNotificationProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<NotificationOptions | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const hide = () => {
        setVisible(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = null;
    };

    const showBottomNotification = ({
        title,
        msg,
        type = 'info',
        confirm,
        confirmTitle = t('confirm'),
        cancelTitle = t('cancel'),
        cancel,
    }: NotificationOptions) => {
        setOptions({
            title,
            msg,
            type,
            confirm,
            cancel,
            confirmTitle,
            cancelTitle,
        });
        setVisible(true);

        if (!confirm && !cancel) {
            timeoutRef.current = setTimeout(hide, 3000);
        }
    };

    showGlobalBottomNotification = showBottomNotification;

    return (
        <BottomNotificationContext.Provider value={{showBottomNotification}}>
            {children}
            <Modal
                isVisible={visible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={hide}
                backdropOpacity={0.6}
                useNativeDriver
                style={styles.modal}>
                {options && (
                    <View
                        style={[
                            styles.popup,
                            {
                                backgroundColor: colors.background,
                                position: 'relative',
                            },
                        ]}>
                        <View style={styles.iconContainer}>
                            <Icon
                                name={getIcon(options.type!)}
                                size={60}
                                color={getTypeColor(options.type!)}
                                style={{margin: -6}}
                            />
                        </View>
                        <Text
                            style={[
                                textStyles.tile,
                                {marginBottom: spacing.md, textAlign: 'center'},
                            ]}>
                            {options.title}
                        </Text>
                        <Text
                            style={[
                                textStyles.body,
                                {
                                    color: '#727C8E',
                                    textAlign: 'center',
                                    marginBottom: spacing.lg,
                                    fontSize: typography.fontSize.sm,
                                },
                            ]}>
                            {options.msg}
                        </Text>
                        {(options.confirm || options.cancel) && (
                            <View style={styles.buttonRow}>
                                {options.confirm && !options.cancel && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            options.confirm?.();
                                            hide();
                                        }}
                                        style={[
                                            buttonStyles,
                                            {
                                                backgroundColor: getTypeColor(
                                                    options.type!,
                                                ),
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
                                            {options.confirmTitle}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                {options.cancel && !options.confirm && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            options.cancel?.();
                                            hide();
                                        }}
                                        style={[
                                            buttonStyles,
                                            {backgroundColor: 'transparent'},
                                        ]}>
                                        <Text
                                            style={[
                                                textStyles.body,
                                                {
                                                    textAlign: 'center',
                                                    color: '#515A68',
                                                },
                                            ]}>
                                            {options.cancelTitle}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                {options.confirm && options.cancel && (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                options.cancel?.();
                                                hide();
                                            }}
                                            style={[
                                                buttonStyles,
                                                {
                                                    backgroundColor:
                                                        'transparent',
                                                    flex: 1,
                                                },
                                            ]}>
                                            <Text
                                                style={[
                                                    textStyles.body,
                                                    {
                                                        textAlign: 'center',
                                                        color: '#515A68',
                                                    },
                                                ]}>
                                                {options.cancelTitle}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                options.confirm?.();
                                                hide();
                                            }}
                                            style={[
                                                buttonStyles,
                                                {
                                                    backgroundColor:
                                                        getTypeColor(
                                                            options.type!,
                                                        ),
                                                    flex: 1,
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
                                                {options.confirmTitle}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                )}
            </Modal>
        </BottomNotificationContext.Provider>
    );
};

export const useBottomNotification = () => {
    const context = useContext(BottomNotificationContext);
    if (!context) {
        throw new Error(
            'useBottomNotification must be used within BottomNotificationProvider',
        );
    }
    return context;
};

export const bottomNotify = (options: NotificationOptions) => {
    if (showGlobalBottomNotification) {
        showGlobalBottomNotification(options);
    } else {
        console.warn('Notification system not ready');
    }
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    iconContainer: {
        position: 'absolute',
        top: -35,
        alignSelf: 'center',
        backgroundColor: colors.background,
        borderRadius: 100,
    },
    popup: {
        width: '100%',
        padding: 20,
        paddingBottom: 30,
        paddingTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#222',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
});
