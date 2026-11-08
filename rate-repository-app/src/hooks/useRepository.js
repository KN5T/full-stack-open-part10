import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
    const { loading, data, refetch, fetchMore } = useQuery(GET_REPOSITORY, { variables, fetchPolicy: 'cache-and-network', })

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

        if (!canFetchMore) return

        fetchMore({
            variables: {
                reviewsAfter: data.repository.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    }

    return { repository: data?.repository, loading, refetch, fetchMore: handleFetchMore, };
};

export default useRepository