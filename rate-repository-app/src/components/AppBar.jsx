import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
        flexDirection: 'row',

    },
    item: {
        marginBottom: 20,
        marginLeft: 15
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Repositories" path="/" />
                </Pressable>

                <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Sing in" path="/singIn" />
                </Pressable>
            </ScrollView>
        </View >
    )
};

export default AppBar;