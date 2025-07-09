import {Dimensions, TextStyle, ViewStyle} from 'react-native';
import colors from './colors';
import spacing from './spacing';
import typography from './typography';

const {height} = Dimensions.get('window');
export const card: ViewStyle = {
    width: '100%',
    borderRadius: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#222',
};
export const container: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: height > 700 ? spacing.xl : spacing.md,
};
export const formStyle: ViewStyle = {
    display: 'flex',
    gap: 18,
    width: '100%',
};
export const buttonStyles: ViewStyle = {
    paddingVertical: spacing.nm,
    paddingHorizontal: spacing.lg,
    width: '100%',
    borderRadius: 8,
};
export const buttonPrimaryStyles: ViewStyle = {
    ...buttonStyles,
    alignItems: 'center',
    justifyContent: 'center',
    experimental_backgroundImage:
        'linear-gradient(90deg, #84CC28 0%, #1A7941 100%)',
};

export const buttonPrimaryStylesDisable: ViewStyle = {
    ...buttonPrimaryStyles,
    opacity: 0.5,
};

export const inputStyles: TextStyle = {
    paddingVertical: spacing.nm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    fontSize: typography.fontSize.sm,
    borderColor: colors.border,
    borderWidth: 1,
};

export const errorMessage: TextStyle = {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    position: 'absolute',
    bottom: -16,
};

export const textStyles: {
    heading: TextStyle;
    label: TextStyle;
    body: TextStyle;
    pressable: TextStyle;
    tile: TextStyle;
    tag: TextStyle;
} = {
    heading: {
        fontFamily: typography.fontFamily.default,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text,
    },
    tile: {
        fontFamily: typography.fontFamily.default,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.normal as any,
        color: colors.text,
    },
    label: {
        fontFamily: typography.fontFamily.default,
        fontSize: typography.fontSize.sm,
        fontWeight: 500,
        color: colors.text,
    },
    body: {
        fontFamily: typography.fontFamily.default,
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.normal as any,
        color: colors.text,
    },
    pressable: {
        fontFamily: typography.fontFamily.default,
        fontSize: typography.fontSize.md,
        color: colors.pressable,
        fontWeight: 500,
    },
    tag: {
        fontFamily: typography.fontFamily.default,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.normal as any,
        color: colors.text,
    },
};
