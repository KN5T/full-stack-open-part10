import { View, StyleSheet, Image, Pressable } from "react-native"
import Text from "./Text"
import * as Linking from "expo-linking"
import { useNavigate } from "react-router-native"
import theme from "../theme"

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 15,
        backgroundColor: '#ffffff',
        elevation: 10
    },
    header: {
        flexDirection: 'row',
        marginBottom: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 20
    },
    info: {
        gap: 8,
        flex: 1,
    },
    language: {
        color: '#ffffff',
        backgroundColor: '#0366d6',
        padding: 4,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    stat: {
        alignItems: 'center'
    },
    button: {
        alignSelf: "stretch",
        backgroundColor: theme.colors.primary,
        padding: 15,
        marginTop: 15,
        borderRadius: 4,
        alignItems: "center"
    }
})

const formatCount = (count) => {
    if (count >= 1000) {
        const thousands = count / 1000
        return `${parseFloat(thousands.toFixed(1))}k`
    }

    return count;
};

const RepositoryItem = ({ repository, showButton }) => {
    const navigate = useNavigate()

    const openURL = async (URI) => {
        await Linking.openURL(URI)
    }

    const handlePress = () => {
        navigate(`/${repository.id}`)
    }

    return (
        <View testID="repositoryItem" style={styles.container}>
            <Pressable onPress={handlePress}>
                <View style={styles.header}>
                    <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
                    <View style={styles.info}>
                        <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
                        <Text>{repository.description}</Text>
                        <Text style={styles.language}>{repository.language}</Text>
                    </View>
                </View>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text fontWeight="bold">{formatCount(repository.stargazersCount)}</Text>
                        <Text>Stars</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text fontWeight="bold">{formatCount(repository.forksCount)}</Text>
                        <Text>Forks</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text fontWeight="bold">{formatCount(repository.reviewCount)}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text fontWeight="bold">{formatCount(repository.ratingAverage)}</Text>
                        <Text>Rating</Text>
                    </View>
                </View>
            </Pressable>
            {
                showButton &&
                <Pressable style={styles.button} onPress={() => openURL(repository.url)}>
                    <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Open in GitHub</Text>
                </Pressable>
            }
        </View>
    )
}

export default RepositoryItem