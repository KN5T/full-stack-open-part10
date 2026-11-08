import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    appBarText: {
        color: theme.colors.textAppBar,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.bold,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    colorTextTertiary: {
        color: theme.colors.textTertiary
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
});

const Text = ({ color, fontSize, fontWeight, style, isAppBar, ...props }) => {
    const textStyle = [
        styles.text,
        isAppBar && styles.appBarText,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'textTertiary' && styles.colorTextTertiary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];

    return <NativeText style={textStyle} {...props} />;
};

export default Text;