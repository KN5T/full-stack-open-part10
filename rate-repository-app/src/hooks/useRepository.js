import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
    const { loading, data, refetch } = useQuery(GET_REPOSITORY, { variables, fetchPolicy: 'cache-and-network', })

    return { repository: data?.repository, loading, refetch };
};

export default useRepository