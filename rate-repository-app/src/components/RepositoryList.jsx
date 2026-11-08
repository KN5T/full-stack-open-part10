import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useEffect, useRef, useState } from 'react';
import { Picker } from "@react-native-picker/picker"
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce"

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
        padding: 12,
        overflow: 'visible',
    },
    search: {
        backgroundColor: 'white',
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const FilterSelect = ({ selected, setSelected, searchQuery, setSearchQuery }) => {

    return (
        <View style={styles.container}>
            <Searchbar elevation={5} style={styles.search} placeholder='Search' value={searchQuery} onChangeText={setSearchQuery} />
            <Picker
                selectedValue={selected}
                onValueChange={(itemValue) => setSelected(itemValue)}
            >
                <Picker.Item
                    label="Select an item"
                    enabled={false}
                />
                <Picker.Item label="Latest repositories" value="latest" />
                <Picker.Item label="Highest rated repositories" value="highest" />
                <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
        </View>
    )
}

export const RepositoryListContainer = ({ repositories, selected, setSelected, searchQuery, setSearchQuery }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            ListHeaderComponent={<FilterSelect selected={selected} setSelected={setSelected} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem repository={item} />}
            keyExtractor={item => item.id}
        />
    );
};

const options = {
    latest: {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
    },
    highest: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC"
    },
    lowest: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC"
    }
}

const RepositoryList = () => {
    const { repositories, loading, refetch } = useRepositories();
    const [selected, setSelected] = useState("latest")
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedValue] = useDebounce(searchQuery, 500)

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const variables = {
            ...options[selected],
            searchKeyword: debouncedValue
        }
        refetch(variables)

    }, [selected, debouncedValue, refetch])

    if (loading) {
        return (
            <Text>Loading...</Text>
        )
    }


    return <RepositoryListContainer
        repositories={repositories}
        selected={selected}
        setSelected={setSelected}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
    />
};

export default RepositoryList;