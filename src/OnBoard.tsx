import React, { useEffect, useState } from 'react';
import '~localization';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~store/store';
import { fetchSports } from '~store/slices/sportSlice';
import { useTranslation } from 'react-i18next';
import ReactNativeModal from 'react-native-modal';
import colors from '~theme/colors';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { buttonPrimaryStyles,  card, inputStyles, textStyles } from '~theme/components';
import spacing from '~theme/spacing';
import typography from '~theme/typography';
import { SCREEN } from '~constants/util';
import { registerAnonUser } from '~store/slices/userSlice';
import  {
    locationManager
} from '@rnmapbox/maps';
import UserService from '~services/UserService';
const OnBoard = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const sports = useSelector<RootState>(state => state.sport.sports) as any[]
    const status = useSelector<RootState>(state => state.user.status) as 'idle' | 'loading' 
    const user = useSelector<RootState>(state => state.user.user) as any

    const { t } = useTranslation()
    const [visible, setVisible] = useState(false);
    const [name, setname] = useState('Anon');
    const [selectedSport, setselectedSport] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            try {
                await dispatch(fetchSports()).unwrap();
                if(user?.id) {
                    await UserService.ping()
                    setVisible(false)
                } else {
                    setVisible(true)
                }
            } catch (err) {
                console.log('Failed to load metadata:', err);
            } finally {
                // SplashScreen.hide(); // only hide when ready
            }
        };
        init();
    }, []);
    const hide = () => {
        setVisible(false);
    };

    const handleConfirm = async () => {
        try {
            if (!selectedSport) return;
            const location = await locationManager.getLastKnownLocation();
            if (location) {
                await dispatch(registerAnonUser({
                    name: name,
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                    main_sport_id: selectedSport?.id
                }))
            }
        } catch (error) {
            console.log("🚀 ~ handleConfirm ~ error:", error)
            
        } finally {
            hide();
        }
    }
    return <>
        {children}
        <ReactNativeModal
            isVisible={visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
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
                <View style={styles.sportContainer}>
                    {sports?.map((sport) => {
                        const isSelected = sport.id === selectedSport?.id;
                        return <TouchableOpacity key={sport.id} 
                            style={[styles.tag, isSelected ? {backgroundColor: colors.primary} : {}]}
                            onPress={() => setselectedSport(sport)}>
                            <Text style={[textStyles.tag, isSelected ? {color: 'white'} : {}]}>{sport.name}</Text>
                        </TouchableOpacity>
                    })}
                </View>
                <TouchableOpacity
                    onPress={handleConfirm}
                    disabled={status !== 'idle'}
                    style={[
                        buttonPrimaryStyles,
                        {
                            width: SCREEN.width - 80,
                            marginHorizontal: 20
                        },
                    ]}>
                    {status !== 'idle' ? <ActivityIndicator color={'white'}/> : <Text
                        style={[
                            textStyles.body,
                            {
                                textAlign: 'center',
                                color: colors.background,
                            },
                        ]}>
                        {t('confirm')}
                    </Text>}
                   
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
    sportContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6
    },
    tag: {
        padding: 2,
        paddingHorizontal: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border
    }
});

export default OnBoard;


