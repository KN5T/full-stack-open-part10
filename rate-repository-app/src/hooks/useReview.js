import { useMutation } from "@apollo/client/react"
import { CREATE_REVIEW } from "../graphql/mutations"
import { GET_USER } from "../graphql/queries"

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW, {
        refetchQueries: [{ query: GET_USER, variables: { includeReviews: true } }]
    })

    const createReview = async ({ ownerName, repositoryName, rating, text }) => {
        const { data } = await mutate({ variables: { review: { ownerName, repositoryName, rating, text } } })

        result.data = data
        return result
    }

    return [createReview, result]
}

export default useReview