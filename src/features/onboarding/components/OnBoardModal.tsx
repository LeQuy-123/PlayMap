import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { useOnboardingController } from '../hooks/useOnboardingController';
import colors from '~theme/colors';
import spacing from '~theme/spacing';
import typography from '~theme/typography';
import { buttonPrimaryStyles, card, inputStyles, textStyles } from '~theme/components';
import { SCREEN } from '~constants/util';

const OnBoardModal = ({ children }: { children: React.ReactNode }) => {
    const {
        visible,
        name,
        setName,
        sports,
        selectedSport,
        setSelectedSport,
        handleConfirm,
        status,
    } = useOnboardingController();
    const { t } = useTranslation();

    return (
        <>
            {children}
            <ReactNativeModal
                isVisible={visible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.6}
                useNativeDriver
                style={styles.modal}
            >
                <View style={[card, { backgroundColor: colors.background }]}>
                    <Text style={[textStyles.tile, styles.centeredText]}>{t('hello')}</Text>
                    <Text style={[textStyles.body, styles.subtext]}>{t('on_board_quest')}</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={[inputStyles, styles.input]}
                    />
                    <View style={styles.sportContainer}>
                        {sports.map((sport) => {
                            const isSelected = sport.id === selectedSport?.id;
                            return (
                                <TouchableOpacity
                                    key={sport.id}
                                    style={[styles.tag, isSelected && { backgroundColor: colors.primary }]}
                                    onPress={() => setSelectedSport(sport)}
                                >
                                    <Text style={[textStyles.tag, isSelected && { color: 'white' }]}>
                                        {sport.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        disabled={status.loading}
                        style={[buttonPrimaryStyles, styles.button]}
                    >
                        {status.loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={[textStyles.body, styles.buttonText]}>
                                {t('confirm')}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ReactNativeModal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 20,
        justifyContent: 'center',
    },
    centeredText: {
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    subtext: {
        color: '#727C8E',
        textAlign: 'center',
        marginBottom: spacing.md,
        fontSize: typography.fontSize.sm,
    },
    input: {
        marginHorizontal: 20,
        marginBottom: spacing.md,
    },
    sportContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        padding: 2,
        paddingHorizontal: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    button: {
        width: SCREEN.width - 80,
        marginHorizontal: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.background,
    },
});

export default OnBoardModal;
