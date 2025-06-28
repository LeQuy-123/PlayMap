import React, { FC, ReactNode } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IMAGES from '~constants/images';
import colors from '~theme/colors';

type Props = {
    children: ReactNode;
    wrapperHeight?: number;
};

const AuthWrapper: FC<Props> = ({ children, wrapperHeight }) => {
    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');

    return (
        <View style={styles.wrapper}>
            <View style={[styles.background, { height: wrapperHeight ? wrapperHeight : height * 0.55, minHeight: 450}]}>
                {children}
                <View style={[styles.footer, { paddingBottom: insets.bottom === 0 ? 12  : insets.bottom }]}>
                    <Image source={IMAGES.AUTH.APP_ICON} style={styles.appIcon} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end', // pushes children to the bottom
    },
    background: {
        width: '100%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    appIcon: {
        width: 41,
        height: 41,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },
});

export default AuthWrapper;
