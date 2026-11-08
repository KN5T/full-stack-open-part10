import { View, FlatList } from "react-native"
import Text from "./Text"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import { useParams } from 'react-router-native'
import ReviewItem from "./ReviewItem"

const ItemSeparator = () => <View style={{ height: 10 }} />;

const Repository = () => {
    const { id } = useParams()
    const { repository, fetchMore, loading } = useRepository({ reviewsFirst: 6, repositoryId: id })

    if (loading && !repository) return <View><Text>loading...</Text></View>

    const reviews = repository
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];

    const fm = () => {
        console.log("Fetch more reviews")
        fetchMore()
    }

    return (
        <FlatList
            data={reviews}
            onEndReached={fm}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem repository={repository} showButton />}
            ListHeaderComponentStyle={{ marginBottom: 10 }}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default Repository