import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns"
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#ffffff',
        elevation: 10
    },
    repositoryContainer: {
        flexDirection: "row",
        gap: 10,
    },
    rating: {
        width: 50,
        height: 50,
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    info: {
        flex: 1,
        paddingRight: 70,
    },
    date: {
        color: "grey",
        marginBottom: 5
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    button: {
        marginTop: 25,
        borderRadius: 5,
        height: 55,
        justifyContent: "center",
        paddingLeft: 30,
        paddingRight: 30
    }
})

const ReviewItem = ({ review, showButtons, refetchReviews }) => {
    const [deleteReview] = useDeleteReview()
    const navigate = useNavigate()

    const handleDelete = () => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: async () => {
                    await deleteReview(review.id)
                    await refetchReviews({ variables: { includeReviews: true } })
                }
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.repositoryContainer}>
                <View style={styles.rating}>
                    <Text color="primary" fontSize="subheading" fontWeight="bold">{review.rating}</Text>
                </View>
                <View style={styles.info}>
                    <Text fontWeight="bold">{review.user ? review.user.username : review.repository.fullName}</Text>
                    <Text style={styles.date}>{format(new Date(review.createdAt), "dd MMM yyyy")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>

            {showButtons &&
                <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => navigate(`/${review.repository.id}`)} style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                        <Text fontWeight="bold" color="textTertiary">
                            View repository
                        </Text>
                    </Pressable>

                    <Pressable onPress={handleDelete} style={[styles.button, { backgroundColor: "#ff4a4a" }]}>
                        <Text fontWeight="bold" color="textTertiary">
                            Delete review
                        </Text>
                    </Pressable>
                </View>
            }
        </View>
    )
};

export default ReviewItem