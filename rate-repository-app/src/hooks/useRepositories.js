import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
    const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_REPOSITORIES, { variables, fetchPolicy: 'cache-and-network', })

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return { repositories: data?.repositories, loading, refetch, fetchMore: handleFetchMore, };
};

export default useRepositories;