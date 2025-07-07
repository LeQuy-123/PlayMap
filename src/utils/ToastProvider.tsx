import Icon from '@react-native-vector-icons/material-design-icons';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NotificationType} from '~constants/type';
import {getIcon, getTypeColor, SCREEN} from '~constants/util';
import colors from '~theme/colors';
import {textStyles} from '~theme/components';
import spacing from '~theme/spacing';
import typography from '~theme/typography';

type NotificationButton = {
    label: string;
    onPress: () => void;
};

type NotificationContextType = {
    showToast: (
        title?: string | null,
        msg?: string | null,
        type?: NotificationType,
        button?: NotificationButton,
    ) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined,
);
let showGlobalNotification: NotificationContextType['showToast'];

export const ToastProvider = ({children}: {children: ReactNode}) => {
    const [title, setTitle] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<NotificationType>('info');
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const insets = useSafeAreaInsets();

    const hideToast = () => {
        setVisible(false);
        setTitle(null);
        setMessage(null);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const showToast: NotificationContextType['showToast'] = (
        t = null,
        msg = null,
        nType = 'info',
    ) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setTitle(t);
        setMessage(msg);
        setType(nType);
        setVisible(true);

        timeoutRef.current = setTimeout(() => {
            hideToast();
        }, 3000);
    };

    showGlobalNotification = showToast;

    return (
        <NotificationContext.Provider value={{showToast}}>
            {children}
            <Modal
                isVisible={visible}
                animationIn="slideInDown"
                animationOut="slideOutUp"
                onBackdropPress={hideToast}
                backdropOpacity={0.1}
                useNativeDriver
                useNativeDriverForBackdrop
                hasBackdrop
                style={styles.modal}>
                <View
                    style={[
                        styles.popup,
                        {
                            backgroundColor: colors.background,
                            marginTop: insets.top,
                        },
                    ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}>
                        <Icon
                            name={getIcon(type!)}
                            size={24}
                            color={getTypeColor(type!)}
                            style={{marginRight: 10}}
                        />
                        <View style={{flex: 1}}>
                            {title ? (
                                <Text
                                    style={[
                                        textStyles.tile,
                                        {
                                            color: '#1D1929',
                                            fontSize: typography.fontSize.md,
                                        },
                                    ]}>
                                    {title}
                                </Text>
                            ) : null}
                            {message ? (
                                <Text
                                    style={[
                                        textStyles.body,
                                        {
                                            color: '#1D1929',
                                            fontSize: typography.fontSize.sm,
                                        },
                                    ]}>
                                    {message}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                </View>
            </Modal>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within ToastProvider');
    }
    return context;
};

export const toast = (options: {
    type?: NotificationType;
    title?: string | null;
    msg?: string | null;
}) => {
    const {title, msg, type = 'info'} = options;
    if (!msg && !title) {
        return;
    }
    if (showGlobalNotification) {
        showGlobalNotification(title, msg, type);
    } else {
        console.warn('Notification system not ready.');
    }
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        width: SCREEN.width - 40,
        padding: spacing.md,
        borderRadius: 20,
        elevation: 5,
        position: 'absolute',
        top: 0,
        marginHorizontal: 20,
    },
});
