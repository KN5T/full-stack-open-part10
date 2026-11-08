import { View, FlatList, StyleSheet } from "react-native"
import Text from "./Text"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import { useParams } from 'react-router-native'
import ReviewItem from "./ReviewItem"

const ItemSeparator = () => <View style={{ height: 10 }} />;

const Repository = () => {
    const { id } = useParams()
    const { repository, loading } = useRepository({ repositoryId: id })

    if (loading) return <View><Text>loading...</Text></View>

    const reviews = repository
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem repository={repository} showButton />}
            ListHeaderComponentStyle={{ marginBottom: 10 }}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default Repository