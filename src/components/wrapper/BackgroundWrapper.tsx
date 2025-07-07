import React, {FC, ReactNode} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import IMAGES from '~constants/images';

type Props = {
    children: ReactNode;
};

const BackgroundWrapper: FC<Props> = ({children}) => {
    return (
        <ImageBackground
            source={IMAGES.AUTH.BACKGROUND} // use JPEG/WebP
            style={styles.background}
            resizeMode="cover">
            <View style={styles.content}>{children}</View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default BackgroundWrapper;
