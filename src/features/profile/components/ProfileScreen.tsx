import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useProfileController } from '../hooks/useProfileController';
import spacing from '~theme/spacing';
import typography from '~theme/typography';
import colors from '~theme/colors';

const ProfileScreen = () => {
    const { user, numberOfMatches, score } = useProfileController();

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>No user found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{user.name}</Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Matches</Text>
                    <Text style={styles.value}>{numberOfMatches}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Score</Text>
                    <Text style={styles.value}>{score}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        alignItems: 'center',
        backgroundColor: colors.background,
        flex: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacing.md,
    },
    name: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.lg,
    },
    infoContainer: {
        flexDirection: 'row',
        gap: spacing.lg,
    },
    infoBox: {
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.gray,
        borderRadius: 10,
        minWidth: 100,
    },
    label: {
        fontSize: typography.fontSize.sm,
        color: colors.text,
        marginBottom: 4,
    },
    value: {
        fontSize: typography.fontSize.md,
        fontWeight: 'bold',
        color: colors.primary,
    },
});

export default ProfileScreen;
