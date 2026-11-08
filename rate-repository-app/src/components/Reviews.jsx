import { View, FlatList } from "react-native"
import { GET_USER } from "../graphql/queries"
import { useQuery } from "@apollo/client/react"
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const Reviews = () => {
    const { data, loading, refetch } = useQuery(GET_USER, { variables: { includeReviews: true } })

    if (loading) {
        return <View><Text>Loading...</Text></View>
    }

    const reviews = data.me ? data.me.reviews.edges.map(e => e.node) : []

    console.log("my reviews", reviews)

    return (
        <View>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} refetchReviews={refetch} showButtons />}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    )
}

export default Reviews