import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textTertiary: '#ffffff',
        textAppBar: '#ffffff',
        primary: '#0366d6'
    },
    fontSizes: {
        body: 17,
        subheading: 20,
    },
    fonts: {
        main: Platform.select({
            android: "Roboto",
            ios: "Arial",
            default: "System"
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;