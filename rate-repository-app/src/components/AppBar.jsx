import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
    const { data } = useQuery(GET_USER)
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()

    const user = (data && data.me) ? data.me : null

    const signOut = async () => {
        await authStorage.removeAccessToken()
        apolloClient.resetStore()
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Repositories" path="/" />
                </Pressable>

                {!user && <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Sing in" path="/singIn" />
                </Pressable>}

                {!user && <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Sing up" path="/singUp" />
                </Pressable>}

                {user && <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Create a review" path="/createReview" />
                </Pressable>}

                {user && <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="My reviews" path="/reviews" />
                </Pressable>}

                {user && <Pressable style={styles.item} onPress={() => console.log("You pressed me")}>
                    <AppBarTab name="Sing out" path="/" handlePress={signOut} />
                </Pressable>}
            </ScrollView>
        </View >
    )
};

export default AppBar;